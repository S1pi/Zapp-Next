import { z } from "zod";

export const RoleSchema = z.object({
  id: z.number().int().positive({ message: "ID must be a positive integer" }),
  role: z.enum(["admin", "user", "dealer"], {
    message: "Role must be one of the following: admin, user, dealer",
  }),
});
