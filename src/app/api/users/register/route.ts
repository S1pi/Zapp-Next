import { userRegister } from "@/services/userService";
import { UserCreate, UserWithoutPassword } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstname: z.string(),
  lastname: z.string(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must be at most 32 characters long" }),
  phone_number: z
    .string()
    .regex(/^(\+358|0)\d{7,10}$/, { message: "Invalid phone number" }),
  postnumber: z.string(),
  address: z.string(),
});

export async function POST(req: NextRequest) {
  const userInfo = (await req.json()) as UserCreate;

  try {
    const user = UserSchema.safeParse(userInfo);

    if (!user.success) {
      return NextResponse.json({ error: user.error }, { status: 400 });
    }

    const createdUser = await userRegister(user.data);

    return NextResponse.json(createdUser, { status: 201 });
  } catch (err) {
    return new NextResponse(`Error: ${(err as Error).message}`, {
      status: 500,
    });
  }
}
