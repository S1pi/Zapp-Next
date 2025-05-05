import { z } from "zod";

export const DriveSchema = z.object({
  driveId: z.number().min(1, { message: "userId is required" }),
  endLocation: z
    .string()
    .trim()
    .nonempty({ message: "endLocation is required" }),
});
