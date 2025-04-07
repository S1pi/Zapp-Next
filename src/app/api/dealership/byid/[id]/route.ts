import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import formattedErrors from "@/lib/formattedErrors";
import { getDealershipById } from "@/models/dealershipModel";

const DealershipSchema = z.object({
  id: z.number().int().positive({ message: "ID must be a positive integer" }),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userRole = req.headers.get("X-User-Role");
  if (userRole !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized", message: "Only admins are allowed" },
      { status: 403 }
    );
  }

  const { id } = await params;
  try {
    const parsedId = DealershipSchema.safeParse({ id: Number(id) });
    if (!parsedId.success) {
      return NextResponse.json(
        { errors: formattedErrors(parsedId.error.errors) },
        { status: 400 }
      );
    }
    const dealershipId = parsedId.data.id;
    const dealership = await getDealershipById(dealershipId);

    return NextResponse.json(
      { message: "Dealerhip found", dealership: dealership },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error getting dealership by ID", err);
    if ((err as Error).message.includes("not found")) {
      return NextResponse.json(
        { error: "Dealership not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error: " + (err as Error).message },
      { status: 500 }
    );
  }
}
