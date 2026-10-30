// Paste into the Apps Script project opened from the destination spreadsheet.
// No passwords or tokens belong in this file or in GitHub.
var SPREADSHEET_ID = "1Ct6OWYNUOnCK2EKAvwWKQkQTKU0CUT6_RJLSBZl1iwQ";
var SHEET_ID = 0;

function setup() {
  var properties = PropertiesService.getScriptProperties();
  if (!properties.getProperty("CONTACT_FORM_TOKEN")) {
    properties.setProperty("CONTACT_FORM_TOKEN", Utilities.getUuid() + Utilities.getUuid());
  }
  // Request spreadsheet authorization before publishing the web app.
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetById(SHEET_ID);
  if (!sheet) throw new Error("Nie znaleziono karty o identyfikatorze gid=0.");
  console.log("Gotowe. Skopiuj CONTACT_FORM_TOKEN z Ustawień projektu → Właściwości skryptu do sekretu w Cloudflare.");
}

function doGet() {
  // A health check must never expose rows, keys, or lead details.
  return jsonResponse({ ok: true, service: "contact-form" });
}

function doPost(e) {
  var lock;
  var locked = false;
  try {
    if (!e || !e.postData || !e.postData.contents || e.postData.contents.length > 20000) {
      return jsonResponse({ ok: false });
    }
    var input = JSON.parse(e.postData.contents);
    var expected = PropertiesService.getScriptProperties().getProperty("CONTACT_FORM_TOKEN");
    if (!expected || expected.length < 32 || !input || input.token !== expected) {
      return jsonResponse({ ok: false });
    }
    if (!validText(input.name, 1, 200) || !validText(input.contact, 3, 200) ||
        !validText(input.message, 0, 3000) || !Array.isArray(input.interests) ||
        input.interests.length > 10 || !input.interests.every(function (v) { return validText(v, 0, 50); })) {
      return jsonResponse({ ok: false });
    }

    lock = LockService.getScriptLock();
    locked = lock.tryLock(10000);
    if (!locked) return jsonResponse({ ok: false });

    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetById(SHEET_ID);
    if (!sheet) throw new Error("Missing destination sheet");
    var row = [input.name.trim(), input.contact.trim(), input.interests.join(", "), input.message.trim()];
    // setValues interprets '=' as a formula. Prefix dangerous strings with an
    // apostrophe and format as text, preserving phone numbers and leading zeros.
    row = row.map(function (value) { return /^[\s]*[=+\-@]/.test(value) ? "'" + value : value; });
    var nextRow = sheet.getLastRow() + 1;
    if (nextRow > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(), 1);
    sheet.getRange(nextRow, 1, 1, 4).setNumberFormat("@").setValues([row]);
    SpreadsheetApp.flush();
    return jsonResponse({ ok: true, updatedRows: 1 });
  } catch (_) {
    // Do not write personal data or authentication tokens to logs or responses.
    console.error("Contact form: append failed.");
    return jsonResponse({ ok: false });
  } finally {
    if (locked) lock.releaseLock();
  }
}

function validText(value, min, max) {
  return typeof value === "string" && value.trim().length >= min && value.length <= max;
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
