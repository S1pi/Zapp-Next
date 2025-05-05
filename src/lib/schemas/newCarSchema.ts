import { z } from "zod";
import { FileSchema } from "../FileSchema";

// const validTypes = ["image/jpeg", "image/png", "image/jpg"];
// const fileSizeLimit = 2 * 1024 * 1024; // 2MB

export const newCarSchema = z.object({
  // Dealership ID comes from user session, so no need to validate it here
  // dealership_id: z
  //   .number()
  //   .int()
  //   .positive({ message: "Dealership ID must be a positive integer" }),
  brand: z
    .string()
    .min(1, { message: "Brand must be at least 1 character long" }),
  model: z
    .string()
    .min(1, { message: "Model must be at least 1 character long" }),
  color: z
    .string()
    .min(1, { message: "Color must be at least 1 character long" }),
  year: z.number().min(1886).max(new Date().getFullYear(), {
    message: "Year must be between 1886 and the current year",
  }),
  license_plate: z
    .string()
    .regex(/^[A-Z]{1,3}-\d{1,3}$/, {
      message:
        "License plate must be in the format 'AAA-123' with min 1 and max 3 uppercase letters and min 1 and max 3 digits",
    })
    .transform((value) => value.toUpperCase()),
  seats: z.number().int().min(1, { message: "Seats must be at least 1" }),
  car_img: FileSchema,
});

// import { z } from "zod";

// const validTypes = ["image/jpeg", "image/png", "image/jpg"];
// const fileSizeLimit = 2 * 1024 * 1024; // 2MB

// export const FileSchema = z
//   .instanceof(File)
//   .refine((file) => file.size <= fileSizeLimit, {
//     message: `File size must be less than ${fileSizeLimit / 1024 / 1024} MB`,
//   })
//   .refine((file) => validTypes.includes(file.type), {
//     message: `File type must be one of the following: ${validTypes.join(", ")}`,
//   })
//   .refine(
//     (file) => {
//       const fileName = file.name.toLowerCase();
//       return (
//         fileName.endsWith(".jpg") ||
//         fileName.endsWith(".jpeg") ||
//         fileName.endsWith(".png")
//       );
//     },
//     {
//       message: `File name must end with .jpg, .jpeg, or .png`,
//     }
//   );
