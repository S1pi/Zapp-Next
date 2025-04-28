import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/auth/login", req.url));

  response.cookies.set({
    name: "authToken",
    value: "",
    path: "/", // sama path
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0, // tai expires: new Date(0)
  });

  return response;
}
