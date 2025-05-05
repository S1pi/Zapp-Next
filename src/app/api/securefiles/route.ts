import { requireRole } from "@/actions/authActions";
import { readFile } from "@/lib/readFile";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userRole = req.headers.get("X-User-Role");

  try {
    const params = req.nextUrl.searchParams;

    const fileUrl = params.get("fileurl");

    if (!fileUrl) {
      return NextResponse.json(
        { error: "File URL is required" },
        { status: 400 }
      );
    }

    await requireRole("admin", { mode: "response" });

    const fileReturn = await readFile(fileUrl);

    return new NextResponse(fileReturn.file, {
      headers: {
        "Content-Type": fileReturn.contentType,
      },
    });
  } catch (err) {
    if (err instanceof NextResponse && err.status === 401) {
      console.log("jootäs", err);
      return err;
    }
    return NextResponse.json({ error: `File: url not found` }, { status: 404 });
  }
}
