import { NextRequest, NextResponse } from "next/server";
import formattedErrors from "../formattedErrors";
import { SafeParseSuccess, ZodSchema } from "zod";

export async function validateRequest<T>(
  req: NextRequest,
  schema: ZodSchema<any>
): Promise<NextResponse | T> {
  try {
    const bodyText = await req.text();
    if (!bodyText) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    const parsedBody = schema.safeParse(JSON.parse(bodyText));
    if (!parsedBody.success) {
      return NextResponse.json(
        { errors: formattedErrors(parsedBody.error.errors) },
        { status: 400 }
      );
    }
    const response = parsedBody.data as T;
    return response;
  } catch (err) {
    console.error("Error validating request:", err);
    return NextResponse.json(
      { error: "Internal server error: " + (err as Error).message },
      { status: 500 }
    );
  }
}
