// src/lib/middleware/validateRequest.ts
import { NextRequest } from "next/server";
import { ZodSchema } from "zod";
import { MissingDataError, ValidationError } from "../customErrors";

export async function validateRequest<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): Promise<T> {
  const bodyText = await req.text();

  if (!bodyText) {
    throw new MissingDataError("Request body is required", 400);
  }

  let parsedJSON: unknown;
  try {
    parsedJSON = JSON.parse(bodyText);
  } catch {
    throw new SyntaxError("Invalid JSON");
  }

  const parsed = schema.safeParse(parsedJSON);

  if (!parsed.success) {
    throw new ValidationError("Validation failed", parsed.error.errors, 400);
  }

  return parsed.data;
}
