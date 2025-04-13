import { CompanyInformationType } from "@/app/auth/register/page";
import Link from "next/link";

type CompanyInformationProps = {
  information: CompanyInformationType;
  setInformation: React.Dispatch<React.SetStateAction<CompanyInformationType>>;
  onNext: () => void;
};

export const CompanyInformation = ({
  information,
  setInformation,
  onNext,
}: CompanyInformationProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form information here if needed

    onNext(); // Call the onNext function to proceed to the next step
    // Optionally, you can also reset the form or perform any other actions
  };

  return (
    <div className="flex flex-col items-center h-full w-full p-8 gap-6">
      <h1>Yrityksen tiedot</h1>
      <form
        className="flex flex-col gap-8 max-w-sm w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="companyName" className="text-seabed-green">
            Yrityksen nimi
          </label>
          <input
            type="text"
            id="companyName"
            value={information.companyName}
            placeholder="Zapp Oy"
            className="border border-seabed-green rounded p-2 focus:ring-2 focus:ring-seabed-green focus:outline-none"
            onChange={(e) => {
              setInformation({ ...information, companyName: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="companyId" className="text-seabed-green">
            Y-tunnus
          </label>
          <input
            type="text"
            id="companyId"
            value={information.companyRegistrationNumber}
            placeholder="2345678-1"
            className="border border-black-zapp rounded p-2 focus:ring-2 focus:ring-seabed-green focus:outline-none"
            onChange={(e) => {
              setInformation({
                ...information,
                companyRegistrationNumber: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="companyAddress" className="text-seabed-green">
            Osoite
          </label>
          <input
            type="text"
            id="companyAddress"
            value={information.companyAddress}
            placeholder="Kaivokatu 1, 00100 Helsinki"
            className="border border-black-zapp rounded p-2 focus:ring-2 focus:ring-seabed-green focus:outline-none"
            onChange={(e) => {
              setInformation({
                ...information,
                companyAddress: e.target.value,
              });
            }}
          />
        </div>
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
      </form>
    </div>
  );
};
