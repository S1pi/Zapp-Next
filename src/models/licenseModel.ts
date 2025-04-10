import promisePool from "@/lib/db";
import { DriverLicenseUrlData } from "@/types/user";
import { ResultSetHeader } from "mysql2";

const insertDriverLicenseData = async (
  userId: number,
  urlData: DriverLicenseUrlData
) => {
  const sql = `INSERT INTO driving_licenses (user_id, front_license_url, back_license_url) VALUES (?, ?, ?)`;
  const values = [userId, urlData.front_license_url, urlData.back_license_url];

  const [result] = await promisePool.execute<ResultSetHeader>(sql, values);

  const { affectedRows, insertId } = result;

  if (affectedRows === 0) {
    throw new Error("Driver license data could not be inserted");
  }

  return insertId;
};

export { insertDriverLicenseData };
