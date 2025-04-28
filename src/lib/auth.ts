import { jwtVerify } from "jose";
import { TokenData } from "@/types/user";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifyToken(token: string): Promise<TokenData> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const { id, role, validated } = payload as TokenData;

    console.log("Decoded token payload:", payload);

    if (!id || !role) {
      throw new Error("Token is not valid or missing fields");
    }

    return { id, role, validated };
  } catch (error) {
    // Kato miten järjestäisi errorin käsittelyn
    console.error("Error verifying token:", error);
    throw new Error("Token verification failed");
  }
}
