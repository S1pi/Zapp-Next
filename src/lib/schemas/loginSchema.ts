import { z } from "zod";

export const loginSchema = z.object({
  email_or_phone: z
    .string()
    .nonempty({ message: "Email or phone number is required" })
    .transform((value) => value.replace(/\s+/g, "")),
  password: z.string().nonempty({ message: "Password is required" }),
});
