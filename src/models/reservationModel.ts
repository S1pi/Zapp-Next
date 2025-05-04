import promisePool from "@/lib/db";
import { ReservationReturnType } from "@/types/reservations";
import { RowDataPacket } from "mysql2";

const selectAllReservations = async (): Promise<ReservationReturnType[]> => {
  const sql = `SELECT
    r.id,
    d.name AS dealership_name,
    r.start_time,
    r.end_time,
    r.active,
    u.firstname,
    u.lastname,
    c.brand,
    c.model,
    c.license_plate,
    r.price
    FROM reservations r
    JOIN users u ON r.user_id = u.id
    JOIN cars c ON r.car_id = c.id
    JOIN dealerships d ON c.dealership_id = d.id
    ORDER BY r.start_time DESC`;

  const [rows] = await promisePool.query<
    RowDataPacket[] & ReservationReturnType[]
  >(sql);

  return rows;
};

const selectAllReservationsByDealershipId = async (dealershipId: number) => {
  const sql = `SELECT
    r.id,
    d.name AS dealership_name,
    r.start_time,
    r.end_time,
    r.active,
    u.firstname,
    u.lastname,
    c.brand,
    c.model,
    c.license_plate,
    r.price
    FROM reservations r
    JOIN users u ON r.user_id = u.id
    JOIN cars c ON r.car_id = c.id
    JOIN dealerships d ON c.dealership_id = d.id
    WHERE d.id = ?
    ORDER BY r.start_time DESC`;

  const values = [dealershipId];
  const [rows] = await promisePool.query<
    RowDataPacket[] & ReservationReturnType[]
  >(sql, values);

  return rows;
};

export { selectAllReservations, selectAllReservationsByDealershipId };
