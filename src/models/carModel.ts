import dbConnection from "@/lib/db";
import { AddCarData, Car } from "@/types/cars";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const insertCar = async (carInfo: AddCarData): Promise<number> => {
  const sql = `INSET INTO cars (dealership_id, brand, model, year, license_plate, seats)
      VALUES (?, ?, ?, ?, ?, ?)`;

  const params = [
    carInfo.dealership_id,
    carInfo.brand,
    carInfo.model,
    carInfo.year,
    carInfo.license_plate,
    carInfo.seats,
  ];

  const [result] = await dbConnection.query<ResultSetHeader>(sql, params);

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

export { insertCar, selectCarById };
