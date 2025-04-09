import { NotFoundError } from "@/lib/customErrors";
import formattedErrors from "@/lib/formattedErrors";
import { updateUserRole } from "@/models/userModel";
import { modifyUserRole } from "@/services/userService";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const RoleSchema = z.object({
  id: z.number().int().positive({ message: "ID must be a positive integer" }),
  role: z.enum(["admin", "user", "dealer"], {
    message: "Role must be one of the following: admin, user, dealer",
  }),
});

export async function POST(req: NextRequest) {
  const userRole = req.headers.get("X-User-Role");
  if (userRole !== "admin") {
    return NextResponse.json(
      {
        error: "Forbidden",
        message: "Only admins are allowed to chancge roles",
      },
      { status: 403 }
    );
  }

  try {
    const bodyText = await req.text();
    if (!bodyText) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }
    const parsedBody = RoleSchema.safeParse(JSON.parse(bodyText));
    if (!parsedBody.success) {
      return NextResponse.json(
        { errors: formattedErrors(parsedBody.error.errors) },
        { status: 400 }
      );
    }

    const { id, role } = parsedBody.data;
    const user = await modifyUserRole(id, role);
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Internal server error: " + (err as Error).message },
      { status: 500 }
    );
  }
}
