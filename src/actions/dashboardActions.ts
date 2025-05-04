"use server";

import { ActionResult } from "@/app/_components/ui/Form";
import promisePool from "@/lib/db";
import {
  DrivingLicenseValidationSchema,
  DrivingLicenseValues,
} from "@/lib/schemas/expiryDateSchema";
import { DriverLicenseUrlData, UserWithoutPassword } from "@/types/user";
import { RowDataPacket } from "mysql2";
import { requireRole } from "./authActions";
import { LastWeekDataNumbers, LiveDataNumbers } from "@/types/dashboardData";
import {
  getLastWeekDashboardData,
  getLiveDashboardData,
} from "@/services/liveDashService";
import { InvalidRoleError } from "@/lib/customErrors";

export async function getAllUsers(): Promise<UserWithoutPassword[]> {
  // console.log("Fetching all users from the database...");

  await requireRole("admin");

  const sql = `
    SELECT
      id,
      email,
      firstname,
      lastname,
      phone_number,
      postnumber,
      address,
      is_validated,
      role,
      created_at
    FROM users
    ORDER BY created_at ASC
  `;
  const [rows] = await promisePool.query<
    RowDataPacket[] & UserWithoutPassword[]
  >(sql);
  // console.log("Fetched users:", rows);

  return rows;
}

export async function getDrivingLicenseByUserId(userId: number): Promise<{
  id: number;
  front_license_url: string;
  back_license_url: string;
}> {
  // const { isAdmin } = useAuthentication();
  // if (await isAdmin()) {
  //   throw new Error("Unauthorized access");
  // }

  console.log("Starting requireRole function...");
  await requireRole("admin");

  const sql = `SELECT id, front_license_url, back_license_url FROM driving_licenses WHERE user_id = ?`;
  const values = [userId];
  console.log("SQL query starts:");
  const [rows] = await promisePool.query<
    RowDataPacket[] & DriverLicenseUrlData[] & { id: number }[]
  >(sql, values);
  const drivingLicense = rows[0];
  if (!drivingLicense) {
    throw new Error("No driving license found for this user");
  }

  // console.log("Driving license data:", drivingLicense);

  return drivingLicense;
}

// export async function updateDrivingLicenseValidationStatus(
//   userId: number,
//   isValidated: boolean
// ): Promise<void> {
//   const sql = `UPDATE users SET is_validated = ? WHERE id = ?`;
//   const values = [isValidated, userId];
//   await promisePool.query(sql, values);
// }

// export async function updateDrivingLicenseExpiryDate(
//   userId: number,
//   expiryDate: Date,
//   drivingLicenseId: string
// ): Promise<void> {
//   const sql = `UPDATE driving_licenses SET expiry_date = ? WHERE user_id = ? AND driving_license_id = ?`;
//   const values = [expiryDate, userId, drivingLicenseId];
//   await promisePool.query(sql, values);
// }

export async function validateDrivingLicense(
  userId: number,
  expiry_date: Date,
  isValidated: boolean
): Promise<void> {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

    const sql = `UPDATE users u 
               JOIN driving_licenses d on d.user_id = u.id
               SET u.is_validated = ?, d.expiry_date = ?, d.is_verified = ?
               WHERE u.id = ?
               `;
    const values = [isValidated, expiry_date, isValidated, userId];
    await promisePool.execute(sql, values);
    await connection.commit();
  } catch (error) {
    console.error("Error validating driving license:", error);
    await connection.rollback();
    throw error; // Rethrow the error to be handled by the caller
  } finally {
    connection.release();
  }
}

export async function denyDrivingLicense(
  userId: number,
  drivingLicenseId: number
): Promise<void> {
  await requireRole("admin");
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

    const sql = `DELETE FROM driving_licenses WHERE user_id = ? AND id = ?`;
    const values = [userId, drivingLicenseId];
    await promisePool.execute(sql, values);
    await connection.commit();
  } catch (error) {
    console.error("Error denying driving license:", error);
    await connection.rollback();
    throw error; // Rethrow the error to be handled by the caller
  } finally {
    connection.release();
  }
}

// type DrivingLicenseValidationData = {
//   userId: number;
//   drivingLicenseId: number;
//   validationStatus: string;
// };

type DrivingLicenseValidationPayload = {
  userId: number;
  drivingLicenseId: number;
  expiryDate: Date;
  validationStatus: "validated" | "denied";
};

export async function drivingLicenseValidation(
  data: DrivingLicenseValidationPayload
): Promise<ActionResult<DrivingLicenseValues>> {
  console.log(
    "Server action called inside drivingLicenseValidation with data:",
    data
  );

  try {
    const parsedData = DrivingLicenseValidationSchema.safeParse(data);
    if (!parsedData.success) {
      const issue = parsedData.error.issues[0];
      const field = issue.path[0] as keyof DrivingLicenseValues; // Get the field name from the error path

      return {
        success: false,
        field,
        message: issue.message,
      };
    }

    const { userId, drivingLicenseId, expiryDate, validationStatus } = data;

    if (!userId || userId === 0 || !drivingLicenseId) {
      return {
        success: false,
        message:
          "User ID and Driving License ID are required and must be valid",
      };
    }

    if (validationStatus === "validated") {
      await validateDrivingLicense(userId, expiryDate, true);
      return {
        success: true,
        message: "Driving license validated successfully",
      };
    }

    if (validationStatus === "denied") {
      await denyDrivingLicense(userId, drivingLicenseId);
      return {
        success: true,
        message: "Driving license denied successfully",
      };
    }

    return {
      success: false,
      message: "Invalid validation status",
    };
  } catch (err) {
    console.error("Error validating driving license:", err);
    return {
      success: false,
      message: "Error validating driving license",
    };
  }
}

export async function getLiveData(): Promise<LiveDataNumbers> {
  const session = await requireRole(["admin", "dealer"]);

  const dealershipId = session.dealership?.id; // Get the dealership ID from the session

  // console.log("Dealership ID:", dealershipId);

  if (!dealershipId) {
    throw new Error("Dealership ID not found in session");
  }

  try {
    const liveData = await getLiveDashboardData(
      session.user.role,
      dealershipId
    );

    if (!liveData) {
      throw new Error("No live data found");
    }

    return liveData;
  } catch (err) {
    if (err instanceof InvalidRoleError) {
      // One way to handle this is to log the error and return a specific message
      // return {
      //   success: false,
      //   message: err.message,
      // };
      throw new Error("Invalid user role");
    }
    console.error("Error fetching live data:", err);
    throw err; // Rethrow the error to be handled by the caller
  }
}

export async function getLastWeekData(): Promise<LastWeekDataNumbers> {
  const session = await requireRole(["admin", "dealer"]);

  const dealershipId = session.dealership?.id; // Get the dealership ID from the session

  if (!dealershipId) {
    throw new Error("Dealership ID not found in session");
  }

  try {
    const lastWeekData = await getLastWeekDashboardData(
      session.user.role,
      dealershipId
    );

    if (!lastWeekData) {
      throw new Error("No last week data found");
    }

    return lastWeekData;
  } catch (err: any) {
    // if (err.code === "ER_NO_REFERENCED_ROW_2") {
    //   throw new Error("No last week data found for this dealership");
    // }

    if (err instanceof InvalidRoleError) {
      // One way to handle this is to log the error and return a specific message
      // return {
      //   success: false,
      //   message: err.message,
      // };
      throw new Error("Invalid user role");
    }
    throw err; // Rethrow the error to be handled by the caller
  }
}
