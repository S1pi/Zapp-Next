type ParkingZoneQuery = {
  id: number;
  name: string;
  description: string;
  topLeftLat: number;
  topLeftLong: number;
  bottomRightLat: number;
  bottomRightLong: number;
};

type ParkingZoneCoords = {
  latitude: number;
  longitude: number;
};

type ParkingZone = {
  id: number;
  name: string;
  description: string;
  location: ParkingZoneCoords[];
};

type NewParkingZone = Omit<ParkingZone, "id">;

export type {
  ParkingZoneQuery,
  ParkingZoneCoords,
  ParkingZone,
  NewParkingZone,
};
