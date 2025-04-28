"use server";

import promisePool from "@/lib/db";
import { UserWithoutPassword } from "@/types/user";
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
