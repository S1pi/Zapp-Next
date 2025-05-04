import Link from "next/link";
import { Input } from "../ui/Input";
import { z } from "zod";
import { registerActionCompany } from "@/actions/registerActions";
import { companyInformationSchema } from "@/lib/schemas/companyInformationSchema";
import { Form } from "../ui/Form";

export type CompanyInformationFormValues = z.infer<
  typeof companyInformationSchema
>;

type CompanyInformationProps = {
  information: CompanyInformationFormValues;
  setInformation: React.Dispatch<
    React.SetStateAction<CompanyInformationFormValues>
  >;
  onNext: () => void;
};

export const CompanyInformation = ({
  information,
  setInformation,
  onNext,
}: CompanyInformationProps) => {
  const handleSuccess = (data: CompanyInformationFormValues) => {
    setInformation(data); // Update the information state with the submitted data
    onNext(); // Call the onNext function to proceed to the next step
  };

  return (
    <div className="flex flex-col items-center h-full w-full p-8 gap-6">
      <h1>Yrityksen tiedot</h1>
      <Form
        validationSchema={companyInformationSchema}
        defaultValues={information}
        serverAction={registerActionCompany}
        onSuccess={handleSuccess}
        className="flex flex-col gap-6 max-w-sm justify-evenly h-full"
      >
        <Input
          label="Yrityksen nimi"
          name="companyName"
          type="text"
          placeholder="Zapp Oy"
        />
        <Input
          label="Y-tunnus"
          name="companyRegistrationNumber"
          type="text"
          placeholder="2345678-1"
        />
        <Input
          label="Osoite"
          name="companyAddress"
          type="text"
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
          className="bg-seabed-green text-white rounded p-2 hover:bg-black-zapp transition duration-300 ease-in-out cursor-pointer"
        >
          Seuraava
        </button>
      </Form>
    </div>
  );
};
