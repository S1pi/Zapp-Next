import { NotFoundError } from "@/lib/customErrors";
import { validateRequest } from "@/lib/middleware/validateRequest";
import { driveEnd } from "@/services/driveService";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DriveSchema = z.object({
  userId: z.number().min(1, { message: "userId is required" }),
  carId: z.number().min(1, { message: "carId is required" }),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const front = formData.get("front");
    const back = formData.get("back");
    const left = formData.get("left");
    const right = formData.get("right");

    const bodyText = formData.get("data");

    console.log("formData", formData);
    console.log("front", front);
    console.log("back", back);
    console.log("left", left);
    console.log("right", right);

    const frontBuffer = Buffer.from(front as string, "base64");
    const backBuffer = Buffer.from(back as string, "base64");
    const leftBuffer = Buffer.from(left as string, "base64");
    const rightBuffer = Buffer.from(right as string, "base64");

    console.log(frontBuffer);
    console.log(backBuffer);
    console.log(leftBuffer);
    console.log(rightBuffer);

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

    if (!bodyText || typeof bodyText !== "string") {
      return NextResponse.json(
        { message: "Request body is required" },
        { status: 400 }
      );
    }

    type DriveEndRequest = {
      driveId: number;
      endLocation: string;
    };

    console.log("bodyTExt: " + bodyText);
    const body: DriveEndRequest = JSON.parse(bodyText);
    const { driveId, endLocation } = body;
    console.log("Drive request body:", body);
    const end = await driveEnd(
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
    if (err instanceof NotFoundError) {
      return NextResponse.json({ error: err.message }, { status: 404 });
    }
    console.log("Error in drive end route", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
