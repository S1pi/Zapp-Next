import { createHash } from "crypto";

const INVITE_SALT = process.env.INVITE_SALT ?? "fallback_salt_for_invite_hash";

export const hashCode = (inputCode: string): Buffer => {
  const hash = createHash("sha256");
  hash.update(inputCode + INVITE_SALT);
  return hash.digest();
};
