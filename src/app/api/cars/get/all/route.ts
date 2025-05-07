import { selectAllCarsWithShowcase } from "@/models/carModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userRole = req.headers.get("X-User-Role");

  if (userRole !== "admin") {
    return NextResponse.json(
      {
        error: "Forbidden",
        message: "You are not authorized to view all cars",
      },
      { status: 403 }
    );
  }

  try {
    // const cars = await selectAllCars(); // This was old one to get all cars
    const cars = await selectAllCarsWithShowcase(); // This is the new one to get all cars with showcase

    if (!cars || cars.length === 0) {
      return NextResponse.json({ error: "No cars found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "List of all cars", cars: cars },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching cars:", err);
    return NextResponse.json(
      { error: "Failed to fetch cars", details: (err as Error).message },
      { status: 500 }
    );
  }
}
