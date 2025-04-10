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

const validTypes = ["image/jpeg", "image/png", "image/jpg"];
const fileSizeLimit = 2 * 1024 * 1024; // 2MB

const FileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= fileSizeLimit, {
    message: `File size must be less than ${fileSizeLimit / 1024 / 1024} MB`,
  })
  .refine((file) => validTypes.includes(file.type), {
    message: `File type must be one of the following: ${validTypes.join(", ")}`,
  })
  .refine(
    (file) => {
      const fileName = file.name.toLowerCase();
      return (
        fileName.endsWith(".jpg") ||
        fileName.endsWith(".jpeg") ||
        fileName.endsWith(".png")
      );
    },
    {
      message: `File name must end with .jpg, .jpeg, or .png`,
    }
  );

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const licenseFront = formData.get("license_front");
    const licenseBack = formData.get("license_back");
    const bodyData = formData.get("data");

    if (!licenseFront || !licenseBack) {
      return NextResponse.json(
        { error: "Both front and back images of drivinglicenses are required" },
        { status: 400 }
      );
    }

    if (!bodyData || typeof bodyData !== "string") {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    console.log("licenseFront", licenseFront instanceof File);
    console.log("licenseBack", licenseBack instanceof File);

    const parsedBodyData = JSON.parse(bodyData);
    const user = UserSchema.safeParse(parsedBodyData);
    const parsedLicenseFront = FileSchema.safeParse(licenseFront);
    const parsedLicenseBack = FileSchema.safeParse(licenseBack);

    if (!parsedLicenseFront.success) {
      return NextResponse.json(
        {
          errors: formattedErrors(parsedLicenseFront.error.issues),
          message: "invalid data from license front",
        },
        { status: 400 }
      );
    }

    if (!parsedLicenseBack.success) {
      return NextResponse.json(
        {
          errors: formattedErrors(parsedLicenseBack.error.issues),
          message: "invalid data from license back",
        },
        { status: 400 }
      );
    }

    if (!user.success) {
      return NextResponse.json(
        {
          errors: formattedErrors(user.error.issues),
          message: "invalid data from user",
        },
        { status: 400 }
      );
    }

    const createdUser = await userRegister(
      user.data,
      parsedLicenseFront.data,
      parsedLicenseBack.data
    );

    return NextResponse.json(createdUser, { status: 201 });
    // return NextResponse.json({ message: "Testing works" }, { status: 201 });
  } catch (err) {
    if (err instanceof DuplicateEntryError) {
      return NextResponse.json(
        { message: err.message },
        { status: err.statusCode }
      );
    }

    if (err instanceof TypeError) {
      if (err.message.includes('"multipart/form-data"')) {
        return NextResponse.json(
          { error: "Invalid Content-Type", message: err.message },
          { status: 400 }
        );
      }
    }

    return new NextResponse(`Error: ${(err as Error).message}`, {
      status: 500,
    });
  }
}
