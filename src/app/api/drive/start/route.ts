import { NotFoundError } from "@/lib/customErrors";
import { validateRequest } from "@/lib/middleware/validateRequest";
import { driveStart } from "@/services/driveService";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DriveSchema = z.object({
  userId: z.number().min(1, { message: "userId is required" }),
  carId: z.number().min(1, { message: "carId is required" }),
});

type DriveRequest = {
  userId: number;
  carId: number;
};

export async function POST(req: NextRequest) {
  try {
    const body = await validateRequest<DriveRequest>(req, DriveSchema);
    if (body instanceof NextResponse) return body;

    const { userId, carId } = body;
    console.log("Drive request body:", body);

    const start = await driveStart(userId, carId);
    return NextResponse.json(
      {
        message: start.message,
        driveId: start.driveId,
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof NotFoundError) {
      return NextResponse.json({ error: err.message }, { status: 404 });
    }
    console.log("Error in drive start route", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
