import { MissingDataError } from "@/lib/customErrors";
import { checkEmailOrPhoneExists } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const email = searchParams.get("email");
  const phone = searchParams.get("phone");

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
  }
}
