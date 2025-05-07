import { z } from "zod";

export const DealershipSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }).trim(),
  address: z.string().nonempty({ message: "Address is required" }).trim(),
  registeration_number: z
    .string()
    .nonempty({ message: "Registration number is required" })
    .trim()
    .regex(/^[A-Z]{1,3}-\d{1,3}$/, {
      message:
        "Registration number must be in the format 'AAA-123' with min 1 and max 3 uppercase letters and min 1 and max 3 digits",
    }),
});
