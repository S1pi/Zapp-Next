import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "@/lib/customErrors";
import formattedErrors from "@/lib/formattedErrors";
import { errorToResponse } from "@/lib/middleware/errorToResponse";
import { validateRequest } from "@/lib/middleware/validateRequest";
import { userLogin } from "@/services/userService";
import { LoginResponse } from "@/types/responses";
import { LoginCredentials } from "@/types/user";
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
    const user = await validateRequest<LoginCredentials>(req, UserSchema);

    let { email_or_phone, password } = user;

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
    const error = errorToResponse(err);
    return error;
  }
}
