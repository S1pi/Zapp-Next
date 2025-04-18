"use server";
import { companyInformationSchema } from "@/lib/schemas/companyInformationSchema";

export async function registerActionCompany(data: unknown) {
  // Simulate a server action for registration
  // In a real application, you would perform the registration logic here
  console.log("Server action called with data:", data);
  const parsedData = companyInformationSchema.safeParse(data);
  if (!parsedData.success) {
    // Extra validation error handling should be valid if client-side validation did it's job
    console.log("Validation errors:", parsedData.error.format());
    // Check can we return this through custom formattedErrors
    return {
      field: parsedData.error.issues[0].path[0],
      message: parsedData.error.issues[0].message,
    };
  }

  // Simulate a successful registration response

  // ... Here comes the check for company data already in use
  const { companyName, companyRegistrationNumber, companyAddress } =
    parsedData.data;

  return { success: true };
}
