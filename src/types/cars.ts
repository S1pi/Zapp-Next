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
  is_reserved: boolean;
};

type AddCarData = {
  dealership_id: number;
  brand: string;
  color: string;
  model: string;
  year: number;
  license_plate: string;
  seats: number;
  location: {
    latitude: number;
    longitude: number;
  };
};

type CarReturnType = {
  id: number;
  dealership_id: number;
  dealership_name: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  license_plate: string;
  is_reserved: boolean;
};

type CarWithShowcase = Car & {
  car_showcase_url: string;
};

export type { Car, CarReturnType, AddCarData, CarWithShowcase };
