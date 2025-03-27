import { NotFoundError, UnauthorizedError } from "@/lib/customErrors";
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

export async function POST(req: NextRequest) {
  try {
    const bodyText = await req.text();

    if (!bodyText) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    const user = UserSchema.safeParse(JSON.parse(bodyText));

    if (!user.success) {
      return NextResponse.json(
        { errors: formattedErrors(user.error.errors) },
        { status: 400 }
      );
    }

    const { email_or_phone, password } = user.data;

    console.log(email_or_phone);

    // const emailOrPhoneType = emailOrPhone.includes("@") ? "email" : "phone number";

    const loginResponse: LoginResponse = await userLogin(
      email_or_phone,
      password
    );

    return NextResponse.json(loginResponse, { status: 200 });
  } catch (err) {
    if (err instanceof NotFoundError) {
      // Check if this should return 401 instead of 404 if user is not found for security reasons
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Internal server error: " + (err as Error).message },
      { status: 500 }
    );
  }
}
