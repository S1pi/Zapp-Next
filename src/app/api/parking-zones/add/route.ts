import { addParkingZone } from "@/services/parkingService";
import { NewParkingZone } from "@/types/parking";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  //   const role = request.headers.get("X-User-Role");

  //   if (role !== "admin") {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }

  const bodyText = await request.text();

  if (!bodyText) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const body = JSON.parse(bodyText);

  const { name, description, location }: NewParkingZone = body;

  // For visual reference location:
  // [
  //   { latitude: 1, longitude: 2 }, // topLeft
  //   { latitude: 3, longitude: 4 }, // bottomRight
  // ]

  // Zod validation can be added here if needed

  const parkingZoneResponse = await addParkingZone({
    name,
    description,
    location,
  });

  console.log(parkingZoneResponse);

  return NextResponse.json(parkingZoneResponse, { status: 201 });
}
