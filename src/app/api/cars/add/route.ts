import formattedErrors from "@/lib/formattedErrors";
import { addNewCar } from "@/services/carService";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CarSchema = z.object({
  dealership_id: z
    .number()
    .int()
    .positive({ message: "Dealership ID must be a positive integer" }),
  brand: z.string(),
  model: z.string(),
  year: z.number().min(1886).max(new Date().getFullYear(), {
    message: "Year must be between 1886 and the current year",
  }),
  license_plate: z.string().regex(/^[A-Z0-9]{1,7}$/, {
    message: "License plate must be 1-7 alphanumeric characters",
  }),
  seats: z.number().int().min(1, { message: "Seats must be at least 1" }),
});

export async function POST(req: NextRequest) {
  const bodyText = await req.text();

  if (!bodyText) {
    return NextResponse.json(
      { error: "Request body is required" },
      { status: 400 }
    );
  }

  const parsedCar = CarSchema.safeParse(JSON.parse(bodyText));

  if (!parsedCar.success) {
    return NextResponse.json(
      { errors: formattedErrors(parsedCar.error.errors) },
      { status: 400 }
    );
  }

  const carInfo = parsedCar.data;

  const createdCar = await addNewCar(carInfo);

  return NextResponse.json(createdCar, { status: 201 });
}
