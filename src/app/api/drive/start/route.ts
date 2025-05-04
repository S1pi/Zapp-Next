import {
  DuplicateEntryError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/customErrors";
import { validateRequest } from "@/lib/middleware/validateRequest";
import { driveStart } from "@/services/driveService";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DriveSchema = z.object({
  carId: z.number().min(1, { message: "carId is required" }),
});

type DriveRequest = {
  carId: number;
};

export async function POST(req: NextRequest) {
  const userId = req.headers.get("X-User-Id");
  try {
    const body = await validateRequest<DriveRequest>(req, DriveSchema);
    if (body instanceof NextResponse) return body;

    const { carId } = body;
    console.log("Drive request body:", body);

    const start = await driveStart(Number(userId), carId);
    return NextResponse.json(
      {
        message: start.message,
        driveId: start.driveId,
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof NotFoundError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    if (err instanceof ForbiddenError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    if (err instanceof DuplicateEntryError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    console.log("Error in drive start route", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
