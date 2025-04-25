"use server";

import { verifyToken } from "@/lib/auth";
import { getUserById } from "@/services/userService";
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

export async function logOutUser() {
  const cookieStore = await cookies();
  cookieStore.set("authToken", "", { maxAge: -1 });
  redirect("/auth/login");
}
