import promisePool from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

type DriveStart = {
  user_id: number;
  car_id: number;
  start_location: string;
};

type DriveEnd = {
  drive_id: number;
  end_location: string;
  end_time: Date;
};

const insertDriveStart = async (drive: DriveStart) => {
  const { user_id, car_id, start_location } = drive;
  const sql =
    "INSERT INTO reservations (user_id, car_id, start_location, active) VALUES (?, ?, ?, true)";
  const values = [user_id, car_id, start_location];
  console.log("Drive start values:", values);
  const [result] = await promisePool.execute<ResultSetHeader>(sql, values);
  console.log(result);

  if (result.affectedRows === 0) {
    throw new Error("Drive could not be created");
  }
  console.log("Drive created with ID:", result.insertId);
  return result.insertId;
};

const insertDriveEnd = async (driveEnd: DriveEnd) => {
  const { drive_id, end_location, end_time } = driveEnd;
  const sql =
    "UPDATE reservations SET active = false, end_location = ?, end_time = ? WHERE id = ?";
  const values = [end_location, end_time, drive_id];
  const [result] = await promisePool.execute<ResultSetHeader>(sql, values);
  if (result.affectedRows === 0) {
    throw new Error("Drive could not be ended");
  }
  return result.insertId;
};

const getDriveById = async (id: number) => {
  const query = "SELECT * FROM reservations WHERE id = ?";
  const [rows] = await promisePool.query<RowDataPacket[]>(query, [id]);
  const driveData = rows[0];
  return driveData;
};

export { insertDriveStart, insertDriveEnd, getDriveById };
