type Dealership = {
  id: number;
  name: string;
  address: string;
  contact_id: number;
};

type DealershipCreate = Omit<Dealership, "id">;

export type { Dealership, DealershipCreate };
