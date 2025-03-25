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

    return {
      message: "User created successfully",
      user: userWithoutPassword,
    };
  } catch (err) {
    throw new Error("User registration failed: " + (err as Error).message);
  }
};

export { userRegister };
