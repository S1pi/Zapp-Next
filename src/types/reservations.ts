type ReservationReturnType = {
  id: number; // ID of the reservation
  start_time: Date; // Start time of the reservation
  end_time: Date; // End time of the reservation
  dealership_name: string; // Name of the dealership
  active: boolean; // Indicates if the reservation is active
  firstname: string; // User associated with the reservation
  lastname: string; // User associated with the reservation
  brand: string; // Brand of the vehicle reserved
  model: string; // Model of the vehicle reserved
  license_plate: string; // License plate number of the vehicle reserved
  price: string; // Price of the reservation
};

export type { ReservationReturnType };
