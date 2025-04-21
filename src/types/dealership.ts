type Dealership = {
  id: number;
  name: string;
  address: string;
  registeration_number: string;
  contact_id: number;
};

type DealershipCreate = Omit<Dealership, "id">;
type DealershipInputData = Omit<Dealership, "id" | "contact_id">;

export type { Dealership, DealershipCreate, DealershipInputData };
