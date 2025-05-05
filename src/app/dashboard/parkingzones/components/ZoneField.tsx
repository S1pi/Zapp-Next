"use client";

import { useFormContext } from "react-hook-form";
import ZonePicker from "./ZonePicker";
import { BBox } from "./ZonePicker"; // Import the BBox type from ZonePicker

export default function ZoneField() {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext(); // Get the form context from react-hook-form

  const locationError = errors.location as { message?: string } | undefined; // Get the location error from the form state

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div
        className={`rounded border ${
          locationError
            ? "border-red-500 ring-2 ring-red-300"
            : "border-black-zapp"
        } h-full`}
      >
        <ZonePicker
          initial={getValues("location") as BBox} // Get the initial bounding box from the form values
          onReady={(bbox: BBox) => {
            console.log("bbox inside ZoneField onReady: ", bbox); // Log the new bounding box

            const location = [bbox.topLeft, bbox.bottomRight]; // Create a location array with the corners of the rectangle

            console.log("location sended to setValue: ", location); // Log the location array

            setValue("location", location, {
              shouldValidate: true,
              shouldDirty: true,
            }); // Update the form value with the new bounding box
          }}
        />
      </div>
      {locationError && (
        <span className="text-red-500 text-sm" id="location-error">
          {locationError.message ?? "Please select a location"}
        </span>
      )}
    </div>
  );
}
