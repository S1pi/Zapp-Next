import { getParkingZones } from "@/services/parkingService";
import { NextResponse } from "next/server";

export async function GET() {
  const parkingZoneResponse = await getParkingZones();

  return NextResponse.json(parkingZoneResponse, { status: 200 });
}
