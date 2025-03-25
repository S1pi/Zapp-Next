import { getUserById, createUser } from "@/models/userModel";
import { CreatedUserSuccessResponse } from "@/types/responses";
import { UserCreate } from "@/types/user";

const userRegister = async (
  userData: UserCreate
): Promise<CreatedUserSuccessResponse> => {
  try {
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
