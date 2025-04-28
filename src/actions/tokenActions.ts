"use server";
import { ActionResult } from "@/components/ui/Form";
import promisePool from "@/lib/db";
import { hashCode } from "@/lib/hashCode";
import {
  TokenCreateSchema,
  TokenValidationSchema,
} from "@/lib/schemas/tokenCreateSchema";
import { VerifyTokenResult } from "@/types/tokens";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { z } from "zod";

type Values = z.infer<typeof TokenCreateSchema>;
type TokenValue = z.infer<typeof TokenValidationSchema>;

export async function createInviteTokenAction(
  data: Values
): Promise<ActionResult<Values>> {
  // Check if user is admin here

  const parsedData = TokenCreateSchema.safeParse(data);
  if (!parsedData.success) {
    const issue = parsedData.error.issues[0];
    const field = issue.path[0] as keyof Values; // Get the field name from the error path

    return {
      success: false,
      field,
      message: issue.message,
    };
  }

  const { inviteCode, expiryDate, roleToAssign } = parsedData.data; // Destructure the parsed data to use it later

  const adminId = 1; // Placeholder for the authenticated admin ID

  const hashedCode = hashCode(inviteCode); // Hash the invite code

  try {
    const sql = `INSERT INTO invite_tokens (token_hash, role_to_assign, created_by, expires_at) 
                 VALUES (?, ?, ?, ?)`;
    const values = [hashedCode, roleToAssign, adminId, expiryDate];

    const [result] = await promisePool.execute(sql, values);
    console.log("Insert result: ", result);
  } catch (err: any) {
    console.error("Error inserting invite token: ", err);
    if (err.code === "ER_DUP_ENTRY") {
      return {
        success: false,
        message: "Token with this invite code already exists",
      };
    } else {
      throw new Error("Database error: " + err.message);
    }
  }

  return {
    success: true,
    message: "Token created successfully",
  };
}

export type VerifyInviteActionResult = {
  roleToAssign: string;
  tokenId: number;
};

export async function verifyInviteToken(
  data: TokenValue
): Promise<ActionResult<TokenValue, VerifyInviteActionResult>> {
  const hashedCode = hashCode(data.inviteCode); // Hash the invite code
  try {
    const sql = `SELECT id, role_to_assign, is_used, expires_at FROM invite_tokens WHERE token_hash = ?`;
    const values = [hashedCode];
    const [rows] = await promisePool.execute<
      RowDataPacket[] & VerifyTokenResult[]
    >(sql, values);

    if (!rows.length) throw new Error("Token not valid");

    if (rows[0].is_used) {
      return {
        success: false,
        message: "Token already used",
      };
    }

    if (rows[0].expires_at < new Date()) {
      return {
        success: false,
        message: "Token expired",
      };
    }

    // return {
    //   success: true,
    //   roleToAssign: rows[0].role_to_assign,
    //   tokenId: rows[0].id,
    // };

    return {
      success: true,
      message: "Token valid",
      resultData: {
        roleToAssign: rows[0].role_to_assign,
        tokenId: rows[0].id,
      },
    };
  } catch (err: any) {
    console.error("Error verifying invite token: ", err);

    if (err.message === "Token not valid") {
      return {
        success: false,
        message: "Token not valid",
      };
    }
    return {
      success: false,
      message: "Token verification failed",
    };
  }
}

export async function markTokenAsUsed(tokenId: number, userId: number) {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();
    const sql = `UPDATE invite_tokens SET is_used = 1, used_by = ? WHERE id = ?`;
    const values = [userId, tokenId];
    const [result] = await promisePool.execute<ResultSetHeader>(sql, values);

    if (result.affectedRows === 0) {
      throw new Error("Token not found or already used");
    }

    await connection.commit();
    return { success: true, message: "Token marked as used" };
  } catch (err: any) {
    await connection.rollback();
    console.error("Error marking token as used: ", err);
    throw new Error("Database error: " + err.message);
  } finally {
    connection.release();
  }
}
