import { ZodIssue } from "zod";

// Helper function to format zod errors
// Move this to a helper file in the future
export interface FormattedErrors {
  field: string;
  message: string;
}

const formattedErrors = (errors: ZodIssue[]): FormattedErrors[] => {
  return errors.map((error) => {
    return {
      field: error.path.join("."),
      message: error.message,
    };
  });
};

export default formattedErrors;
