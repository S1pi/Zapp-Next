"use client";

import { CompanyInformationType } from "@/app/auth/register/page";
import Link from "next/link";
import { Input } from "../ui/Input";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerActionCompany } from "@/app/actions/registerActions";
import { companyInformationSchema } from "@/lib/schemas/companyInformationSchema";

type CompanyInformationProps = {
  information: CompanyInformationType;
  setInformation: React.Dispatch<React.SetStateAction<CompanyInformationType>>;
  onNext: () => void;
};

export type CompanyInformationFormValues = z.infer<
  typeof companyInformationSchema
>;

export const CompanyInformation = ({
  information,
  setInformation,
  onNext,
}: CompanyInformationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<CompanyInformationFormValues>({
    resolver: zodResolver(companyInformationSchema),
    defaultValues: information,
  });

  const onSubmit = async (data: CompanyInformationFormValues) => {
    //   if (res?.field === "companyName") {
    //     setError("companyName", { message: res.message });
    //   }
    //   if (res?.field === "companyRegistrationNumber") {
    //     setError("companyRegistrationNumber", { message: res.message });
    // };
    console.log("isSubmitting: ", isValid);
    const res = await registerActionCompany(data); // Call the register server action here

    switch (res?.field) {
      case "companyName":
        setError("companyName", { message: res.message });
        break;
      case "companyRegistrationNumber":
        setError("companyRegistrationNumber", { message: res.message });
        break;
      case "companyAddress":
        setError("companyAddress", { message: res.message });
        break;
      default:
        break;
    }
    console.log("Res: ", res);

    if (res?.success) {
      setInformation(data); // Update the information state with the submitted data
      onNext(); // Call the onNext function to proceed to the next step
    } else {
      console.log("Error in registration:", res?.message);
      throw new Error("Error in registration"); // Handle the error as needed
    }
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Validate the form information here if needed

  //   onNext(); // Call the onNext function to proceed to the next step
  //   // Optionally, you can also reset the form or perform any other actions
  // };

  return (
    <div className="flex flex-col items-center h-full w-full p-8 gap-6">
      <h1>Yrityksen tiedot</h1>
      <form
        className="flex flex-col gap-6 max-w-sm w-full"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Input
          label="Yrityksen nimi"
          id="companyName"
          type="text"
          error={errors.companyName?.message}
          {...register("companyName")}
          // value={information.companyName}

          placeholder="Zapp Oy"
          // onChange={(e) => {
          //   setInformation({
          //     ...information,
          //     companyName: e.target.value,
          //   });
          // }}
        />

        <Input
          label="Y-tunnus"
          id="companyRegistrationNumber"
          type="text"
          error={errors.companyRegistrationNumber?.message}
          {...register("companyRegistrationNumber")}
          // value={information.companyRegistrationNumber}
          placeholder="2345678-1"
        />

        <Input
          label="Osoite"
          id="companyAddress"
          type="text"
          error={errors.companyAddress?.message}
          {...register("companyAddress")}
          // value={information.companyAddress}
          placeholder="Kaivokatu 1, 00100 Helsinki"
        />
        <div className="text-secondary flex flex-col gap-2 w-full">
          <p className="text-sm">
            Jatkamalla vahvistan lukeneeni ja hyväksyväni ZAPP:n{" "}
            <Link
              href={"/companyinfo/termsofuse"}
              className="underline text-seabed-green"
            >
              käyttöehdot yrityksille
            </Link>
            ,{" "}
            <Link
              href={"/companyinfo/privacy"}
              className="underline text-seabed-green"
            >
              tietosuojakäytännön
            </Link>{" "}
            ja{" "}
            <Link
              href={"/companyinfo/serviceagreement"}
              className="underline text-seabed-green"
            >
              palvelusopimuksen
            </Link>
            . Ymmärrän myös, miten ZAPP käsittelee yrityksen tietoja.
          </p>
        </div>
        <button
          type="submit"
          // disabled={!isValid}
          className="bg-seabed-green text-white rounded p-2 hover:bg-black-zapp transition duration-300 ease-in-out cursor-pointer"
        >
          Seuraava
        </button>
      </form>
    </div>
  );
};
