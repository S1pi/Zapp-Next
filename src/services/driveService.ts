import {
  DuplicateEntryError,
  ForbiddenError,
  MissingDataError,
  NotFoundError,
} from "@/lib/customErrors";
import { saveFile } from "@/lib/saveFile";
import {
  selectCarById,
  updateCarLocation,
  updateCarStatus,
} from "@/models/carModel";
import {
  insertDriveStart,
  insertDriveEnd,
  getDriveById,
} from "@/models/driveModel";
import { insertDropOffPics } from "@/models/dropOffModel";
import { getUserValidation } from "@/models/userModel";

const driveStart = async (userId: number, carId: number) => {
  try {
    const validated = await getUserValidation(userId);
    if (!validated) {
      throw new ForbiddenError("User not validated");
    }

    const car = await selectCarById(carId);
    if (!car) throw new NotFoundError("Car not found");
    if (car.is_reserved)
      throw new DuplicateEntryError("Car is already reserved");

    await updateCarStatus(carId, true);
    const location = car.longitude + "," + car.latitude;
    console.log("Drive start location:", location);
    const driveStart = await insertDriveStart({
      user_id: userId,
      car_id: carId,
      start_location: location,
    });

    return {
      message: "Drive started successfully",
      driveId: driveStart,
    };
  } catch (err) {
    console.log(err);
    if (err instanceof NotFoundError) {
      throw new NotFoundError(err.message);
    }
    if (err instanceof DuplicateEntryError) {
      throw new DuplicateEntryError(err.message);
    }
    if (err instanceof ForbiddenError) {
      throw new ForbiddenError(err.message);
    }
    console.log(err);
    throw new Error("Drive could not be started");
  }
};

const driveEnd = async (
  userId: number,
  driveId: number,
  endLocation: string,
  front: File,
  back: File,
  left: File,
  right: File
) => {
  try {
    const drive = await getDriveById(driveId);
    if (!drive) {
      throw new NotFoundError("Drive not found");
    }
    if (drive.user_id !== userId) {
      throw new ForbiddenError("User not authorized to end this drive");
    }

    const endTime = new Date();
    console.log("Drive end time:", endTime);
    console.log("Drive start time:", drive.start_time);

    await insertDriveEnd({
      drive_id: driveId,
      end_location: endLocation,
      end_time: endTime,
    });

    await updateCarLocation(drive.car_id, endLocation);

    await updateCarStatus(drive.car_id, false);

    if (!drive.active) {
      throw new DuplicateEntryError("Drive is already ended");
    }

    const frontUrl = await saveFile({
      file: front,
      fileUsage: "dropoff_front",
    });
    const backUrl = await saveFile({
      file: back,
      fileUsage: "dropoff_back",
    });
    const leftUrl = await saveFile({
      file: left,
      fileUsage: "dropoff_side_left",
    });
    const rightUrl = await saveFile({
      file: right,
      fileUsage: "dropoff_side_right",
    });
    if (
      !frontUrl.fileUrl ||
      !backUrl.fileUrl ||
      !leftUrl.fileUrl ||
      !rightUrl.fileUrl
    ) {
      throw new MissingDataError("Drop-off pictures url could not be created");
    }
    const dropOffPics = await insertDropOffPics(driveId, {
      front_url: frontUrl.fileUrl,
      back_url: backUrl.fileUrl,
      side_left_url: leftUrl.fileUrl,
      side_right_url: rightUrl.fileUrl,
    });

    if (!dropOffPics) {
      throw new Error("Drop-off pictures could not be inserted");
    }
    const startMs = drive.start_time.getTime();
    const endMs = new Date(endTime).getTime();

    const diffMs = endMs - startMs;
    const durationMinutes = Math.floor(diffMs / (1000 * 60));

    const cost = durationMinutes * 0.5;

    console.log("Ajon kesto minuutteina:", durationMinutes);
    console.log("Hinta:", cost);

    console.log("Drive cost:", cost);
    return {
      message: "Drive ended successfully",
      durationMinutes,
      cost,
    };
  } catch (err) {
    console.log(err);
    if (err instanceof NotFoundError) {
      throw new NotFoundError(err.message);
    }
    if (err instanceof DuplicateEntryError) {
      throw new DuplicateEntryError(err.message);
    }
    if (err instanceof MissingDataError) {
      throw new MissingDataError(err.message);
    }
    if (err instanceof ForbiddenError) {
      throw new ForbiddenError(err.message);
    }
    console.log(err);
    throw new Error("Drive could not be ended");
  }
};

export { driveStart, driveEnd };
