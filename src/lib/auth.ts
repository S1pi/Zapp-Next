// REST IN PEACE
// This formerly contained the authentication logic for the application, but it has been
// replaced with a more efficient and secure solution using nextjs middleware and cookies.
// The new solution is more robust and easier to maintain, and it provides better security for user authentication.
// The code below is kept for reference and historical purposes only. It is not used in the current application.

// import { NextRequest, NextResponse } from "next/server";
// import { ForbiddenError, UnauthorizedError } from "./customErrors";
// import jwt from "jsonwebtoken";
// import { TokenData, User } from "@/types/user";
// import { getUserById } from "@/models/userModel";

// const isAuthenticated = async (req: NextRequest) => {
//   try {
//     const authToken = req.headers.get("Authorization")?.split(" ")[1];

//     if (!authToken) {
//       throw new UnauthorizedError("Authorization token is required");
//     }

//     if (!process.env.JWT_SECRET) {
//       throw new Error("JWT_SECRET is not defined");
//     }

//     const decoded = jwt.verify(authToken, process.env.JWT_SECRET) as TokenData;

//     const user = await getUserById(decoded.id);

//     if (!user) {
//       throw new ForbiddenError("Token is not valid");
//     }

//     const { password, ...userWithoutPassword } = user;

//     return userWithoutPassword;
//   } catch (err) {
//     if (err instanceof jwt.JsonWebTokenError) {
//       throw new ForbiddenError("Token is not valid");
//     }

//     throw err;
//   }
// };

// export default isAuthenticated;
