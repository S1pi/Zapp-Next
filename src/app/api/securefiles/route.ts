import { readFile } from "@/lib/readFile";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userRole = req.headers.get("X-User-Role");

  if (userRole !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }

  const params = req.nextUrl.searchParams;

  const fileUrl = params.get("fileurl");

  if (!fileUrl) {
    return NextResponse.json(
      { error: "File URL is required" },
      { status: 400 }
    );
  }

  try {
    const fileReturn = await readFile(fileUrl);

    return new NextResponse(fileReturn.file, {
      headers: {
        "Content-Type": fileReturn.contentType,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: `File: ${fileUrl} not found` },
      { status: 404 }
    );
  }
}
