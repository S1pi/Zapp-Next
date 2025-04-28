import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function verifyAdmin(req: NextRequest) {
  console.log("Verifying admin middleware");
  const token = req.cookies.get("authToken")?.value;
  if (!token) return NextResponse.redirect(new URL("/auth/login", req.url));

  try {
    const { id, role, validated } = await verifyToken(token);

    if (!["admin", "dealer"].includes(role)) {
      // Check how this should be handled in the middleware
      // For now, we just throw an error
      throw new Error("User is not an admin or dealer");
    }

    const newHeaders = new Headers(req.headers);
    newHeaders.set("X-User-Id", String(id));
    newHeaders.set("X-User-Role", role);
    newHeaders.set("X-User-Validated", String(validated));
    return NextResponse.next({ request: { headers: newHeaders } });
  } catch (err) {
    console.error("Error verifying admin:", err);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
