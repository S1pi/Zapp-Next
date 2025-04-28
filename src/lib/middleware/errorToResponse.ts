import { NextResponse } from "next/server";
import formattedErrors from "@/lib/formattedErrors";
import {
  DuplicateEntryError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  MissingDataError,
  ValidationError,
} from "@/lib/customErrors";

export function errorToResponse(err: unknown): NextResponse {
  if (
    err instanceof DuplicateEntryError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError ||
    err instanceof ForbiddenError ||
    err instanceof MissingDataError
  ) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode }
    );
  }

  if (err instanceof ValidationError) {
    return NextResponse.json(
      { message: err.message, errors: formattedErrors(err.errors) },
      { status: err.statusCode }
    );
  }

  if (err instanceof SyntaxError) {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }

  console.error("Unhandled error:", err);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
