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

export const userInformationSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(1, "Etunimi on pakollinen")
    .regex(/^[a-zA-Z]+$/, {
      message: "Etunimi voi sisältää vain kirjaimia",
    }),
  lastname: z
    .string()
    .trim()
    .min(1, "Sukunimi on pakollinen")
    .regex(/^[a-äA-Ä]+$/, {
      message: "Sukunimi voi sisältää vain kirjaimia",
    }),
  address: z
    .string()
    .min(1, "Osoite on pakollinen")
    .transform((val) => {
      return val.replace(/\s+/g, " ").trim(); // Remove extra spaces and trim
    })
    .refine((val) => {
      const regex = /^[\p{L}0-9 .,'-]+ \d+[A-Za-z]?$/u;
      return regex.test(val);
    }, 'Syötä osoite muodossa: "Katuosoite 12A" tms. '),
  postnumber: z
    .string()
    .trim()
    .regex(/^\d{5}$/, {
      message: "postnumber must be 5 digits long, e.g. 00100",
    }),
});

export const userLoginInformationSchema = z
  .object({
    phone: z
      .string()
      .transform((value) => value.replace(/\s+/g, ""))
      .refine(
        (number) => {
          return /^\+358\d{9}$/.test(number) || /^0\d{8,10}$/.test(number);
        },
        {
          message:
            "Puhelinnumeron tulee alkaa +358 tai 0 ja olla 7-10 numeroa pitkä",
        }
      ),
    email: z.string().email({ message: "Virheellinen sähköpostiosoite" }),
    password: z
      .string()
      .min(8, { message: "Salasanan pituuden tulee olla vähintään 8 merkkiä" })
      .max(32, {
        message: "Salasanan pituuden tulee olla enintään 32 merkkiä",
      }),
    passwordConfirmation: z.string().min(1, {
      message: "Salasanat eivät täsmää",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Salasanat eivät täsmää",
    path: ["passwordConfirmation"],
  });
