import dbConnection from "@/lib/db";
import { Dealership, DealershipCreate } from "@/types/dealership";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const createDealership = async (
  dealershipData: DealershipCreate
): Promise<number> => {
  const sql =
    "INSERT INTO dealerships (name, address, contact_id) VALUES (?, ?, ?)";
  const values = [
    dealershipData.name,
    dealershipData.address,
    dealershipData.contact_id,
  ];
  const [result] = await dbConnection.execute<ResultSetHeader>(sql, values);

  const { affectedRows, insertId } = result;

  if (affectedRows === 0) {
    throw new Error("Dealership could not be created");
  }

  return insertId;
};

const getDealershipById = async (id: number): Promise<Dealership> => {
  const query = "SELECT * FROM dealerships WHERE id = ?";
  const [rows] = await dbConnection.query<RowDataPacket[] & Dealership[]>(
    query,
    [id]
  );

  if (rows.length === 0) {
    throw new Error("Dealership not found");
  }

  return rows[0];
};

export { createDealership, getDealershipById };
