import path from "path";
import { readFile as fsReadfile } from "fs/promises";
import { NotFoundError } from "./customErrors";

type FileReadReturn = {
  file: Buffer;
  contentType: string;
};

export const readFile = async (fileUrl: string): Promise<FileReadReturn> => {
  const extensionsWithMimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".txt": "text/plain",
  };

  const filePath = path.join(process.cwd(), fileUrl);

  try {
    const file = await fsReadfile(filePath);

    const fileExtension = path.extname(filePath).toLowerCase();

    const contentType =
      extensionsWithMimeTypes[fileExtension] || "application/octet-stream";

    return {
      file,
      contentType,
    };
  } catch (err) {
    throw new NotFoundError(`File not found: ${filePath}`);
  }
};
