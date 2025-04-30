"use server";

import promisePool from "@/lib/db";
import { DriverLicenseUrlData, UserWithoutPassword } from "@/types/user";
import { RowDataPacket } from "mysql2";

export async function getAllUsers(): Promise<UserWithoutPassword[]> {
  console.log("Fetching all users from the database...");

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
  console.log("Fetched users:", rows);

  return rows;
}

export async function getDrivingLicenseByUserId(
  userId: number
): Promise<{ front_license_url: string; back_license_url: string }> {
  // const { isAdmin } = useAuthentication();
  // if (await isAdmin()) {
  //   throw new Error("Unauthorized access");
  // }

  const sql = `SELECT front_license_url, back_license_url FROM driving_licenses WHERE user_id = ?`;
  const values = [userId];
  const [rows] = await promisePool.query<
    RowDataPacket[] & DriverLicenseUrlData[]
  >(sql, values);
  const drivingLicense = rows[0];
  if (!drivingLicense) {
    throw new Error("No driving license found for this user");
  }
  return drivingLicense;
}
