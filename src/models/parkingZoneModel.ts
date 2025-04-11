import promisePool from "@/lib/db";
import { ParkingZoneQuery } from "@/types/parking";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const selectParkingZones = async (): Promise<ParkingZoneQuery[]> => {
  const sql = `SELECT id, name, description, 
                    ST_Y(ST_GeometryN(location, 1)) AS topLeftLat,
                    ST_X(ST_GeometryN(location, 1)) AS topLeftLong,
                    ST_Y(ST_GeometryN(location, 2)) AS bottomRightLat,
                    ST_X(ST_GeometryN(location, 2)) AS bottomRightLong
                FROM parking_zones`;

  const [rows] = await promisePool.query<RowDataPacket[] & ParkingZoneQuery>(
    sql
  );

  // Map the rows to ParkingZoneQuery
  const parkingZones: ParkingZoneQuery[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    topLeftLat: row.topLeftLat,
    topLeftLong: row.topLeftLong,
    bottomRightLat: row.bottomRightLat,
    bottomRightLong: row.bottomRightLong,
  }));

  console.log(parkingZones);

  return parkingZones;
};

type InsertParkingZoneParams = {
  name: string;
  description: string;
  location: {
    topLeft: { latitude: number; longitude: number };
    bottomRight: { latitude: number; longitude: number };
  };
};

const insertParkingZone = async ({
  name,
  description,
  location,
}: InsertParkingZoneParams): Promise<number> => {
  const multiPointText = `MULTIPOINT((${location.topLeft.longitude} ${location.topLeft.latitude}), (${location.bottomRight.longitude} ${location.bottomRight.latitude}))`;

  const sql = `INSERT INTO parking_zones (name, description, location) 
                VALUES (?, ?, ST_GeomFromText(?, 4326))`;
  const values = [name, description, multiPointText];

  console.log("Values: ", values);

  const [result] = await promisePool.execute<ResultSetHeader>(sql, values);

  if (result.affectedRows === 0) {
    throw new Error("Parking zone could not be created");
  }

  return result.insertId;
};

export { selectParkingZones, insertParkingZone };
