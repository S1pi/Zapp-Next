import { z } from "zod";

export const DriveSchema = z.object({
  carId: z.number().min(1, { message: "carId is required" }),
});
