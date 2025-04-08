import { insertCar, selectCarById } from "@/models/carModel";
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
    throw new Error("Car could not be added");
  }
};

export { addNewCar };
