import { UserWithoutPassword } from "./user";

type CreatedUserSuccessResponse = {
  message: string;
  user: UserWithoutPassword;
};

type LoginResponse = {
  message: string;
  token: string;
  user: UserWithoutPassword;
};

export type { CreatedUserSuccessResponse, LoginResponse };
