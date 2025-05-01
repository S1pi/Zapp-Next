"use server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

const useAuthentication = () => {
  const isAuthenticated = () => {
    // Logic to check if the user is authenticated
    // return !!localStorage.getItem("token");
  };

  const isAdmin = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;
    if (!token) return false;

    const { role } = await verifyToken(token);

    if (role === "admin") {
      return true;
    }

    return false;
  };

  const isContact = async (dealership_contact: number) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;
    if (!token) return false;

    const { role, id } = await verifyToken(token);

    if (role === "dealer" && id === dealership_contact) {
      return true;
    }
    return false;
  };

  // Optionally, you can add a function to log in the user
  // const login = (token: string) => {
  //   // Logic to log in the user
  //   localStorage.setItem("token", token);
  // };

  // optionally, you can add a logout function
  // const logout = () => {
  //   // Logic to log out the user
  //   localStorage.removeItem("token");
  // };

  return { isAdmin, isContact };
};

export default useAuthentication;
