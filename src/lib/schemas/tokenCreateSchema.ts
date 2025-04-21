import { z } from "zod";

export const TokenCreateSchema = z.object({
  inviteCode: z
    .string()
    .min(1, { message: "Invite code is required" })
    .min(8, { message: "Invite code must be at least 8 characters long" })
    .max(20, { message: "Invite code must be at most 20 characters long" }),
  expiryDate: z.string().min(1, { message: "Expiry date is required" }),
  roleToAssign: z.enum(["admin", "dealer"], {
    errorMap: () => ({ message: "Role to assign is required" }),
  }),
});

export const TokenValidationSchema = z.object({
  inviteCode: z
    .string()
    .min(1, { message: "Invite code is required" })
    .min(8, { message: "Invite code must be at least 8 characters long" })
    .max(20, { message: "Invite code must be at most 20 characters long" }),
});
