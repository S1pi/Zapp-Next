import { DuplicateEntryError } from "@/lib/customErrors";
import formattedErrors from "@/lib/formattedErrors";
import { createDealership } from "@/services/dealershipService";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DealershipSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }).trim(),
  address: z.string().nonempty({ message: "Address is required" }).trim(),
});

export async function POST(req: NextRequest) {
  const userId = req.headers.get("X-User-Id");
  const userRole = req.headers.get("X-User-Role");


  if (userRole !== "admin" && userRole !== "dealer") {
    return NextResponse.json(
      { error: "Unauthorized", message: "Only Admins and Dealers can create Dealerships" },
      { status: 403 }
    );
  }

  try {
    const bodyText = await req.text();

    if (!bodyText) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    const dealership = DealershipSchema.safeParse(JSON.parse(bodyText));
    if (!dealership.success) {
      return NextResponse.json(
        { errors: formattedErrors(dealership.error.errors) },
        { status: 400 }
      );
    }

    const { name, address } = dealership.data;

    const createdDealership = await createDealership({
      name,
      address,
      contact_id: Number(userId),
    });

    return NextResponse.json(createdDealership, { status: 201 });
  } catch (err) {
    if (err instanceof DuplicateEntryError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Internal server error: " + (err as Error).message },
      { status: 500 }
    );
  }
}
