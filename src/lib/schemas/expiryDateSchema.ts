import { z } from "zod";

// export const expiryDateSchema = z.object({
//   expiryDate: z
//     .date({
//       required_error: "Expiry date is required",
//       invalid_type_error: "Expiry date must be a valid date",
//     })
//     .refine((date) => date > new Date(), {
//       message: "Expiry date must be in the future",
//     }),
//   drivingLicenseId: z.string().nonempty({
//     message: "Driving license ID is required",
//   }),
// });

export const DrivingLicenseValidationSchema = z.object({
  expiryDate: z
    .date({
      required_error: "Expiry date is required",
      invalid_type_error: "Expiry date must be a valid date",
    })
    .refine((date) => date > new Date(), {
      message: "Expiry date must be in the future",
    }),
  // userId: z.number().min(1, {
  //   message: "User ID is required",
  // }),
  // drivingLicenseId: z.number().min(1, {
  //   message: "Driving license ID is required",
  // }),
  // validationStatus: z.enum(["validated", "denied"], {
  //   required_error: "Validation status is required",
  //   invalid_type_error:
  //     "Validation status must be a valid enum value: validated or denied",
  // }),
});

export type DrivingLicenseValues = z.infer<
  typeof DrivingLicenseValidationSchema
>;
