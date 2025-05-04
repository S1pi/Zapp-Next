export class DuplicateEntryError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 409) {
    super(message);
    this.statusCode = statusCode;
    this.name = "DuplicateEntryError";

    Object.setPrototypeOf(this, DuplicateEntryError.prototype);
  }
}

export class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 404) {
    super(message);
    this.statusCode = statusCode;
    this.name = "NotFoundError";

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 401) {
    super(message);
    this.statusCode = statusCode;
    this.name = "UnauthorizedError";

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 403) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ForbiddenError";

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class InvalidFileUsageType extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "InvalidFileUsageType";

    Object.setPrototypeOf(this, InvalidFileUsageType.prototype);
  }
}

export class MissingDataError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 422) {
    super(message);
    this.statusCode = statusCode;
    this.name = "MissingDataError";

    Object.setPrototypeOf(this, MissingDataError.prototype);
  }
}

export class ValidationError extends Error {
  statusCode: number;
  errors: any;

  constructor(message: string, errors: any, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class InvalidRoleError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "InvalidRoleError";

    Object.setPrototypeOf(this, InvalidRoleError.prototype);
  }
}
