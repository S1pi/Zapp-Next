import { z } from "zod";

export const CarSchema = z.object({
  dealership_id: z
    .number()
    .int()
    .positive({ message: "Dealership ID must be a positive integer" }),
  brand: z.string(),
  model: z.string(),
  color: z.string().min(3, {
    message: "Color must be at least 3 characters long",
  }),
  year: z.number().min(1886).max(new Date().getFullYear(), {
    message: "Year must be between 1886 and the current year",
  }),

  license_plate: z.string().regex(/^[A-Z]{1,3}-\d{1,3}$/, {
    message:
      "License plate must be in the format 'AAA-123' with min 1 and max 3 uppercase letters and min 1 and max 3 digits",
  }),
  seats: z.number().int().min(1, { message: "Seats must be at least 1" }),
  location: z.object({
    latitude: z.number().min(-90).max(90, {
      message: "Latitude must be between -90 and 90",
    }),
    longitude: z.number().min(-180).max(180, {
      message: "Longitude must be between -180 and 180",
    }),
  }),
});
