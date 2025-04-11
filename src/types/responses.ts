import { ParkingZone } from "@/types/parking";
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

type ParkingZoneResponse = {
  message: string;
  parkingZones: ParkingZone[];
};

export type { CreatedUserSuccessResponse, LoginResponse, ParkingZoneResponse };
