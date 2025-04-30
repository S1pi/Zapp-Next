type FileBase = {
  id: number;
  user_id: number;
  file_name: string;
  file_url: string;
  file_type: string;
  file_usage: string;
  related_type: "user" | "car";
  related_id: number;
  uploaded_at: Date;
};

type CarShowcaseUpload = Omit<FileBase, "id" | "uploaded_at">;

type DrivingLicenseData = {
  id: number;
  user_id: number;
  front_license_url: string;
  back_license_url: string;
  is_verified: boolean;
  expiry_date: Date;
  uploaded_at: Date;
};

export type { FileBase, CarShowcaseUpload, DrivingLicenseData };
