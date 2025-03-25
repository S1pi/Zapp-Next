type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone_number: string;
  postnumber: string;
  address: string;
  validated: boolean;
  role: string;
  created_at: Date | string;
};

type UserWithoutPassword = Omit<User, "password">;

type UserCreate = Omit<User, "id" | "created_at" | "validated" | "role">;

export type { User, UserCreate, UserWithoutPassword };
