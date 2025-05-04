import { UserInformationType } from "@/app/auth/register/page";
import { userLoginInformationSchema } from "@/lib/schemas/companyInformationSchema";
import { z } from "zod";
import { Form } from "../ui/Form";
import { Input } from "../ui/Input";
import { useState } from "react";
import { registerActionUserLoginInfo } from "@/actions/registerActions";

export type UserLoginInformationFormValues = z.infer<
  typeof userLoginInformationSchema
>;

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
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleSuccess = (data: UserLoginInformationFormValues) => {
    setInformation({
      ...information,
      phone: data.phone,
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    }); // Update the information state with the submitted data
    onNext(); // Call the onNext function to proceed to the next step
  };

  return (
    <div className="flex flex-col items-center h-full w-full px-8 gap-6">
      <h1>Kirjautumistiedot</h1>
      <p className="text-sm text-black-zapp">
        HUOM: Tämä on sama tili jolla käytät ZAPP-sovellusta ja vuokraat autoja.
      </p>

      <Form
        validationSchema={userLoginInformationSchema}
        defaultValues={information}
        serverAction={registerActionUserLoginInfo}
        onSuccess={handleSuccess}
        className="flex flex-col max-w-sm gap-6 h-full"
      >
        <Input
          label="Puhelinnumero"
          name="phone"
          type="text"
          placeholder="+358 40 123 4567"
        />

        <Input
          label="Sähköposti"
          name="email"
          type="text"
          placeholder="Juha@hercules.com"
        />

        <Input
          label="Salasana"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Salasana123!"
        />

        <Input
          label="Salasana uudelleen"
          name="passwordConfirmation"
          type="password"
          placeholder="Salasana123!"
        />
        <button
          type="submit"
          className="bg-black-zapp text-white rounded p-2 hover:bg-seabed-green transition duration-300 ease-in-out cursor-pointer"
        >
          Seuraava
        </button>
      </Form>
    </div>
  );
};
