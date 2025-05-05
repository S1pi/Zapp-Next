import { z } from "zod";

export const newParkingZoneSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z
    .array(
      z.object({
        lat: z.number().min(-90).max(90, {
          message: "Latitude must be between -90 and 90",
        }),
        lng: z.number().min(-180).max(180, {
          message: "Longitude must be between -180 and 180",
        }),
      })
    )
    .length(2, "Location must have exactly two coordinates"),
});
