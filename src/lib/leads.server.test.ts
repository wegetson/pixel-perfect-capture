import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getRequest } from "@tanstack/react-start/server";
import { appendLead } from "./leads.server";

vi.mock("@tanstack/react-start/server", () => ({ getRequest: vi.fn() }));

const lead = {
  name: "Test formularza",
  contact: "+48123456789",
  interests: ["Strona WWW", "Google Ads"],
  message: "=To ma pozostać tekstem",
};
const request = { runtime: { cloudflare: { env: {} as Record<string, string> } } };
const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubEnv("LOVABLE_API_KEY", "");
  vi.stubEnv("GOOGLE_SHEETS_API_KEY", "");
  vi.stubEnv("GOOGLE_SHEETS_WEBHOOK_URL", "");
  vi.stubEnv("GOOGLE_SHEETS_WEBHOOK_TOKEN", "");
  request.runtime.cloudflare.env = {};
  vi.mocked(getRequest).mockReturnValue(request as unknown as Request);
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function configureWorker() {
  request.runtime.cloudflare.env = {
    LOVABLE_API_KEY: "worker-project-key",
    GOOGLE_SHEETS_API_KEY: "worker-connection-key",
  };
}

describe("contact form storage", () => {
  it("uses Apps Script without any Lovable credentials", async () => {
    request.runtime.cloudflare.env = {
      GOOGLE_SHEETS_WEBHOOK_URL: "https://script.google.com/macros/s/test-deployment/exec",
      GOOGLE_SHEETS_WEBHOOK_TOKEN: "test-token-that-is-at-least-32-characters",
    };
    fetchMock.mockResolvedValue(Response.json({ ok: true, updatedRows: 1 }));
    expect(await appendLead(lead)).toEqual({ ok: true });
    const [url, options] = fetchMock.mock.calls[0]!;
    expect(url).toBe(request.runtime.cloudflare.env["GOOGLE_SHEETS_WEBHOOK_URL"]);
    expect(JSON.parse(String(options?.body))).toEqual({
      token: request.runtime.cloudflare.env["GOOGLE_SHEETS_WEBHOOK_TOKEN"],
      ...lead,
    });
  });

  it("does not fall back to Lovable when the webhook is only partially configured", async () => {
    configureWorker();
    request.runtime.cloudflare.env["GOOGLE_SHEETS_WEBHOOK_URL"] =
      "https://script.google.com/macros/s/test/exec";
    expect(await appendLead(lead)).toEqual({ ok: false });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects an Apps Script response that did not confirm the row", async () => {
    request.runtime.cloudflare.env = {
      GOOGLE_SHEETS_WEBHOOK_URL: "https://script.google.com/macros/s/test/exec",
      GOOGLE_SHEETS_WEBHOOK_TOKEN: "test-token-that-is-at-least-32-characters",
    };
    fetchMock.mockResolvedValue(Response.json({ ok: false }));
    expect(await appendLead(lead)).toEqual({ ok: false });
  });

  it("never sends the shared token to an arbitrary webhook host", async () => {
    request.runtime.cloudflare.env = {
      GOOGLE_SHEETS_WEBHOOK_URL: "https://example.com/exec",
      GOOGLE_SHEETS_WEBHOOK_TOKEN: "test-token-that-is-at-least-32-characters",
    };
    expect(await appendLead(lead)).toEqual({ ok: false });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not send a lead without both runtime secrets", async () => {
    expect(await appendLead(lead)).toEqual({ ok: false });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects variable names pasted as secret values", async () => {
    request.runtime.cloudflare.env = {
      LOVABLE_API_KEY: "LOVABLE_API_KEY",
      GOOGLE_SHEETS_API_KEY: "GOOGLE_SHEETS_API_KEY",
    };
    expect(await appendLead(lead)).toEqual({ ok: false });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("uses Worker bindings and stores all four fields as RAW text", async () => {
    configureWorker();
    fetchMock.mockResolvedValue(Response.json({ updates: { updatedRows: 1 } }));
    expect(await appendLead(lead)).toEqual({ ok: true });
    const [url, options] = fetchMock.mock.calls[0]!;
    expect(String(url)).toContain(
      "1Ct6OWYNUOnCK2EKAvwWKQkQTKU0CUT6_RJLSBZl1iwQ/values/Arkusz1!A:D:append?valueInputOption=RAW",
    );
    expect(options?.headers).toMatchObject({
      Authorization: "Bearer worker-project-key",
      "X-Connection-Api-Key": "worker-connection-key",
    });
    expect(JSON.parse(String(options?.body))).toEqual({
      values: [[lead.name, lead.contact, "Strona WWW, Google Ads", lead.message]],
    });
    expect(options?.signal).toBeInstanceOf(AbortSignal);
  });

  it("also supports the local Node environment", async () => {
    vi.stubEnv("LOVABLE_API_KEY", "local-project-key");
    vi.stubEnv("GOOGLE_SHEETS_API_KEY", "local-connection-key");
    fetchMock.mockResolvedValue(Response.json({ updates: { updatedRows: 1 } }));
    expect(await appendLead(lead)).toEqual({ ok: true });
  });

  it("does not report success for rejected credentials or missing sheet access", async () => {
    configureWorker();
    fetchMock.mockResolvedValue(new Response("private upstream response", { status: 403 }));
    expect(await appendLead(lead)).toEqual({ ok: false });
    expect(console.error).not.toHaveBeenCalledWith(
      expect.stringContaining("private upstream response"),
    );
  });

  it("requires Google Sheets to confirm the saved row", async () => {
    configureWorker();
    fetchMock.mockResolvedValue(Response.json({}));
    expect(await appendLead(lead)).toEqual({ ok: false });
  });

  it("handles network failures without losing control of the form", async () => {
    configureWorker();
    fetchMock.mockRejectedValue(new DOMException("timeout", "TimeoutError"));
    expect(await appendLead(lead)).toEqual({ ok: false });
  });
});
