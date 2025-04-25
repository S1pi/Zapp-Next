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

type LoginCredentials = {
  email_or_phone: string;
  password: string;
};

type UserCreate = Omit<User, "id" | "created_at" | "validated" | "role">;

type UserUpdate = Omit<
  UserWithoutPassword,
  "id" | "created_at" | "validated" | "role"
>;

type TokenData = Pick<User, "id" | "validated" | "role">;

type DriverLicenseData = {
  id: number;
  user_id: number;
  front_license_url: string;
  back_license_url: string;
  is_verified: boolean;
  expiry_date: Date | string | null;
  uploaded_at: Date | string;
};

type DriverLicenseUrlData = Pick<
  DriverLicenseData,
  "front_license_url" | "back_license_url"
>;

type UserSessionDataQuery = Omit<UserWithoutPassword, "validated"> & {
  dealership_id: number;
  dealership_name: string;
  dealership_address: string;
  registeration_number: string;
  contact_id: number;
};

type UserSessionData = {
  user: Omit<UserWithoutPassword, "validated">;
  dealership: {
    id: number;
    name: string;
    address: string;
    registeration_number: string;
    contact_id: number;
  } | null;
};

export type {
  User,
  UserCreate,
  UserWithoutPassword,
  TokenData,
  DriverLicenseData,
  DriverLicenseUrlData,
  UserUpdate,
  LoginCredentials,
  UserSessionDataQuery,
  UserSessionData,
};
