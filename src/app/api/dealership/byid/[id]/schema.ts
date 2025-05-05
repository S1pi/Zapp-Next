import { z } from "zod";

export const DealershipSchema = z.object({
  id: z.number().int().positive({ message: "ID must be a positive integer" }),
});
