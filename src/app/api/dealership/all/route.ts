import { NotFoundError } from "@/lib/customErrors";
import { errorToResponse } from "@/lib/middleware/errorToResponse";
import { selectAllDealerships } from "@/models/dealershipModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const dealerships = await selectAllDealerships();
    if (!dealerships) {
      throw new NotFoundError("No dealerships found");
    }

    return NextResponse.json(
      { message: "List of all dealerships", dealerships: dealerships },
      { status: 200 }
    );
  } catch (err) {
    errorToResponse(err);
  }
}
