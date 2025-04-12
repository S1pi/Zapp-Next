"use client";
import { CompanyInformation } from "@/components/registerPhases/CompanyInformation";
import { Confirmation } from "@/components/registerPhases/Confirmation";
import { UserInformation } from "@/components/registerPhases/UserInformation";
import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Link from "next/link";
import { UserInformation2 } from "@/components/registerPhases/UserInformation2";

export type CompanyInformationType = {
  companyName: string;
  companyRegistrationNumber: string;
  companyAddress: string;
};

export type UserInformationType = {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  postnumber: string;
  address: string;
};

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  const companyInitValues = {
    companyName: "",
    companyRegistrationNumber: "",
    companyAddress: "",
  };
  const userInitValues = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    postnumber: "",
    address: "",
  };

  const [companyInformation, setCompanyInformation] =
    useState<CompanyInformationType>(companyInitValues);
  const [userInformation, setUserInformation] =
    useState<UserInformationType>(userInitValues);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);

  const handleRegisterSubmit = async () => {
    // Handle the registration logic here, e.g., API call to register the user

    // You can access companyInformation and userInformation here
    console.log("Registeration submitted!");
    console.log("Company Information:", companyInformation);
    console.log("User Information:", userInformation);

    // Reset the form or redirect the user after successful registration
    setCompanyInformation(companyInitValues);
    setUserInformation(userInitValues);
    setStep(1); // Reset to the first step
  };

  return (
    <div className="bg-secondary flex flex-col items-center gap-8 p-8 h-full w-1/2 rounded-2xl shadow-loginform">
      <div className="flex items-center gap-2 w-full justify-between">
        {step > 1 && (
          <button
            className="flex justify-center rounded items-center hover:bg-seabed-green transition duration-300 ease-in-out cursor-pointer"
            onClick={handlePreviousStep}
            type="button"
          >
            <IoArrowBackOutline size={30} />
            <p className=" text-white p-2">Edellinen</p>
          </button>
        )}

        {step === 1 && (
          <Link
            className="flex justify-center rounded items-center hover:bg-seabed-green transition duration-300 ease-in-out cursor-pointer"
            href={"/auth/login"}
          >
            <IoArrowBackOutline size={30} />
            <p className=" text-white p-2">Takaisin kirjautumiseen</p>
          </Link>
        )}

        <h4 className="text-base text-center">Vaihe {step}/4</h4>
      </div>
      {step === 1 && (
        <CompanyInformation
          information={companyInformation}
          setInformation={setCompanyInformation}
          onNext={handleNextStep}
        />
      )}
      {step === 2 && (
        <UserInformation
          information={userInformation}
          setInformation={setUserInformation}
          onNext={handleNextStep}
        />
      )}
      {step === 3 && (
        <UserInformation2
          information={userInformation}
          setInformation={setUserInformation}
          onNext={handleNextStep}
        />
      )}
      {step === 4 && (
        <Confirmation
          userInformation={userInformation}
          companyInformation={companyInformation}
          onConfirmSubmit={handleRegisterSubmit}
        />
      )}
    </div>
  );
}
