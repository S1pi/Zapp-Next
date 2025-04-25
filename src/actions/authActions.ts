"use server";

import { verifyToken } from "@/lib/auth";
import promisePool from "@/lib/db";
import { getUserById } from "@/services/userService";
import { UserSessionData, UserSessionDataQuery } from "@/types/user";
import { RowDataPacket } from "mysql2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("authToken")?.value;
  if (!token) {
    return null;
  }
  try {
    const { id, role, validated } = await verifyToken(token);

    const user = await getUserById(id);

    return user;
  } catch (err) {
    console.error("Error verifying token in getCurrentUser:", err);
    return null;
  }
}

const getSessionData = async (userId: number) => {
  const sql = `SELECT u.id, u.firstname, u.lastname, u.email, u.phone_number, u.postnumber,
                      u.address, u.role, u.created_at, d.id AS dealership_id, d.name AS dealership_name,
                      d.address AS dealership_address, d.registeration_number, d.contact_id
               FROM users u
               LEFT JOIN dealerships d ON d.contact_id = u.id
               WHERE u.id = ?
              `;
  const values = [userId];
  const [rows] = await promisePool.query<
    RowDataPacket[] & UserSessionDataQuery[]
  >(sql, values);

  if (!(rows.length > 0)) return null;

  const userData = rows[0];
  const sessionData: UserSessionData = {
    user: {
      id: userData.id,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      phone_number: userData.phone_number,
      postnumber: userData.postnumber,
      address: userData.address,
      role: userData.role,
      created_at: userData.created_at,
    },
    dealership: userData.dealership_id
      ? {
          id: userData.dealership_id,
          name: userData.dealership_name,
          address: userData.dealership_address,
          registeration_number: userData.registeration_number,
          contact_id: userData.contact_id,
        }
      : null,
  };

  return sessionData;
};

export async function getUserSession(): Promise<UserSessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  if (!token) {
    return null;
  }
  try {
    const { id, role } = await verifyToken(token);

    if (!["admin", "dealer"].includes(role)) {
      cookieStore.set("authToken", "", { maxAge: -1 });
      redirect("/auth/login");
    }

    const sessionData = await getSessionData(id);

    if (!sessionData) {
      cookieStore.set("authToken", "", { maxAge: -1 });
      redirect("/auth/login");
    }

    return sessionData;
  } catch (err) {
    console.error("Error verifying token in getUserSession:", err);
    cookieStore.set("authToken", "", { maxAge: -1 });
    redirect("/auth/login");
  }
}

export async function logOutUser() {
  const cookieStore = await cookies();
  cookieStore.set("authToken", "", { maxAge: -1 });
  redirect("/auth/login");
}
