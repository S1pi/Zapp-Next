import { DuplicateEntryError } from "@/lib/customErrors";
import { FileSchema } from "@/lib/FileSchema";
import formattedErrors from "@/lib/formattedErrors";
import { userRegister } from "@/services/userService";
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

const normalizePhoneNumber = (phone: string) => {
  console.log("Normalizing phone number:", phone);
  const normalizedPhone = phone
    .trim()
    .replace(/\s+/g, "")
    .replace(/^0/, "+358");
  console.log("Normalized phone number:", normalizedPhone);

  return normalizedPhone;
};

export async function POST(req: NextRequest) {
  try {
    console.log("Request Headers:", req.headers.get("content-type"));
    console.log("Request Method:", req.method);
    const formData = await req.formData();

    // This would be the most efficient way to get the files,
    // but because of the FUCKING EXPO GO!!, we have to use base64 instead of files
    // const licenseFront = formData.get("license_front");
    // const licenseBack = formData.get("license_back");

    const licenseFrontBase64 = formData.get("license_front_base64");
    const licenseBackBase64 = formData.get("license_back_base64");
    const bodyData = formData.get("data");

    if (!licenseFrontBase64 || !licenseBackBase64) {
      return NextResponse.json(
        {
          message: "Images of drivinglicenses are required",
        },
        { status: 400 }
      );
    }

    if (
      typeof licenseFrontBase64 !== "string" ||
      typeof licenseBackBase64 !== "string"
    ) {
      return NextResponse.json(
        {
          error: "Base64 images of drivinglicenses must be strings",
        },
        { status: 400 }
      );
    }

    const licenseFrontBuffer = Buffer.from(
      licenseFrontBase64 as string,
      "base64"
    );
    const licenseBackBuffer = Buffer.from(
      licenseBackBase64 as string,
      "base64"
    );
    const licenseFront = new File([licenseFrontBuffer], "license_front.jpg", {
      type: "image/jpeg",
    });
    const licenseBack = new File([licenseBackBuffer], "license_back.jpg", {
      type: "image/jpeg",
    });

    console.log("licenseFront", licenseFront);
    console.log("licenseBack", licenseBack);

    if (!licenseFront || !licenseBack) {
      return NextResponse.json(
        {
          message: "Something went wrong transforming the base64 images",
        },
        { status: 500 }
      );
    }

    if (!bodyData || typeof bodyData !== "string") {
      return NextResponse.json(
        { message: "Request body is required" },
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
          // message: "invalid data from license front",
        },
        { status: 400 }
      );
    }

    if (!parsedLicenseBack.success) {
      return NextResponse.json(
        {
          errors: formattedErrors(parsedLicenseBack.error.issues),
          // message: "invalid data from license back",
        },
        { status: 400 }
      );
    }

    if (!user.success) {
      return NextResponse.json(
        {
          errors: formattedErrors(user.error.issues),
          // message: "invalid data from user",
        },
        { status: 400 }
      );
    }

    // Normalize the phone number to +358 format
    const normalizedPhone = normalizePhoneNumber(user.data.phone_number);
    user.data.phone_number = normalizedPhone;

    console.log("Normalized phone from userdata:", user.data.phone_number);

    const createdUser = await userRegister(
      user.data,
      parsedLicenseFront.data,
      parsedLicenseBack.data
    );

    return NextResponse.json(createdUser, { status: 201 });
    // return NextResponse.json({ message: "Testing works" }, { status: 201 });
  } catch (err) {
    console.log("Error in register route:", err);

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
