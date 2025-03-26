import dbConnection from "@/lib/db";
import { User, UserCreate } from "@/types/user";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const getUserById = async (id: number): Promise<User> => {
  const query = "SELECT * FROM users WHERE id = ?";
  const [rows] = await dbConnection.query<RowDataPacket[] & User[]>(query, [
    id,
  ]);

  const userData = rows[0];

  return userData;
};

const createUser = async (userData: UserCreate): Promise<number> => {
  const sql =
    "INSERT INTO users (email, firstname, lastname, password, phone_number, postnumber, address) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    userData.email,
    userData.firstname,
    userData.lastname,
    userData.password,
    userData.phone_number,
    userData.postnumber,
    userData.address,
  ];

  const [result] = await dbConnection.execute<ResultSetHeader>(sql, values);

  if (result.affectedRows === 0) {
    throw new Error("User could not be created");
  }

  return result.insertId;
};

export { getUserById, createUser };
