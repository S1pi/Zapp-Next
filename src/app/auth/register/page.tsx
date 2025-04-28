"use client";
import { CompanyInformation } from "@/components/registerPhases/CompanyInformation";
import {
  Confirmation,
  TokenValidationValues,
} from "@/components/registerPhases/Confirmation";
import { UserInformation } from "@/components/registerPhases/UserInformation";
import { IoArrowBackOutline } from "react-icons/io5";
import { useState } from "react";
import { UserInformation2 } from "@/components/registerPhases/UserInformation2";
import Link from "next/link";
import { VerifyInviteActionResult } from "@/actions/tokenActions";
import { submitRegisterAction } from "@/actions/registerActions";
import { redirect } from "next/navigation";
// import { ActionResult } from "@/components/ui/Form";

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

export type UserRegister = Omit<UserInformationType, "passwordConfirmation"> & {
  role: string;
};

export type CompanyRegister = CompanyInformationType & {
  contact_id: number;
};

export default function RegisterPage() {
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

  const [step, setStep] = useState(1);
  const [companyInformation, setCompanyInformation] =
    useState<CompanyInformationType>(companyInitValues);
  const [userInformation, setUserInformation] =
    useState<UserInformationType>(userInitValues);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);

  const handleRegisterSubmit = async (
    data: TokenValidationValues,
    responseData: VerifyInviteActionResult
  ) => {
    const userRegister: UserRegister = {
      ...userInformation,
      role: responseData.roleToAssign,
    };

    const res = await submitRegisterAction(
      companyInformation,
      userRegister,
      responseData.tokenId
    );

    if (!res.success) {
      console.error("Registration failed:", res.message);
      return;
    }

    console.log("handleRegisterSubmit called with response:", res);

    // Reset the form or redirect the user after successful registration
    setCompanyInformation(companyInitValues);
    setUserInformation(userInitValues);
    setStep(1); // Reset to the first step

    // Meaby handle success with data that returns from the server
    // Response is:
    // {
    //   success: true,
    //   message: "User created successfully",
    //   data: {
    //     companyId: 1,
    //     userId: 1,
    //   },
    // }

    // For now we just redirect to the login page and alert the user that the registration was successful
    alert("Rekisteröinti onnistui! Voit nyt kirjautua sisään.");
    redirect("/auth/login");
  };

  return (
    <div className="bg-primary text-secondary flex flex-col items-center gap-8 p-8 h-full w-1/2 min-w-2xl rounded-2xl shadow-loginform">
      <div className="flex items-center gap-2 w-full justify-between">
        {step > 1 && (
          <button
            className="flex justify-center rounded items-center text-seabed-green hover:bg-seabed-green hover:text-primary transition duration-300 ease-in-out cursor-pointer"
            onClick={handlePreviousStep}
            type="button"
          >
            <IoArrowBackOutline size={30} />
            <p className="p-2">Edellinen</p>
          </button>
        )}

        {step === 1 && (
          <Link
            className="flex justify-center rounded items-center text-seabed-green hover:bg-seabed-green hover:text-primary transition duration-300 ease-in-out cursor-pointer"
            href={"/auth/login"}
          >
            <IoArrowBackOutline size={30} />
            <p className=" p-2">Takaisin kirjautumiseen</p>
          </Link>
        )}

        <h4 className="text-base text-center text-seabed-green">
          Vaihe {step}/4
        </h4>
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
