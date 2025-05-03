import {
  CompanyInformationType,
  UserInformationType,
} from "@/app/auth/register/page";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Input } from "../ui/Input";
import { Form } from "../ui/Form";
import { TokenValidationSchema } from "@/lib/schemas/tokenCreateSchema";
import { z } from "zod";
import {
  VerifyInviteActionResult,
  verifyInviteToken,
} from "@/actions/tokenActions";

type ConfirmationProps = {
  companyInformation: CompanyInformationType;
  userInformation: UserInformationType;
  onConfirmSubmit: (
    data: TokenValidationValues,
    responseData: VerifyInviteActionResult
  ) => void;
};

export type TokenValidationValues = z.infer<typeof TokenValidationSchema>;

export const Confirmation = ({
  companyInformation,
  userInformation,
  onConfirmSubmit,
}: ConfirmationProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // const handleSuccess = (
  //   data: TokenValidationValues,
  //   responseData: VerifyInviteActionResult
  // ) => {
  //   console.log("Token validation response:", responseData);

  //   // Call the onConfirmSubmit function to proceed to the next step
  //   // onConfirmSubmit();
  // };

  return (
    <>
      <h1 className="text-seabed-green font-bold">Vahvista tiedot</h1>
      <div className="flex flex-row justify-between h-full w-full gap-6">
        <div className="flex flex-col gap-6 items-center">
          <h3 className="text-seabed-green font-bold">Yrityksen tiedot</h3>
          <div className="flex flex-col gap-4">
            <p>Yrityksen nimi: {companyInformation.companyName}</p>
            <p>Y-tunnus: {companyInformation.companyRegistrationNumber}</p>
            <p>Osoite: {companyInformation.companyAddress}</p>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center ">
          <h3 className="text-seabed-green font-bold">Käyttäjän tiedot</h3>
          <div className="flex flex-col gap-4 ">
            <p>Etunimi: {userInformation.firstname}</p>
            <p>Sukunimi: {userInformation.lastname}</p>
            <p>Sähköposti: {userInformation.email}</p>
            <p>Puhelin: {userInformation.phone}</p>
            <p>Osoite: {userInformation.address}</p>
            <p>Postinumero: {userInformation.postnumber}</p>
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="password">Salasana:</label>
              <div className="flex flex-row items-center gap-2 border border-seabed-green rounded p-2">
                <input
                  disabled
                  value={userInformation.password}
                  type={showPassword ? "text" : "password"}
                />
                <FaEye
                  className="cursor-pointer hover:text-black-zapp"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center h-full w-full px-8 gap-6">
        <h5 className="text-xl">Syötä saamasi aktivointi koodi: </h5>
        <Form
          validationSchema={TokenValidationSchema}
          serverAction={verifyInviteToken}
          onSuccess={onConfirmSubmit}
          className="flex flex-col gap-6 h-full justify-center items-center"
        >
          <Input
            label="Aktivointi koodi"
            name="inviteCode"
            type="text"
            placeholder="Syötä aktivointi koodi"
          />

          <button
            type="submit"
            className="bg-black-zapp text-white rounded p-2 hover:bg-seabed-green transition duration-300 ease-in-out cursor-pointer px-4"
          >
            Vahvista ja Lähetä tiedot
          </button>
        </Form>
      </div>
    </>
  );
};
