import path from "path";
import { InvalidFileUsageType } from "./customErrors";
import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

type FileUsage =
  | "profile_picture"
  | "license_front"
  | "license_back"
  | "car_showcase";

type SaveFileOptions = {
  file: File;
  fileUsage: FileUsage;
};

export async function saveFile({ file, fileUsage }: SaveFileOptions) {
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const timestamp = Date.now();
  const fileExtension = file.name.split(".").pop();
  const fileName = `${fileUsage}-${timestamp}.${fileExtension}`;

  let relativeFilePath: string;
  let publicUrlPrefix: string | null = null;
  let secureUrlPrefix: string | null = null;

  switch (fileUsage) {
    case "profile_picture":
      relativeFilePath = "public/uploads/profile";
      publicUrlPrefix = "/uploads/profile";
      break;
    case "license_front":
    case "license_back":
      // relativeFilePath = "public/uploads/testinglicenses"; // This is just for testing
      // publicUrlPrefix = "/uploads/testinglicenses"; // This is just for testing
      relativeFilePath = "secure_uploads/licenses"; // This is real path for pictures
      secureUrlPrefix = "secure_uploads/licenses"; // This is real path for pictures
      break;
    case "car_showcase":
      relativeFilePath = "public/uploads/cars";
      publicUrlPrefix = "/uploads/cars";
      break;
    default:
      throw new InvalidFileUsageType("Unsupported file usage type");
  }

  // Create the directory if it doesn't exist
  const fullPath = path.join(process.cwd(), relativeFilePath);
  if (!fullPath) {
    mkdirSync(fullPath, { recursive: true });
  }

  // Store the file in the specified directory
  const fileStoragePath = path.join(fullPath, fileName);
  await writeFile(fileStoragePath, fileBuffer);

  // Return the public URL for the file
  return {
    fileName,
    fileUrl: publicUrlPrefix
      ? `${publicUrlPrefix}/${fileName}`
      : secureUrlPrefix
      ? `${secureUrlPrefix}/${fileName}`
      : null,
    fileStoragePath,
  };
}
