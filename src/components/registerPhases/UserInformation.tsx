import { UserInformationType } from "@/app/auth/register/page";

type UserInformationProps = {
  information: UserInformationType;
  setInformation: React.Dispatch<React.SetStateAction<UserInformationType>>;
  onNext: () => void;
};

export const UserInformation = ({
  information,
  setInformation,
  onNext,
}: UserInformationProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form information here if needed

    onNext(); // Call the onNext function to proceed to the next step
    // Optionally, you can also reset the form or perform any other actions
  };

  return (
    <div className="flex flex-col items-center h-full w-full px-8 gap-6">
      <h1>Yrityksen edustajan tiedot</h1>
      <p className="text-sm text-black-zapp">
        HUOM: Tämä on sama tili jolla käytät ZAPP-sovellusta ja vuokraat autoja.
      </p>
      <form
        className="flex flex-col gap-8 max-w-sm w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="firstName" className="text-primary">
            Etunimi
          </label>
          <input
            type="text"
            id="firstName"
            value={information.firstname}
            placeholder="Matti"
            className="border border-black-zapp rounded p-2 focus:ring-2 focus:ring-seabed-green focus:outline-none"
            onChange={(e) => {
              setInformation({ ...information, firstname: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="lastName" className="text-primary">
            Sukunimi
          </label>
          <input
            type="text"
            id="lastName"
            value={information.lastname}
            placeholder="Meikäläinen"
            className="border border-black-zapp rounded p-2 focus:ring-2 focus:ring-seabed-green focus:outline-none"
            onChange={(e) => {
              setInformation({ ...information, lastname: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="address" className="text-primary">
            Kotiosoite
          </label>

          <input
            type="text"
            id="address"
            value={information.address}
            placeholder="Kuusikatu 1"
            className="border border-black-zapp rounded p-2 focus:ring-2 focus:ring-seabed-green focus:outline-none"
            onChange={(e) => {
              setInformation({ ...information, address: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="postalCode" className="text-primary">
            Postinumero
          </label>
          <input
            type="text"
            id="postalCode"
            value={information.postnumber}
            placeholder="00100"
            className="border border-black-zapp rounded p-2 focus:ring-2 focus:ring-seabed-green focus:outline-none"
            onChange={(e) => {
              setInformation({ ...information, postnumber: e.target.value });
            }}
          />
        </div>

        <button
          type="submit"
          className="bg-black-zapp text-white rounded p-2 hover:bg-seabed-green transition duration-300 ease-in-out cursor-pointer"
        >
          Jatka
        </button>
      </form>
    </div>
  );
};
