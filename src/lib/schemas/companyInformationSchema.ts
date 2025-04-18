import { z } from "zod";

export const companyInformationSchema = z.object({
  companyName: z.string().trim().min(1, "Yrityksen nimi on pakollinen"),
  companyRegistrationNumber: z
    .string()
    .trim()
    .min(1, "Y-tunnus on pakollinen")
    .regex(/^\d{7}-\d$/, "Virheellinen Y-tunnus"),
  companyAddress: z
    .string()
    .min(1, "Osoite on pakollinen")
    .transform((val) => {
      return val.replace(/\s+/g, " ").trim(); // Remove extra spaces and trim
    })
    .refine((val) => {
      const regex =
        /^[\p{L}ÅÄÖåäö .'-]+ \d+[A-Za-z]?,\s\d{5}\s[\p{L}ÅÄÖåäö .'-]+$/iu;
      return regex.test(val);
    }, "Syötä osoite muodossa: katuosoite, postinumero ja kaupunki"),
});
