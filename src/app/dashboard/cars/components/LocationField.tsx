import LocationPicker from "@/app/_components/LocationPicker";
import { useFormContext } from "react-hook-form";

type LocationFieldProps = {
  setMarkerLocation: (location: {
    latitude: number;
    longitude: number;
  }) => void;
};

export const LocationField = ({ setMarkerLocation }: LocationFieldProps) => {
  const { setValue, getValues } = useFormContext();
  return (
    <LocationPicker
      initialPosition={getValues("location")}
      onSelectedLocation={(location) => {
        setValue("location", location, {
          shouldValidate: true,
          shouldDirty: true,
        });
        setMarkerLocation(location); // Update the marker location state
      }}
    />
  );
};
