type VerifyTokenResult = {
  id: number;
  role_to_assign: string;
  is_used: boolean;
  expires_at: Date | string;
};

export type { VerifyTokenResult };
