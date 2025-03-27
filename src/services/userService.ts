import {
  DuplicateEntryError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/customErrors";
import {
  getUserById,
  createUser,
  getUserByEmailOrPhone,
} from "@/models/userModel";
import { CreatedUserSuccessResponse } from "@/types/responses";
import { TokenData, UserCreate } from "@/types/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const userRegister = async (
  userData: UserCreate
): Promise<CreatedUserSuccessResponse> => {
  try {
    userData.password = await bcrypt.hash(userData.password, saltRounds);

    const createdUserId = await createUser(userData);
    const createdUser = await getUserById(createdUserId);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = createdUser;

    // Convert validated to boolean
    userWithoutPassword.validated = Boolean(userWithoutPassword.validated);

    return {
      message: "User created successfully",
      user: userWithoutPassword,
    };
  } catch (err) {
    if ((err as any).code === "ER_DUP_ENTRY") {
      if ((err as any).message.includes("email")) {
        throw new DuplicateEntryError("Email already exists");
      } else if ((err as any).message.includes("phone_number")) {
        throw new DuplicateEntryError("Phone number already exists");
      }
    }

    throw Error("User registration failed: " + (err as Error).message);
  }
};

const userLogin = async (emailOrPhone: string, pass: string) => {
  try {
    const user = await getUserByEmailOrPhone(emailOrPhone);

    const passwordMatch = bcrypt.compareSync(pass, user.password);

    if (!passwordMatch) {
      console.log("Password does not match");
      throw new UnauthorizedError("Credentials do not match");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret is not defined");
    }

    const { password, ...userWithoutPassword } = user;

    const tokenData: TokenData = {
      id: user.id,
      validated: user.validated,
      role: user.role,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    userWithoutPassword.validated = Boolean(userWithoutPassword.validated);

    return {
      message: "Login successful",
      token,
      user: userWithoutPassword,
    };
  } catch (err) {
    if ((err as Error).message.includes("not found")) {
      throw new NotFoundError("User not found");
    }

    if (err instanceof UnauthorizedError) {
      throw err;
    }

    throw Error("Internal server error: " + (err as Error).message);
  }
};

export { userRegister, userLogin };
