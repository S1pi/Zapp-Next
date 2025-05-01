type AdminLiveData = {
  total_users: number;
  total_cars: number;
  available_cars: number;
  total_dealerships: number;
  total_company_cars: number;
  available_company_cars: number;
};

type DealerLiveData = {
  total_users: number;
  total_company_cars: number;
  available_company_cars: number;
};

export type LiveDataNumbers = AdminLiveData | DealerLiveData;

export type { AdminLiveData, DealerLiveData };
