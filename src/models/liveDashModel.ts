import promisePool from "@/lib/db";
import { LiveDataNumbers } from "@/types/dashboardData";
import { RowDataPacket } from "mysql2";

export async function findAdminLiveDashboardData(dealershipId: number) {
  const sql = `SELECT
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM cars) AS total_cars,
      (SELECT COUNT(*) FROM cars WHERE is_reserved = 0) AS available_cars,
      (SELECT COUNT(*) FROM dealerships) AS total_dealerships,
      (SELECT COUNT(*) FROM cars WHERE dealership_id = ?) AS total_company_cars,
      (SELECT COUNT(*) FROM cars WHERE dealership_id = ? AND is_reserved = 0) AS available_company_cars`;

  const params = [dealershipId, dealershipId];
  const [rows] = await promisePool.query<RowDataPacket[] & LiveDataNumbers[]>(
    sql,
    params
  );
  const liveData = rows[0];

  return liveData;
}

export async function findDealerLiveDashboardData(dealershipId: number) {
  const sql = `SELECT
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM cars WHERE dealership_id = ?) AS total_company_cars,
      (SELECT COUNT(*) FROM cars WHERE dealership_id = ? AND is_reserved = 0) AS available_company_cars`;

  const params = [dealershipId, dealershipId];
  const [rows] = await promisePool.query<RowDataPacket[] & LiveDataNumbers[]>(
    sql,
    params
  );
  const liveData = rows[0];

  return liveData;
}
