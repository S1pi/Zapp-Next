"use server";
import { ActionResult } from "@/components/ui/Form";
import { NotFoundError, UnauthorizedError } from "@/lib/customErrors";
import { normalizePhoneNumber } from "@/lib/normalizePhone";
import { loginSchema } from "@/lib/schemas/loginSchema";
import { getUserByEmailOrPhone } from "@/models/userModel";
import { userLogin } from "@/services/userService";
import { LoginResponse } from "@/types/responses";
import { cookies } from "next/headers";
import { z } from "zod";

type LoginValues = z.infer<typeof loginSchema>;

export async function loginAction(
  data: LoginValues
): Promise<ActionResult<LoginValues, LoginResponse["user"]>> {
  console.log("Server action called with data:", data);

  const parsedData = loginSchema.safeParse(data);
  if (!parsedData.success) {
    const issue = parsedData.error.issues[0];
    const field = issue.path[0] as keyof LoginValues; // Get the field name from the error path

    return {
      success: false,
      field,
      message: issue.message,
    };
  }

  let { email_or_phone, password } = parsedData.data;
  console.log("Parsed data:", parsedData.data);

  if (!email_or_phone.includes("@")) {
    const normalizedPhone = normalizePhoneNumber(email_or_phone);
    email_or_phone = normalizedPhone;
  }

  let loginResponse: LoginResponse;

  try {
    loginResponse = await userLogin(email_or_phone, password);
    console.log("Login response:", loginResponse);
  } catch (err) {
    console.log("Error in login action", err);
    if (err instanceof NotFoundError) {
      return {
        success: false,
        field: "password",
        message: "Username or password is incorrect",
      };
    }
    if (err instanceof UnauthorizedError) {
      return {
        success: false,
        field: "password",
        message: "Username or password is incorrect",
      };
    }

    return {
      success: false,
      message: "Login failed",
    };
  }

  const { token, user } = loginResponse;
  const role = user.role;

  if (!["dealer", "admin"].includes(role)) {
    return {
      success: false,
      field: "email_or_phone",
      message: "You do not have permission to access this page",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set({
    name: "authToken",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  return {
    success: true,
    message: "Logged in successfully",
    resultData: user,
  };
}
