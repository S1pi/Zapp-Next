import { selectAllCars } from "@/models/carModel";
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
    const cars = await selectAllCars();

    if (!cars) {
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
