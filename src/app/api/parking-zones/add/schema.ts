import { z } from "zod";

export const ParkingZoneSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is too long"),
  location: z
    .array(
      z.object({
        latitude: z
          .number()
          .min(-90, "Latitude must be between -90 and 90")
          .max(90),
        longitude: z
          .number()
          .min(-180, "Longitude must be between -180 and 180")
          .max(180),
      })
    )
    .length(2, "Location must have exactly two coordinates"),
});
