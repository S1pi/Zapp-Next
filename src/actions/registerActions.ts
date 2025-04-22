"use server";
import {
  companyInformationSchema,
  userInformationSchema,
  userLoginInformationSchema,
} from "@/lib/schemas/companyInformationSchema";
import { ActionResult } from "@/components/ui/Form";
import { z } from "zod";
import {
  checkEmailOrPhoneExists,
  createAdminOrDealer,
} from "@/models/userModel";
import { insertDealership } from "@/models/dealershipModel";
import { markTokenAsUsed } from "./tokenActions";
import promisePool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { CompanyInformationType, UserRegister } from "@/app/auth/register/page";
import bcrypt from "bcryptjs";
import { normalizePhoneNumber } from "@/lib/normalizePhone";

type CompanyValues = z.infer<typeof companyInformationSchema>;
type UserInfoValues = z.infer<typeof userInformationSchema>;
type UserLoginInfoValues = z.infer<typeof userLoginInformationSchema>;
export type CompanyRegister = CompanyInformationType & {
  contact_id: number;
};

export async function registerActionCompany(
  data: CompanyValues
): Promise<ActionResult<CompanyValues>> {
  console.log("Server action called with data:", data);
  const parsedData = companyInformationSchema.safeParse(data);

  if (!parsedData.success) {
    // Extra validation error handling should be valid if client-side validation did it's job

    const issue = parsedData.error.issues[0];
    const field = issue.path[0] as keyof CompanyValues; // Get the field name from the error path

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

  try {
    const sql = `SELECT * FROM dealerships WHERE registeration_number = ?`;
    const values = [companyRegistrationNumber];
    const [rows] = await promisePool.query<RowDataPacket[]>(sql, values);
    console.log("Query result:", rows);
    if (rows.length > 0) {
      return {
        success: false,
        field: "companyRegistrationNumber",
        message: "Company registration number already exists",
      };
    }
  } catch (err) {
    console.error("Error checking company registration number:", err);
    return {
      success: false,
      message: "Error checking company registration number",
    };
  }
  // If the company data is valid and doesn't exist, you can proceed with the registration
  return { success: true }; // Return success response
}

export async function registerActionUserLoginInfo(
  data: UserLoginInfoValues
): Promise<ActionResult<UserLoginInfoValues>> {
  const parsedData = userLoginInformationSchema.safeParse(data);
  if (!parsedData.success) {
    const issue = parsedData.error.issues[0];
    const field = issue.path[0] as keyof UserLoginInfoValues; // Get the field name from the error path

    return {
      success: false,
      field,
      message: issue.message,
    };
  }

  // Check if phone or email already exists in the database
  const { phone, email } = parsedData.data;

  try {
    console.log("Checking if phone or email exists:", phone, email);

    const normalizedPhone = normalizePhoneNumber(phone); // Normalize the phone number

    // Check them seperately to get the field name
    const phoneExists = await checkEmailOrPhoneExists(null, normalizedPhone);
    const emailExists = await checkEmailOrPhoneExists(email, null);

    if (phoneExists) {
      return {
        success: false as const,
        field: "phone" as keyof UserLoginInfoValues,
        message: "Phone number already exists",
      };
    }
    if (emailExists) {
      return {
        success: false as const,
        field: "email" as keyof UserLoginInfoValues,
        message: "Email already exists",
      };
    }

    return { success: true }; // Return success response if no duplicates found
  } catch (err) {
    console.error("Error checking phone or email:", err);
    return {
      success: false,
      message: "Error checking phone or email",
    };
  }
}

const saltRounds = 10; // Number of salt rounds for bcrypt hashing

export async function submitRegisterAction(
  companyData: CompanyInformationType,
  userData: UserRegister,
  tokenId: number
): Promise<
  ActionResult<CompanyRegister, { companyId: number; userId: number }>
> {
  userData.password = await bcrypt.hash(userData.password, saltRounds); // Hash the password before storing it

  const normalizedPhone = normalizePhoneNumber(userData.phone); // Normalize the phone number

  const userSubmit = {
    email: userData.email,
    firstname: userData.firstname,
    lastname: userData.lastname,
    password: userData.password,
    phone_number: normalizedPhone,
    postnumber: userData.postnumber,
    address: userData.address,
    role: userData.role,
  };

  const userId = await createAdminOrDealer(userSubmit); // Create user and get the ID

  // Mark used token as used
  const tokenUsed = await markTokenAsUsed(tokenId, userId); // Mark the token as used

  if (!tokenUsed.success) {
    return {
      success: false,
      message: "Failed to mark token as used",
    };
  }

  const companySubmit = {
    name: companyData.companyName,
    registeration_number: companyData.companyRegistrationNumber,
    address: companyData.companyAddress,
    contact_id: userId, // Use the ID from the created user
  };

  const companyId = await insertDealership(companySubmit); // Insert company data and get the ID

  if (!companyId) {
    return {
      success: false,
      message: "Failed to create company",
    };
  }

  return {
    success: true,
    message: "Company and user created successfully",
    resultData: {
      companyId,
      userId,
    },
  };
}
