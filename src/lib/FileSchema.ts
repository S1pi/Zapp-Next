import { z } from "zod";

const validTypes = ["image/jpeg", "image/png", "image/jpg"];
const fileSizeLimit = 2 * 1024 * 1024; // 2MB

export const FileSchema = z
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
