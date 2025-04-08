import { NotFoundError } from "@/lib/customErrors";
import {
  insertCar,
  selectCarById,
  selectCarsByDealershipId,
} from "@/models/carModel";
import { getDealershipById } from "@/models/dealershipModel";
import { AddCarData } from "@/types/cars";

const addNewCar = async (car: AddCarData) => {
  try {
    const carId = await insertCar(car);
    const newCar = await selectCarById(carId);

    return {
      message: "Car added successfully",
      car: newCar,
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
