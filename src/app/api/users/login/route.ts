import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/customErrors";
import formattedErrors from "@/lib/formattedErrors";
import { userLogin } from "@/services/userService";
import { LoginResponse } from "@/types/responses";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UserSchema = z.object({
  email_or_phone: z
    .string()
    .nonempty({ message: "Email or phone number is required" })
    .transform((value) => value.replace(/\s+/g, "")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must be at most 32 characters long" }),
});

const normalizePhoneNumber = (phone: string) => {
  const normalizedPhone = phone
    .trim()
    .replace(/\s+/g, "")
    .replace(/^0/, "+358");
  return normalizedPhone;
};

export async function POST(req: NextRequest) {
  console.log("Request method:", req.method);
  try {
    const bodyText = await req.text();
    console.log("Request body:", bodyText);

    if (!bodyText) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    console.log("Parsed body:", JSON.parse(bodyText));
    const user = UserSchema.safeParse(JSON.parse(bodyText));

    if (!user.success) {
      return NextResponse.json(
        { errors: formattedErrors(user.error.errors) },
        { status: 400 }
      );
    }

    let { email_or_phone, password } = user.data;

    console.log(email_or_phone);

    // const emailOrPhoneType = emailOrPhone.includes("@") ? "email" : "phone number";

    if (!email_or_phone.includes("@")) {
      const normalizedPhone = normalizePhoneNumber(email_or_phone);
      email_or_phone = normalizedPhone;
    }

    const loginResponse: LoginResponse = await userLogin(
      email_or_phone,
      password
    );

    return NextResponse.json(loginResponse, { status: 200 });
  } catch (err) {
    console.log("Error in login route", err);
    if (err instanceof NotFoundError) {
      // Check if this should return 401 instead of 404 if user is not found for security reasons
      return NextResponse.json(
        { error: "User not found" },
        { status: err.statusCode }
      );
    }

    if (err instanceof UnauthorizedError) {
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

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error: " + (err as Error).message },
      { status: 500 }
    );
  }
}
