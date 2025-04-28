import dbConnection from "@/lib/db";
import { Dealership, DealershipCreate } from "@/types/dealership";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const insertDealership = async (
  dealershipData: DealershipCreate
): Promise<number> => {
  const sql =
    "INSERT INTO dealerships (name, address, registeration_number, contact_id) VALUES (?, ?, ?, ?)";
  const values = [
    dealershipData.name,
    dealershipData.address,
    dealershipData.registeration_number,
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

const getDealershipByContactId = async (contactId: number): Promise<number> => {
  const query = "SELECT id FROM dealerships WHERE contact_id = ?";
  const [rows] = await dbConnection.query<RowDataPacket[]>(query, [contactId]);

  if (rows.length === 0) {
    throw new Error("Dealership not found for this contact ID");
  }

  console.log("Rows in getDealershipByContactId:", rows);
  console.log("Dealership ID:", rows[0].id);

  return rows[0].id;
};

export { insertDealership, getDealershipById, getDealershipByContactId };
