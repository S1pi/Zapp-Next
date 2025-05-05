"use client";

import { Form } from "@/app/_components/ui/Form";
import { Input } from "@/app/_components/ui/Input";
import { newParkingZoneSchema } from "@/lib/schemas/parkingZoneSchema";
import ZoneField from "./ZoneField";
import { createParkingZone } from "@/actions/dashboardActions";
import { useRouter } from "next/navigation"; // Importing useNavigation from next/navigation

export const ZoneSelection = () => {
  const navigation = useRouter(); // Get the navigation object to handle navigation events

  const onSuccess = (data: any) => {
    console.log("Success in ZoneSelection: ", data); // Handle success response from the server

    alert("Zone created successfully!"); // Show success message to the user
    navigation.push("/dashboard"); // Redirect to the parking zones page
  };

  return (
    <>
      {/* Add your parking zone management components here */}
      {/* // Parking zone map comes here */}
      <div className="flex flex-col gap-4 max-h-full h-screen pb-6 ">
        <Form
          validationSchema={newParkingZoneSchema}
          serverAction={createParkingZone}
          onSuccess={onSuccess}
          className="flex flex-col gap-4 h-full w-full text-black-zapp flex-1"
        >
          <Input
            type="text"
            name="name"
            label="Zone name: "
            placeholder="Helsinki Zone A"
            className="placeholder:text-black-zapp/50"
          />
          <Input
            type="text"
            name="description"
            label="Zone description: "
            placeholder="Keskustan pysäköintialue"
            className="placeholder:text-black-zapp/50"
          />
          <ZoneField />

          <button
            type="submit"
            className="max-w-64 bg-seabed-green text-white rounded-lg py-2 px-4 hover:bg-seabed-green/80 transition duration-200 ease-in-out cursor-pointer"
          >
            Add Parking Zone
          </button>
        </Form>
      </div>
    </>
  );
};
