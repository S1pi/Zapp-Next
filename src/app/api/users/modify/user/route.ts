import { NotFoundError } from "@/lib/customErrors";
import { validateRequest } from "@/lib/middleware/validateRequest";
import { modifyUser } from "@/services/userService";
import { UserUpdate } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";
import { UserSchema } from "./schema";

export async function PUT(req: NextRequest) {
  const userId = req.headers.get("X-User-Id");
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    const parsedBody = await validateRequest<UserUpdate>(req, UserSchema);
    if (parsedBody instanceof NextResponse) return parsedBody;

    const { email, firstname, lastname, phone_number, postnumber, address } =
      parsedBody;

    const userData = {
      email,
      firstname,
      lastname,
      phone_number,
      postnumber,
      address,
    };
    const user = await modifyUser(Number(userId), userData);

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }

    console.log("Error updating user:", err);
    return NextResponse.json(
      { error: "Internal server error: " + (err as Error).message },
      { status: 500 }
    );
  }
}
