import { UserWithoutPassword } from "./user";

type CreatedUserSuccessResponse = {
  message: string;
  user: UserWithoutPassword;
};

export type { CreatedUserSuccessResponse };
