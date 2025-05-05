import { z } from "zod";

export const UserSchema = z.object({
  email_or_phone: z
    .string()
    .nonempty({ message: "Email or phone number is required" })
    .transform((value) => value.replace(/\s+/g, "")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must be at most 32 characters long" }),
});
