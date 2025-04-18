"use server";
import { companyInformationSchema } from "@/lib/schemas/companyInformationSchema";
// import { ActionResult } from "next/dist/server/app-render/types";
import { ActionResult } from "@/components/ui/Form";
import { z } from "zod";

type Values = z.infer<typeof companyInformationSchema>;

export async function registerActionCompany(
  data: Values
): Promise<ActionResult<Values>> {
  console.log("Server action called with data:", data);
  const parsedData = companyInformationSchema.safeParse(data);

  if (!parsedData.success) {
    // Extra validation error handling should be valid if client-side validation did it's job

    const issue = parsedData.error.issues[0];
    const field = issue.path[0] as keyof Values; // Get the field name from the error path

    return {
      success: false,
      field,
      message: issue.message,
    };
  }

  // TODO: Check if company data already exists in the database
  // ... Here comes the check for company data already in use
  const { companyName, companyRegistrationNumber, companyAddress } =
    parsedData.data;

  return { success: true }; // Return success response
}
