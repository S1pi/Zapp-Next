import { NotFoundError } from "@/lib/customErrors";
import { saveFile } from "@/lib/saveFile";
import {
  insertCar,
  insertCarShowcase,
  selectCarById,
  selectCarsByDealershipId,
} from "@/models/carModel";
import { getDealershipById } from "@/models/dealershipModel";
import { AddCarData } from "@/types/cars";
import { CarShowcaseUpload } from "@/types/files";

const addNewCar = async (
  userId: number,
  car: AddCarData,
  carShowCase: File
) => {
  try {
    const carId = await insertCar(car);
    const newCar = await selectCarById(carId);

    const carShowCaseSaveFile = await saveFile({
      file: carShowCase,
      fileUsage: "car_showcase",
    });

    if (!carShowCaseSaveFile.fileUrl) {
      throw new Error("Car showcase url could not be created");
    }

    const carShowCaseData: CarShowcaseUpload = {
      user_id: userId,
      file_name: carShowCase.name,
      file_url: carShowCaseSaveFile.fileUrl,
      file_type: carShowCase.type,
      file_usage: "car_showcase",
      related_type: "car",
      related_id: newCar.id,
    };

    const carShowCaseId = await insertCarShowcase(carShowCaseData);

    if (!carShowCaseId) {
      throw new Error("Car showcase could not be added");
    }

    return {
      message: "Car added successfully",
      car: newCar,
      carShowCaseId: carShowCaseId,
    };
  } catch (err) {
    console.log(err);

    if ((err as any).code === "ER_NO_REFERENCED_ROW_2") {
      throw new NotFoundError("Linked dealership not found");
    }
    throw new Error("Car could not be added");
  }
};

const getDealershipCars = async (dsId: number) => {
  try {
    const cars = await selectCarsByDealershipId(dsId);
    const dealership = await getDealershipById(dsId);

    return {
      message: "Dealership cars retrieved successfully",
      dealership: dealership.name,
      cars: cars,
    };
  } catch (err) {
    console.log(err);

    if (err instanceof NotFoundError) {
      throw new NotFoundError(err.message);
    }

    throw new Error("Cars could not be retrieved for this dealership");
  }
};

export { addNewCar, getDealershipCars };
