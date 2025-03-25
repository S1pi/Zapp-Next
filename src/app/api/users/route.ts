// import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";

// // export async function POST(req: NextRequest) {
// //   //   const { params } = new URL(req.url);

// //   //   const id = params.get("id");
// //   //   if (!id) {
// //   //     return new NextResponse("User ID is required", { status: 400 });
// //   //   }

// //   const body = req.body;

// //   const UserSchema = z.object({
// //     email: z.string().email({ message: "Invalid email address" }),
// //     firstname: z.string(),
// //     lastname: z.string(),
// //     password: z
// //       .string()
// //       .min(8, { message: "Password must be at least 8 characters long" })
// //       .max(32, { message: "Password must be at most 32 characters long" }),
// //     phone_number: z.string(),
// //     postnumber: z.string(),
// //     address: z.string(),
// //   });

// //   try {
// //   } catch (err) {
// //     return new NextResponse(`Error: ${(err as Error).message}`, {
// //       status: 404,
// //     });
// //   }
// // }
