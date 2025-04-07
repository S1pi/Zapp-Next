import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/customErrors";
import { getUserById } from "@/services/userService";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      throw new UnauthorizedError("User ID is required");
    }

    console.log("Headers in get user by token route", req.headers);

    const user = await getUserById(Number(userId));

    return NextResponse.json(
      { message: "Authentication successfull", user: user },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error in get user by token route", err);

    if (err instanceof NotFoundError) {
      return NextResponse.json({ error: err.message }, { status: 404 });
    }

    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }

    if (err instanceof ForbiddenError) {
      return NextResponse.json({ error: err.message }, { status: 403 });
    }

    return NextResponse.json(
      { error: "Internal server error: " + (err as Error).message },
      { status: 500 }
    );
  }
}
