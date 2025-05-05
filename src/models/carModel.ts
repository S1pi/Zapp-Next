import dbConnection from "@/lib/db";
import promisePool from "@/lib/db";
import { NotFoundError } from "@/lib/customErrors";
import { AddCarData, Car, CarReturnType, CarWithShowcase } from "@/types/cars";
import { CarShowcaseUpload } from "@/types/files";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const insertCar = async (carInfo: AddCarData): Promise<number> => {
  const sql = `INSERT INTO cars (dealership_id, brand, model, year, license_plate, seats) VALUES (?, ?, ?, ?, ?, ?)`;

  const params = [
    carInfo.dealership_id,
    carInfo.brand,
    carInfo.model,
    carInfo.year,
    carInfo.license_plate,
    carInfo.seats,
  ];

  const [result] = await dbConnection.execute<ResultSetHeader>(sql, params);

  const { affectedRows, insertId } = result;

  if (affectedRows === 0) {
    throw new Error("Failed to insert car");
  }

  return insertId;
};

const insertCarShowcase = async (
  showcaseData: CarShowcaseUpload
): Promise<number> => {
  const sql = `INSERT INTO files (user_id, file_name, file_url, file_type, file_usage, related_type, related_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    showcaseData.user_id,
    showcaseData.file_name,
    showcaseData.file_url,
    showcaseData.file_type,
    showcaseData.file_usage,
    showcaseData.related_type,
    showcaseData.related_id,
  ];

  const [result] = await dbConnection.execute<ResultSetHeader>(sql, params);

  const { affectedRows, insertId } = result;

  if (affectedRows === 0) {
    throw new Error("Failed to insert car showcase");
  }
  return insertId;
};

const selectCarById = async (carId: number): Promise<Car> => {
  const sql = `SELECT * FROM cars WHERE id = ?`;
  const params = [carId];

  const [rows] = await dbConnection.query<RowDataPacket[] & Car[]>(sql, params);

  if (rows.length === 0) {
    throw new NotFoundError("Car not found");
  }

  return rows[0];
};

const selectAllCars = async (): Promise<Car[]> => {
  const sql = `SELECT * FROM cars`;

  const [rows] = await dbConnection.query<RowDataPacket[] & Car[]>(sql);

  if (rows.length === 0) {
    throw new Error("No cars found");
  }

  return rows;
};

const selectAllCarsWithShowcase = async (): Promise<CarWithShowcase[]> => {
  const sql = `SELECT c.*, f.file_url AS car_showcase_url FROM cars c LEFT JOIN files f ON c.id = f.related_id AND f.related_type = 'car' WHERE f.file_usage = 'car_showcase'`;

  const [rows] = await dbConnection.query<RowDataPacket[] & CarWithShowcase[]>(
    sql
  );

  if (rows.length === 0) {
    throw new Error("No cars found");
  }

  return rows;
};

const selectCarsByDealershipId = async (dsId: number): Promise<Car[]> => {
  const sql = `SELECT * FROM cars WHERE dealership_id = ?`;
  const params = [dsId];

  const [rows] = await dbConnection.query<RowDataPacket[] & Car[]>(sql, params);

  if (rows.length === 0) {
    throw new NotFoundError("No cars found for this dealership");
  }

  return rows;
};

const updateCarLocation = async (
  carId: number,
  location: string
): Promise<void> => {
  const sql = `UPDATE cars SET longitude = ?, latitude = ? WHERE id = ?`;
  const params = [...location.split(","), carId];
  const [result] = await dbConnection.execute<ResultSetHeader>(sql, params);
  const { affectedRows } = result;
  if (affectedRows === 0) {
    throw new NotFoundError("Car not found");
  }
};

const updateCarStatus = async (
  carId: number,
  status: boolean
): Promise<void> => {
  const sql = `UPDATE cars SET is_reserved = ? WHERE id = ?`;
  const params = [status, carId];
  const [result] = await dbConnection.execute<ResultSetHeader>(sql, params);
  const { affectedRows } = result;
  if (affectedRows === 0) {
    throw new NotFoundError("Car not found");
  }
};

const selectAllCarsAdmin = async (): Promise<CarReturnType[]> => {
  const sql = `SELECT
    c.id,
    d.id AS dealership_id,
    d.name AS dealership_name,
    c.brand,
    c.model,
    c.year,
    c.color,
    c.license_plate,
    c.seats,
    c.is_reserved
    FROM cars c
    JOIN dealerships d ON c.dealership_id = d.id
    ORDER BY d.id DESC`;

  const [rows] = await promisePool.query<RowDataPacket[] & CarReturnType[]>(
    sql
  );

  return rows;
};
const selectAllCarsDealer = async (
  dealershipId: number
): Promise<CarReturnType[]> => {
  const sql = `SELECT
    c.id,
    d.id AS dealership_id,
    d.name AS dealership_name,
    c.brand,
    c.model,
    c.year,
    c.color,
    c.license_plate,
    c.seats,
    c.is_reserved
    FROM cars c
    JOIN dealerships d ON c.dealership_id = d.id
    WHERE d.id = ?
    ORDER BY d.id DESC`;

  const [rows] = await promisePool.query<RowDataPacket[] & CarReturnType[]>(
    sql,
    [dealershipId]
  );

  return rows;
};

export {
  insertCar,
  selectCarById,
  selectAllCars,
  selectAllCarsAdmin,
  selectAllCarsDealer,
  selectCarsByDealershipId,
  selectAllCarsWithShowcase,
  insertCarShowcase,
  updateCarLocation,
  updateCarStatus,
};
