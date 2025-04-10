import { NotFoundError } from "@/lib/customErrors";
import formattedErrors from "@/lib/formattedErrors";
import { addNewCar } from "@/services/carService";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { FileSchema } from "@/lib/FileSchema";

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

  license_plate: z.string().regex(/^[A-Z]{1,3}-\d{1,3}$/, {
    message:
      "License plate must be in the format 'AAA-123' with min 1 and max 3 uppercase letters and min 1 and max 3 digits",
  }),
  seats: z.number().int().min(1, { message: "Seats must be at least 1" }),
});

export async function POST(req: NextRequest) {
  const userId = req.headers.get("X-User-Id");
  const userRole = req.headers.get("X-User-Role");

  if (userRole !== "admin" && userRole !== "dealer") {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "You are not authorized to add a cars",
      },
      { status: 403 }
    );
  }

  try {
    const formData = await req.formData();

    const bodyData = formData.get("data");
    const carShowCase = formData.get("car_showcase");

    if (!bodyData || typeof bodyData !== "string") {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    if (!carShowCase || !(carShowCase instanceof File)) {
      return NextResponse.json(
        { error: "Car showcase image is required" },
        { status: 400 }
      );
    }

    const parsedCarData = CarSchema.safeParse(JSON.parse(bodyData));
    const parsedCarShowcase = FileSchema.safeParse(carShowCase);

    if (!parsedCarShowcase.success) {
      return NextResponse.json(
        { errors: formattedErrors(parsedCarShowcase.error.errors) },
        { status: 400 }
      );
    }

    if (!parsedCarData.success) {
      return NextResponse.json(
        { errors: formattedErrors(parsedCarData.error.errors) },
        { status: 400 }
      );
    }

    const carInfo = parsedCarData.data;

    const createdCar = await addNewCar(
      Number(userId),
      carInfo,
      parsedCarShowcase.data
    );

    return NextResponse.json(createdCar, { status: 201 });
  } catch (err) {
    console.error("Error adding car:", err);

    if (err instanceof NotFoundError) {
      return NextResponse.json(
        { error: "Not Found", message: err.message },
        { status: err.statusCode }
      );
    }

    if (err instanceof TypeError) {
      if (err.message.includes('"multipart/form-data"')) {
        return NextResponse.json(
          { error: "Invalid Content-Type", message: err.message },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to add car" },
      { status: 500 }
    );
  }
}
