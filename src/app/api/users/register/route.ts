import { DuplicateEntryError } from "@/lib/customErrors";
import formattedErrors from "@/lib/formattedErrors";
import { userRegister } from "@/services/userService";
import { UserCreate, UserWithoutPassword } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Add more validation to the UserSchema if needed in the future
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
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must be at most 32 characters long" }),
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

export async function POST(req: NextRequest) {
  try {
    // Check if request body is empty
    const bodyText = await req.text();

    if (!bodyText) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    // Parse request body to JSON if it's not empty
    const userInfo = JSON.parse(bodyText);

    const user = UserSchema.safeParse(userInfo);

    if (!user.success) {
      return NextResponse.json(
        { errors: formattedErrors(user.error.issues) },
        { status: 400 }
      );
    }

    const createdUser = await userRegister(user.data);

    return NextResponse.json(createdUser, { status: 201 });
  } catch (err) {
    if (err instanceof DuplicateEntryError) {
      return NextResponse.json({message: err.message}, { status: err.statusCode });
    }

    return new NextResponse(`Error: ${(err as Error).message}`, {
      status: 500,
    });
  }
}
