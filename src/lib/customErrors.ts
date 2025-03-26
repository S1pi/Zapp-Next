export class DuplicateEntryError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "DuplicateEntryError";

    Object.setPrototypeOf(this, DuplicateEntryError.prototype);
  }
}
