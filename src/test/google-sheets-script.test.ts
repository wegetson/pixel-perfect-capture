import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";
import script from "../../integrations/google-sheets/Code.gs?raw";
const token = "test-private-token-at-least-32-characters";
const lead = {
  token,
  name: "Test",
  contact: "+48123456789",
  interests: ["Strona WWW"],
  message: "=1+1",
};

function harness() {
  const setValues = vi.fn();
  const range = { setNumberFormat: vi.fn().mockReturnValue({ setValues }) };
  const sheet = {
    getLastRow: () => 3,
    getMaxRows: () => 100,
    getRange: vi.fn().mockReturnValue(range),
  };
  const getSheetById = vi.fn().mockReturnValue(sheet);
  const openById = vi.fn().mockReturnValue({ getSheetById });
  const lock = { tryLock: vi.fn().mockReturnValue(true), releaseLock: vi.fn() };
  const output = (text: string) => ({
    setMimeType: () => JSON.parse(text) as { ok: boolean; updatedRows?: number },
  });
  const context = {
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => token }) },
    SpreadsheetApp: { openById, flush: vi.fn() },
    ContentService: { MimeType: { JSON: "application/json" }, createTextOutput: output },
    LockService: { getScriptLock: () => lock },
    console: { error: vi.fn() },
  };
  const invoke = runInNewContext(
    `${script}\n(function(input) { return doPost({postData: {contents: JSON.stringify(input)}}); })`,
    context,
  ) as (input: unknown) => { ok: boolean; updatedRows?: number };
  return { invoke, setValues, sheet, getSheetById, openById, lock };
}

describe("Google Apps Script receiver", () => {
  it("does not access the spreadsheet for an incorrect shared token", () => {
    const h = harness();
    expect(h.invoke({ ...lead, token: "wrong" })).toEqual({ ok: false });
    expect(h.openById).not.toHaveBeenCalled();
  });

  it("rejects invalid contact data before writing", () => {
    const h = harness();
    expect(h.invoke({ ...lead, contact: "" })).toEqual({ ok: false });
    expect(h.setValues).not.toHaveBeenCalled();
  });

  it("writes all four columns to gid=0 as text and releases the lock", () => {
    const h = harness();
    expect(h.invoke(lead)).toEqual({ ok: true, updatedRows: 1 });
    expect(h.getSheetById).toHaveBeenCalledWith(0);
    expect(h.sheet.getRange).toHaveBeenCalledWith(4, 1, 1, 4);
    expect(h.setValues).toHaveBeenCalledWith([["Test", "'+48123456789", "Strona WWW", "'=1+1"]]);
    expect(h.lock.releaseLock).toHaveBeenCalledOnce();
  });

  it("does not overwrite another request's row when the lock is busy", () => {
    const h = harness();
    h.lock.tryLock.mockReturnValue(false);
    expect(h.invoke(lead)).toEqual({ ok: false });
    expect(h.setValues).not.toHaveBeenCalled();
    expect(h.lock.releaseLock).not.toHaveBeenCalled();
  });

  it("reports a failed write instead of confirming a saved lead", () => {
    const h = harness();
    h.setValues.mockImplementation(() => {
      throw new Error("write failed");
    });
    expect(h.invoke(lead)).toEqual({ ok: false });
    expect(h.lock.releaseLock).toHaveBeenCalledOnce();
  });
});
