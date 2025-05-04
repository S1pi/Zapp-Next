import promisePool from "@/lib/db";
import { ResultSetHeader } from "mysql2";

type DropOffPicsUrlData = {
  front_url: string;
  back_url: string;
  side_left_url: string;
  side_right_url: string;
};

const insertDropOffPics = async (
  driveId: number,
  urlData: DropOffPicsUrlData
) => {
  const sql = `INSERT INTO dropoff_pictures (reservation_id, front_url, back_url, side_left_url, side_right_url) VALUES (?, ?, ?, ?, ?)`;
  const values = [
    driveId,
    urlData.front_url,
    urlData.back_url,
    urlData.side_left_url,
    urlData.side_right_url,
  ];
  const [result] = await promisePool.execute<ResultSetHeader>(sql, values);
  const { affectedRows, insertId } = result;
  if (affectedRows === 0) {
    throw new Error("Drop-off pictures could not be inserted");
  }
  return insertId;
};

export { insertDropOffPics };
