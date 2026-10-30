import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { appendLead } from "./leads.server";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  contact: z.string().trim().min(3).max(200),
  interests: z.array(z.string().max(50)).max(10),
  message: z.string().trim().max(3000),
});

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => appendLead(data));
