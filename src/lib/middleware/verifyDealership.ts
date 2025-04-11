import { getDealershipIdByUser } from "@/services/dealershipService";
import { NextRequest, NextResponse } from "next/server";

export async function verifyDealership(
  req: NextRequest,
  dealershipId: number
): Promise<NextResponse | null> {
  const userId = req.headers.get("X-User-Id");
  const userRole = req.headers.get("X-User-Role");

  if (!userId || !userRole) {
    return NextResponse.json(
      { error: "User ID and role are required" },
      { status: 401 }
    );
  }

  if (userRole !== "admin" && userRole !== "dealer") {
    return NextResponse.json(
      {
        error: "Forbidden",
        message: "You are not authorized to access this resource",
      },
      { status: 403 }
    );
  }

  if (userRole === "admin") return null; // Admins can access all dealerships

  const linkedDealershipId = await getDealershipIdByUser(Number(userId));

  if (!linkedDealershipId) {
    return NextResponse.json(
      { error: "User is not linked to any dealership" },
      { status: 403 }
    );
  }

  if (linkedDealershipId !== dealershipId) {
    return NextResponse.json(
      {
        error: "Forbidden",
        message: "You are not authorized to access this dealership",
      },
      { status: 403 }
    );
  } else {
    return null; // User is linked to the dealership, proceed with the request
  }
}
