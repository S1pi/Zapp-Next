import { NotFoundError } from "@/lib/customErrors";
import dbConnection from "@/lib/db";
import { AddCarData, Car } from "@/types/cars";
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

const selectCarById = async (carId: number): Promise<Car> => {
  const sql = `SELECT * FROM cars WHERE id = ?`;
  const params = [carId];

  const [rows] = await dbConnection.query<RowDataPacket[] & Car[]>(sql, params);

  if (rows.length === 0) {
    throw new Error("Car not found");
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

const selectCarsByDealershipId = async (dsId: number): Promise<Car[]> => {
  const sql = `SELECT * FROM cars WHERE dealership_id = ?`;
  const params = [dsId];

  const [rows] = await dbConnection.query<RowDataPacket[] & Car[]>(sql, params);

  if (rows.length === 0) {
    throw new NotFoundError("No cars found for this dealership");
  }

  return rows;
};

export { insertCar, selectCarById, selectAllCars, selectCarsByDealershipId };
