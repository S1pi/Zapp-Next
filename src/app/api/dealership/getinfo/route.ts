import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  return NextResponse.json(
    { message: "This is not a protected route" },
    { status: 200 }
  );
}
