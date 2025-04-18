import { UserInformationType } from "@/app/auth/register/page";
import { userInformationSchema } from "@/lib/schemas/companyInformationSchema";
import { z } from "zod";
import { Form } from "../ui/Form";
import { Input } from "../ui/Input";

export type UserInformationFormValues = z.infer<typeof userInformationSchema>;

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
  const handleSuccess = (data: UserInformationFormValues) => {
    setInformation({
      ...information,
      firstname: data.firstname,
      lastname: data.lastname,
      postnumber: data.postnumber,
      address: data.address,
    }); // Update the information state with the submitted data
    onNext(); // Call the onNext function to proceed to the next step
    console.log("OnNext called with data:", data);
  };

  return (
    <div className="flex flex-col items-center h-full w-full px-8 gap-6">
      <h1>Yrityksen edustajan tiedot</h1>
      <p className="text-sm text-black-zapp">
        HUOM: Tämä on sama tili jolla käytät ZAPP-sovellusta ja vuokraat autoja.
      </p>
      <Form
        validationSchema={userInformationSchema}
        defaultValues={information}
        onSuccess={handleSuccess}
        className="flex flex-col max-w-sm gap-6 h-full"
      >
        <Input
          label="Etunimi"
          name="firstname"
          type="text"
          placeholder="Matti"
        />

        <Input
          label="Sukunimi"
          name="lastname"
          type="text"
          placeholder="Meikäläinen"
        />

        <Input
          label="Osoite"
          name="address"
          type="text"
          placeholder="Kaivokatu 1A"
        />

        <Input
          label="Postinumero"
          name="postnumber"
          type="text"
          placeholder="00100"
        />
        <button
          type="submit"
          className="bg-seabed-green text-white rounded p-2 hover:bg-black-zapp transition duration-300 ease-in-out cursor-pointer mt-2"
        >
          Jatka
        </button>
      </Form>
    </div>
  );
};
