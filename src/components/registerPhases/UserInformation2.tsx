import { UserInformationType } from "@/app/auth/register/page";

type UserInformationProps = {
  information: UserInformationType;
  setInformation: React.Dispatch<React.SetStateAction<UserInformationType>>;
  onNext: () => void;
};

export const UserInformation2 = ({
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
      <h1>Yrityksen edustajan kirjautumistiedot</h1>
      <p className="text-sm text-black-zapp">
        HUOM: Tämä on sama tili jolla käytät ZAPP-sovellusta ja vuokraat autoja.
      </p>
      <form
        className="flex flex-col gap-8 max-w-sm w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="phoneNumber" className="text-primary">
            Puhelinnumero
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={information.phone}
            placeholder="+358 40 1234567"
            className="border border-black-zapp rounded p-2 focus:ring-2 focus:ring-seabed-green focus:outline-none"
            onChange={(e) => {
              setInformation({ ...information, phone: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="text-primary">
            Sähköposti
          </label>
          <input
            type="email"
            id="email"
            value={information.email}
            placeholder="juha.kuusmaa-teir@hercules.com"
            className="border border-black-zapp rounded p-2 focus:ring-2 focus:ring-seabed-green focus:outline-none"
            onChange={(e) => {
              setInformation({ ...information, email: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password" className="text-primary">
            Salasana
          </label>
          <input
            type="password"
            id="password"
            value={information.password}
            placeholder="Salasana123!"
            className="border border-black-zapp rounded p-2 focus:ring-2 focus:ring-seabed-green focus:outline-none"
            onChange={(e) => {
              setInformation({ ...information, password: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="confirmPassword" className="text-primary">
            Vahvista salasana
          </label>

          <input
            type="password"
            id="confirmPassword"
            value={information.passwordConfirmation}
            placeholder="Salasana123!"
            className="border border-black-zapp rounded p-2 focus:ring-2 focus:ring-seabed-green focus:outline-none"
            onChange={(e) => {
              setInformation({
                ...information,
                passwordConfirmation: e.target.value,
              });
            }}
          />
        </div>

        <button
          type="submit"
          className="bg-black-zapp text-white rounded p-2 hover:bg-seabed-green transition duration-300 ease-in-out cursor-pointer"
        >
          Seuraava
        </button>
      </form>
    </div>
  );
};
