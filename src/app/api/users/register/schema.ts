import { z } from "zod";

export const UserSchema = z.object({
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
