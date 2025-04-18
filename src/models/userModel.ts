import { NotFoundError } from "@/lib/customErrors";
import promisePool from "@/lib/db";
import { User, UserCreate } from "@/types/user";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const getUserById = async (id: number): Promise<User> => {
  const query = "SELECT * FROM users WHERE id = ?";
  const [rows] = await promisePool.query<RowDataPacket[] & User[]>(query, [id]);

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

  const [result] = await promisePool.execute<ResultSetHeader>(sql, values);

  if (result.affectedRows === 0) {
    throw new Error("User could not be created");
  }

  return result.insertId;
};

const getUserByEmailOrPhone = async (emailOrPhone: string): Promise<User> => {
  const query =
    "SELECT * FROM users WHERE email = ? OR phone_number = ? LIMIT 1";
  const [rows] = await promisePool.query<RowDataPacket[] & User[]>(query, [
    emailOrPhone,
    emailOrPhone,
  ]);

  if (rows.length === 0) {
    throw new Error("User not found");
  }

  return rows[0];
};

const updateUserRole = async (id: number, role: string) => {
  const dbConnection = await promisePool.getConnection();
  const sql = "UPDATE users SET role = ? WHERE id = ?";
  const values = [role, id];

  try {
    await dbConnection.beginTransaction();
    const [result] = await promisePool.execute<ResultSetHeader>(sql, values);

    if (result.affectedRows === 0) {
      throw new NotFoundError("User not found");
    }

    await dbConnection.commit();
    return { message: "User role updated successfully" };
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw new NotFoundError("User not found");
    }

    console.error("Error in updateUserRole:", error);

    await dbConnection.rollback();
    throw new Error("Transaction failed: " + (error as Error).message);
  } finally {
    dbConnection.release();
  }
};

export { getUserById, createUser, getUserByEmailOrPhone, updateUserRole };
