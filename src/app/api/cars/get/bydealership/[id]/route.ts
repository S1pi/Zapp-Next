import { NotFoundError } from "@/lib/customErrors";
import { verifyDealership } from "@/lib/middleware/verifyDealership";
import { getDealershipCars } from "@/services/carService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const dealershipId = Number(id);

    const authResult = await verifyDealership(req, dealershipId);
    if (authResult) return authResult;

    const dealershipCars = await getDealershipCars(dealershipId);

    return NextResponse.json(dealershipCars, {
      status: 200,
    });
  } catch (err) {
    console.log(err);

    if (err instanceof NotFoundError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch cars for the dealership" },
      { status: 500 }
    );
  }
}
