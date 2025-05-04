import {
  DuplicateEntryError,
  ForbiddenError,
  MissingDataError,
  NotFoundError,
} from "@/lib/customErrors";
import { FileSchema } from "@/lib/FileSchema";
import { errorToResponse } from "@/lib/middleware/errorToResponse";
import { driveEnd } from "@/services/driveService";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DriveSchema = z.object({
  driveId: z.number().min(1, { message: "userId is required" }),
  endLocation: z
    .string()
    .trim()
    .nonempty({ message: "endLocation is required" }),
});

export async function POST(req: NextRequest) {
  const userId = req.headers.get("X-User-Id");
  try {
    const formData = await req.formData();

    const front = formData.get("front");
    const back = formData.get("back");
    const left = formData.get("left");
    const right = formData.get("right");

    const bodyText = formData.get("data");

    if (!front || !back || !left || !right) {
      throw new MissingDataError("All images are required");
    }

    if (!bodyText || typeof bodyText !== "string") {
      throw new MissingDataError("Request body is required");
    }

    type DriveEndRequest = {
      driveId: number;
      endLocation: string;
    };

    const body: DriveEndRequest = JSON.parse(bodyText);
    const parsedBody = DriveSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { errors: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const frontBuffer = Buffer.from(front as string, "base64");
    const backBuffer = Buffer.from(back as string, "base64");
    const leftBuffer = Buffer.from(left as string, "base64");
    const rightBuffer = Buffer.from(right as string, "base64");

    const frontFile = new File([frontBuffer], "front.jpg", {
      type: "image/jpeg",
    });
    const backFile = new File([backBuffer], "back.jpg", {
      type: "image/jpeg",
    });
    const leftFile = new File([leftBuffer], "left.jpg", {
      type: "image/jpeg",
    });
    const rightFile = new File([rightBuffer], "right.jpg", {
      type: "image/jpeg",
    });

    const parsedFrontFile = FileSchema.safeParse(frontFile);
    const parsedBackFile = FileSchema.safeParse(backFile);
    const parsedLeftFile = FileSchema.safeParse(leftFile);
    const parsedRightFile = FileSchema.safeParse(rightFile);

    if (!parsedFrontFile.success) {
      return NextResponse.json(
        { errors: parsedFrontFile.error.errors },
        { status: 400 }
      );
    }
    if (!parsedBackFile.success) {
      return NextResponse.json(
        { errors: parsedBackFile.error.errors },
        { status: 400 }
      );
    }
    if (!parsedLeftFile.success) {
      return NextResponse.json(
        { errors: parsedLeftFile.error.errors },
        { status: 400 }
      );
    }
    if (!parsedRightFile.success) {
      return NextResponse.json(
        { errors: parsedRightFile.error.errors },
        { status: 400 }
      );
    }

    const { driveId, endLocation } = body;
    const end = await driveEnd(
      Number(userId),
      driveId,
      endLocation,
      frontFile,
      backFile,
      leftFile,
      rightFile
    );

    return NextResponse.json(
      {
        message: end.message,
        duration: end.durationMinutes,
        cost: end.cost,
      },
      { status: 200 }
    );
  } catch (err) {
    const error = errorToResponse(err);
    return error;
  }
}
