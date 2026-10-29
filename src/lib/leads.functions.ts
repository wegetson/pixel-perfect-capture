import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "1Ct6OWYNUOnCK2EKAvwWKQkQTKU0CUT6_RJLSBZl1iwQ";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  contact: z.string().trim().min(3).max(200),
  interests: z.array(z.string().max(50)).max(10),
  message: z.string().trim().max(3000),
});

// Prevents spreadsheet formula injection from form input.
const safe = (v: string) => (/^[=+\-@]/.test(v) ? `'${v}` : v);

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const sheetsKey = process.env["GOOGLE_SHEETS_API_KEY"];
    if (!lovableKey || !sheetsKey) {
      console.error("Missing Google Sheets credentials");
      return { ok: false as const };
    }
    const res = await fetch(
      `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/Arkusz1!A:D:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": sheetsKey,
        },
        body: JSON.stringify({
          values: [[safe(data.name), safe(data.contact), data.interests.join(", "), safe(data.message)]],
        }),
      },
    );
    if (!res.ok) {
      console.error(`Sheets append failed [${res.status}]: ${await res.text()}`);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
