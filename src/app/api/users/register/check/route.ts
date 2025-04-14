import { MissingDataError } from "@/lib/customErrors";
import { checkEmailOrPhoneExists } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

const normalizePhoneNumber = (phone: string) => {
  const normalizedPhone = phone
    .trim()
    .replace(/\s+/g, "")
    .replace(/^0/, "+358");
  return normalizedPhone;
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const email = searchParams.get("email");
  let phone = searchParams.get("phone");

  if (phone) {
    const normalizedPhone = normalizePhoneNumber(phone);
    console.log("Normalized phone:", normalizedPhone);
    phone = normalizedPhone;
  }

  console.log(
    "Checking for user registration with email:",
    email,
    "and phone:",
    phone
  );

  try {
    const userExists = await checkEmailOrPhoneExists(email, phone);

    console.log("User exists:", userExists);

    if (userExists) {
      return NextResponse.json(
        {
          message: "User with this email or phone number already exists",
          available: false,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Email and phonenumber available", available: true },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error checking phone and email:", err);

    if (err instanceof MissingDataError) {
      return NextResponse.json(
        { message: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { message: "Internal server error: " },
      { status: 500 }
    );
  }
}
