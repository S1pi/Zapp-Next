import {
  DuplicateEntryError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/customErrors";
import { saveFile } from "@/lib/saveFile";
import { insertDriverLicenseData } from "@/models/licenseModel";
import {
  getUserById as getUserByIdFromModel,
  createUser,
  getUserByEmailOrPhone,
  updateUserRole,
  updateUser,
} from "@/models/userModel";
import { DealershipInputData } from "@/types/dealership";
import { CreatedUserSuccessResponse } from "@/types/responses";
import { TokenData, UserCreate, UserUpdate } from "@/types/user";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { createDealership } from "./dealershipService";
// import * as userModel from "@/models/userModel";

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

const createDealer = async (
  userData: UserCreate,
  companyData: DealershipInputData
) => {
  try {
    const userId = await createUser(userData);

    const createDealershipData = {
      ...companyData,
      contact_id: userId,
    };

    const dealershipId = await createDealership(createDealershipData);
  } catch (err) {}
};

const userRegister = async (
  userData: UserCreate,
  licenseFront: File,
  licenseBack: File
): Promise<CreatedUserSuccessResponse> => {
  try {
    userData.password = await bcrypt.hash(userData.password, saltRounds);

    const createdUserId = await createUser(userData);
    const createdUser = await getUserByIdFromModel(createdUserId);

    const frontSaveFile = await saveFile({
      file: licenseFront,
      fileUsage: "license_front",
    });

    const backSaveFile = await saveFile({
      file: licenseBack,
      fileUsage: "license_back",
    });

    if (!frontSaveFile.fileUrl || !backSaveFile.fileUrl) {
      throw new Error("License url could not be created");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = createdUser;

    // Convert validated to boolean
    userWithoutPassword.validated = Boolean(userWithoutPassword.validated);

    const driverLicenseUrlData = {
      front_license_url: frontSaveFile.fileUrl,
      back_license_url: backSaveFile.fileUrl,
    };

    // Save driver license data to the database
    const driverLicenseId = await insertDriverLicenseData(createdUser.id, {
      ...driverLicenseUrlData,
    });

    if (!driverLicenseId) {
      throw new Error("Driver license data could not be inserted");
    }

    console.log(
      "Driver license data inserted successfully with ID:",
      driverLicenseId
    );

    return {
      message: "User created successfully",
      user: userWithoutPassword,
    };
  } catch (err) {
    console.log("Error creating user", err);
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

const modifyUser = async (userId: number, userData: UserUpdate) => {
  try {
    const user = await getUserById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    await updateUser(userId, userData);
    const updatedUser = await getUserById(userId);

    return updatedUser;
  } catch (err) {
    console.log("Error updating user", err);
    if (err instanceof NotFoundError) {
      throw new NotFoundError(err.message);
    }
    throw new Error("Internal server error: " + (err as Error).message);
  }
};

export { userRegister, userLogin, getUserById, modifyUserRole, modifyUser };
