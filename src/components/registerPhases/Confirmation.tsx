import {
  CompanyInformationType,
  UserInformationType,
} from "@/app/auth/register/page";
import Link from "next/link";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

type ConfirmationProps = {
  companyInformation: CompanyInformationType;
  userInformation: UserInformationType;
  onConfirmSubmit: () => void;
};

export const Confirmation = ({
  companyInformation,
  userInformation,
  onConfirmSubmit,
}: ConfirmationProps) => {
  const [showPassword, setShowPassword] = useState(false);

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
      <Link
        href={"/auth/login"}
        className="bg-black-zapp text-white rounded p-2 hover:bg-seabed-green transition duration-300 ease-in-out cursor-pointer"
        onClick={onConfirmSubmit}
      >
        Vahvista ja Lähetä tiedot
      </Link>
    </>
  );
};
