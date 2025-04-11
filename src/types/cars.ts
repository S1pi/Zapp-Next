type Car = {
  id: number;
  dealership_id: number;
  brand: string;
  model: string;
  year: number;
  license_plate: string;
  seats: number;
  location_id: number;
  latitude: number;
  longitude: number;
  reserved: boolean;
};

type AddCarData = {
  dealership_id: number;
  brand: string;
  model: string;
  year: number;
  license_plate: string;
  seats: number;
};

export type { Car, AddCarData };
