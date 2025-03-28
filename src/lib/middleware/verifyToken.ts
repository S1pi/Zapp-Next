import { NextRequest, NextResponse } from "next/server";
import { TokenData } from "@/types/user";
import { jwtVerify } from "jose";

export async function verifyToken(
  req: NextRequest
): Promise<NextResponse | null> {
  // console.log("Verifying token", req.nextUrl.pathname);
  const authToken = req.headers.get("Authorization")?.split(" ")[1];

  console.log("Checking auth token", authToken);
  if (!authToken) {
    return NextResponse.json(
      { error: "Authorization token is required" },
      { status: 401 }
    );
  }

  if (!process.env.JWT_SECRET) {
    return NextResponse.json(
      { error: "JWT_SECRET is not defined" },
      { status: 500 }
    );
  }

  try {
    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(authToken, jwtSecret);

    console.log("Decoded payload", payload);

    const { id, role } = payload as TokenData;

    if (!id || !role) {
      return NextResponse.json(
        { error: "Token is not valid or missing fields" },
        { status: 403 }
      );
    }

    const res = NextResponse.next();
    res.headers.set("X-User-Id", String(id));
    res.headers.set("X-User-Role", role);
    return res;
  } catch (err) {
    console.error("Error decoding token", err);

    return NextResponse.json(
      { error: "Forbidden - invalid token" },
      { status: 403 }
    );
  }
}
