import { NotFoundError } from "@/lib/customErrors";
import formattedErrors from "@/lib/formattedErrors";
import { validateRequest } from "@/lib/middleware/validateRequest";
import { updateUser } from "@/models/userModel";
import { modifyUser } from "@/services/userService";
import { User, UserUpdate } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";
import z, { SafeParseSuccess } from "zod";

const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstname: z
    .string()
    .trim()
    .nonempty({ message: "Firstname is required" })
    .regex(/^[a-zA-Z]+$/, {
      message: "Firstname must contain only letters",
    }),
  lastname: z
    .string()
    .trim()
    .nonempty({ message: "Lastname is required" })
    .regex(/^[a-zA-Z]+$/, {
      message: "Lastname must contain only letters",
    }),
  phone_number: z
    .string()
    .transform((value) => value.replace(/\s+/g, ""))
    .refine((number) => /^(\+358|0)\d{7,10}$/.test(number), {
      message: "Number must start with +358 or 0 and be 7-10 digits long",
    }),
  postnumber: z
    .string()
    .trim()
    .regex(/^\d{5}$/, {
      message: "postnumber must be 5 digits long, e.g. 00100",
    }),
  address: z.string().trim().nonempty({ message: "Address is required" }),
});

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
