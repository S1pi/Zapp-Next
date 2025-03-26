import { DuplicateEntryError } from "@/lib/customErrors";
import { getUserById, createUser } from "@/models/userModel";
import { CreatedUserSuccessResponse } from "@/types/responses";
import { UserCreate } from "@/types/user";
import bcrypt from "bcrypt";

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

export { userRegister };
