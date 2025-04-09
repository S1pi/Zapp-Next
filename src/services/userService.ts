import {
  DuplicateEntryError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/customErrors";
import {
  getUserById as getUserByIdFromModel,
  createUser,
  getUserByEmailOrPhone,
  updateUserRole,
} from "@/models/userModel";
import { CreatedUserSuccessResponse } from "@/types/responses";
import { TokenData, UserCreate } from "@/types/user";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const saltRounds = 10;

const createJWT = async (tokenData: TokenData): Promise<string> => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT secret is not defined");
  }

  const secret = new TextEncoder().encode(jwtSecret);

  console.log(secret);

  const token = await new SignJWT(tokenData)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secret);

  return token;
};

const userRegister = async (
  userData: UserCreate
): Promise<CreatedUserSuccessResponse> => {
  try {
    userData.password = await bcrypt.hash(userData.password, saltRounds);

    const createdUserId = await createUser(userData);
    const createdUser = await getUserByIdFromModel(createdUserId);

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
        throw new DuplicateEntryError("Email already in use");
      } else if ((err as any).message.includes("phone_number")) {
        throw new DuplicateEntryError("Phone number already in use");
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    user.validated = Boolean(user.validated);

    const tokenData: TokenData = {
      id: user.id,
      validated: user.validated,
      role: user.role,
    };

    const token = await createJWT(tokenData);

    return {
      message: "Login successful",
      token,
      user: userWithoutPassword,
    };
  } catch (err) {
    console.log("Error logging in", err);

    if ((err as Error).message.includes("not found")) {
      throw new NotFoundError("User not found");
    }

    if (err instanceof UnauthorizedError) {
      throw err;
    }

    throw Error("Internal server error: " + (err as Error).message);
  }
};

const getUserById = async (id: number) => {
  try {
    const user = await getUserByIdFromModel(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const { password, ...userWithoutPassword } = user;
    user.validated = Boolean(user.validated);

    return userWithoutPassword;
  } catch (err) {
    console.log("Error getting user by ID", err);

    if ((err as Error).message.includes("not found")) {
      throw new NotFoundError("User not found");
    }

    throw Error("Internal server error: " + (err as Error).message);
  }
};

const modifyUserRole = async (userId: number, newRole: string) => {
  try {
    const message = await updateUserRole(userId, newRole);
    const user = await getUserById(userId);
    const { id, role, firstname, lastname } = user;
    return {
      message,
      user: {
        id,
        role,
        firstname,
        lastname,
      },
    };
  } catch (err) {
    console.log("Error updating user role", err);
    if (err instanceof NotFoundError) {
      throw new NotFoundError(err.message);
    }
    throw new Error("Internal server error: " + (err as Error).message);
  }
};

export { userRegister, userLogin, getUserById, modifyUserRole };
