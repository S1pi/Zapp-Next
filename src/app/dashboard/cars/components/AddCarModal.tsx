import { createNewCar } from "@/actions/dashboardActions";
import CustomFileInput from "@/app/_components/ui/CustomFileInput";
import { Form } from "@/app/_components/ui/Form";
import { Input } from "@/app/_components/ui/Input";
import { newCarSchema } from "@/lib/schemas/newCarSchema";
import { Dispatch } from "react";

type AddCarModalProps = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const AddCarModal = ({ setShowModal }: AddCarModalProps) => {
  const handleSuccess = async (data: any) => {
    console.log("Form submitted successfully:", data); // Log the successful form submission
    setShowModal(false); // Close the modal after successful submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black-zapp/50 z-50">
      <div className="bg-primary p-6 rounded shadow-lg min-w-1/4 border-2 border-black-zapp flex flex-col justify-evenly items-center relative">
        <h1 className="font-bold mb-4 text-seabed-green">Add new car: </h1>

        <Form
          validationSchema={newCarSchema}
          serverAction={createNewCar}
          onSuccess={handleSuccess}
          className="flex flex-row gap-8 self-center text-center"
        >
          <div className="flex flex-col gap-4 w-full text-black-zapp flex-1">
            <Input
              type="text"
              name="brand"
              label="Car brand: "
              placeholder="Tesla"
              className="placeholder:text-black-zapp/50"
            />
            <Input
              type="text"
              name="model"
              label="Car model: "
              placeholder="Model S"
              className="placeholder:text-black-zapp/50"
            />
            <Input
              type="text"
              name="color"
              label="Car color: "
              placeholder="Red"
              className="placeholder:text-black-zapp/50"
            />
            <Input
              type="number"
              name="year"
              label="Car Year of manufacture: "
              placeholder="2023"
              className="placeholder:text-black-zapp/50"
            />
            <Input
              type="text"
              name="license_plate"
              label="Car license plate: "
              placeholder="ABC-123"
              className="placeholder:text-black-zapp/50"
            />
            <Input
              type="number"
              name="seats"
              label="Number of seats: "
              placeholder="5"
              className="placeholder:text-black-zapp/50"
            />
          </div>

          <div className="flex flex-col gap-4 w-full text-black-zapp flex-2">
            <CustomFileInput
              inputName="car_img"
              labelText="Car image: "
              imageHeight={"96"}
            />
            <button
              type="submit"
              className="bg-seabed-green text-white py-2 px-4 rounded hover:bg-seabed-green/80 transition duration-300 cursor-pointer"
            >
              Add Car
            </button>
          </div>
        </Form>

        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded absolute left-4 top-4 cursor-pointer"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};
