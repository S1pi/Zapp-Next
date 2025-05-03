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

type AdminLastWeekData = {
  all_reservations_count: number;
  company_reservations_count: number;
  total_revenue: number;
  company_revenue: number;
  reservation_average_price: number;
  company_reservation_average_price: number;
};

type DealerLastWeekData = Omit<
  AdminLastWeekData,
  "all_reservations_count" | "total_revenue" | "reservation_average_price"
>;

export type LiveDataNumbers = AdminLiveData | DealerLiveData;
export type LastWeekDataNumbers = AdminLastWeekData | DealerLastWeekData;

export type {
  AdminLiveData,
  DealerLiveData,
  AdminLastWeekData,
  DealerLastWeekData,
};
