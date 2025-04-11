import formattedErrors from "@/lib/formattedErrors";
import { addParkingZone } from "@/services/parkingService";
import { NewParkingZone } from "@/types/parking";
import { NextResponse } from "next/server";
import { z } from "zod";

const ParkingZoneSchema = z.object({
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

export async function POST(request: Request) {
  const role = request.headers.get("X-User-Role");

  if (role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bodyText = await request.text();

    if (!bodyText) {
      return NextResponse.json(
        { error: "Invalid request, body is required" },
        { status: 400 }
      );
    }

    const body = JSON.parse(bodyText);

    const parsedBody = ParkingZoneSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { errors: formattedErrors(parsedBody.error.errors) },
        { status: 400 }
      );
    }

    const { name, description, location }: NewParkingZone = parsedBody.data;

    const parkingZoneResponse = await addParkingZone({
      name,
      description,
      location,
    });

    console.log(parkingZoneResponse);

    return NextResponse.json(parkingZoneResponse, { status: 201 });
  } catch (err) {
    console.log(err);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
