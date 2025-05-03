import promisePool from "@/lib/db";
import {
  AdminLastWeekData,
  DealerLastWeekData,
  LastWeekDataNumbers,
  LiveDataNumbers,
} from "@/types/dashboardData";
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

export async function findAdminLastWeekDashboardData(
  dealershipId: number
): Promise<AdminLastWeekData> {
  // const sql = `SELECT
  //               r.car_id,
  //               r.start_time,
  //               r.end_time,
  //               r.price,
  //               SUM(r.price) OVER () AS total_revenue,
  //               SUM(
  //                 CASE WHEN c.dealership_id = ? THEN r.price ELSE 0 END
  //               ) OVER () AS company_revenue,
  //               AVG(
  //                 CASE WHEN c.dealership_id = ? THEN r.price ELSE 0 END
  //               ) OVER () AS company_reservation_average_price,
  //               AVG(r.price) OVER () AS reservation_average_price,
  //               COUNT(r.id) OVER () AS all_reservations_count,
  //               COUNT(
  //                 CASE WHEN c.dealership_id = ? THEN r.id END
  //               ) OVER () AS company_reservations_count
  //             FROM reservations r
  //             JOIN cars c ON r.car_id = c.id
  //             WHERE r.start_time >= NOW() - INTERVAL 7 DAY
  //             `;
  const sql = `SELECT 
                SUM(r.price)AS total_revenue,
                SUM(
                  CASE WHEN c.dealership_id = 1 THEN r.price ELSE 0 END
                ) AS company_revenue,
                ROUND(
                  AVG(
                    CASE WHEN c.dealership_id = 1 THEN r.price ELSE NULL END
                  ), 2
                ) AS company_reservation_average_price,
                ROUND(
                  AVG(r.price), 2
                ) AS reservation_average_price,
                COUNT(r.id) AS all_reservations_count,
                COUNT(
                  CASE WHEN c.dealership_id = 1 THEN r.id END
                ) AS company_reservations_count
              FROM reservations r
              JOIN cars c ON r.car_id = c.id
              WHERE r.start_time >= NOW() - INTERVAL 7 DAY
              `;

  const params = [dealershipId, dealershipId, dealershipId];

  const [rows] = await promisePool.query<RowDataPacket[] & AdminLastWeekData[]>(
    sql,
    params
  );
  const lastWeekData = rows[0];

  return lastWeekData;
}

export async function findDealerLastWeekDashboardData(
  dealershipId: number
): Promise<DealerLastWeekData> {
  // const sql = `SELECT
  //               r.car_id,
  //               r.start_time,
  //               r.end_time,
  //               r.price,
  //               SUM(r.price) OVER () AS company_revenue,
  //               AVG(r.price) OVER () AS company_reservation_average_price,
  //               COUNT(r.id) OVER () AS company_reservations_count
  //             FROM reservations r
  //             JOIN cars c ON r.car_id = c.id
  //             WHERE r.start_time >= NOW() - INTERVAL 7 DAY
  //             AND c.dealership_id = 1
  //             `;
  const sql = `SELECT
                SUM(r.price) AS company_revenue,
                ROUND(
                  AVG(r.price), 2
                ) AS company_reservation_average_price,
                COUNT(r.id)  AS company_reservations_count
              FROM reservations r
              JOIN cars c ON r.car_id = c.id
              WHERE r.start_time >= NOW() - INTERVAL 7 DAY
              AND c.dealership_id = 1
              `;

  const params = [dealershipId];

  const [rows] = await promisePool.query<
    RowDataPacket[] & DealerLastWeekData[]
  >(sql, params);
  const lastWeekData = rows[0];

  return lastWeekData;
}
