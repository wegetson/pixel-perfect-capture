import { getRequest } from "@tanstack/react-start/server";

const SPREADSHEET_ID = "1Ct6OWYNUOnCK2EKAvwWKQkQTKU0CUT6_RJLSBZl1iwQ";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

type Lead = { name: string; contact: string; interests: string[]; message: string };
type WorkerRequest = Request & {
  runtime?: { cloudflare?: { env?: Record<string, unknown> } };
};

// Nitro attaches Cloudflare bindings to the request. Read those first so secrets
// work even when the deployment does not populate Node's process.env.
function credential(name: string, bindings: Record<string, unknown> | undefined) {
  const value = bindings?.[name] ?? process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

export async function appendLead(data: Lead): Promise<{ ok: boolean }> {
  const bindings = (getRequest() as WorkerRequest).runtime?.cloudflare?.env;
  const webhookUrl = credential("GOOGLE_SHEETS_WEBHOOK_URL", bindings);
  const webhookToken = credential("GOOGLE_SHEETS_WEBHOOK_TOKEN", bindings);
  if (webhookUrl || webhookToken) {
    if (
      !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(webhookUrl) ||
      webhookToken.length < 32
    ) {
      console.error(
        "Contact form: configure a deployed Apps Script URL and its shared token as runtime secrets.",
      );
      return { ok: false };
    }
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: webhookToken, ...data }),
        signal: AbortSignal.timeout(25_000),
      });
      if (!response.ok) {
        console.error(`Contact form: Apps Script failed (HTTP ${response.status}).`);
        return { ok: false };
      }
      const result = (await response.json()) as { ok?: boolean; updatedRows?: number } | null;
      if (result?.ok !== true || result.updatedRows !== 1) {
        console.error("Contact form: Apps Script did not confirm saving one row.");
        return { ok: false };
      }
      return { ok: true };
    } catch {
      console.error("Contact form: Apps Script timed out or returned an invalid response.");
      return { ok: false };
    }
  }
  const lovableKey = credential("LOVABLE_API_KEY", bindings);
  const sheetsKey = credential("GOOGLE_SHEETS_API_KEY", bindings);
  if (
    !lovableKey ||
    !sheetsKey ||
    lovableKey === "LOVABLE_API_KEY" ||
    sheetsKey === "GOOGLE_SHEETS_API_KEY"
  ) {
    console.error(
      "Contact form: configure LOVABLE_API_KEY and GOOGLE_SHEETS_API_KEY as runtime secrets.",
    );
    return { ok: false };
  }

  try {
    const res = await fetch(
      `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/Arkusz1!A:D:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": sheetsKey,
        },
        // RAW stores user input as text, including strings beginning with '='.
        body: JSON.stringify({
          values: [[data.name, data.contact, data.interests.join(", "), data.message]],
        }),
        signal: AbortSignal.timeout(15_000),
      },
    );
    if (!res.ok) {
      // Do not log response bodies: they can echo a lead's personal data.
      console.error(`Contact form: Sheets append failed (HTTP ${res.status}).`);
      return { ok: false };
    }
    const result = (await res.json()) as { updates?: { updatedRows?: number } } | null;
    if (result?.updates?.updatedRows !== 1) {
      console.error("Contact form: Sheets did not confirm saving one row.");
      return { ok: false };
    }
    return { ok: true };
  } catch {
    console.error("Contact form: Sheets request timed out or returned an invalid response.");
    return { ok: false };
  }
}
