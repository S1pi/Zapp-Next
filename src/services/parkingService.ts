import {
  insertParkingZone,
  selectParkingZones,
} from "@/models/parkingZoneModel";
import { NewParkingZone, ParkingZone, ParkingZoneQuery } from "@/types/parking";
import { ParkingZoneResponse } from "@/types/responses";

const calculateCoordinates = (parkingZone: ParkingZoneQuery): ParkingZone => {
  const {
    id,
    name,
    description,
    topLeftLat,
    topLeftLong,
    bottomRightLat,
    bottomRightLong,
  } = parkingZone;

  const topLeft = {
    latitude: topLeftLat,
    longitude: topLeftLong,
  };

  const bottomRight = {
    latitude: bottomRightLat,
    longitude: bottomRightLong,
  };

  const topRight = {
    latitude: topLeftLat,
    longitude: bottomRightLong,
  };

  const bottomLeft = {
    latitude: bottomRightLat,
    longitude: topLeftLong,
  };

  const parkingZoneCoords: ParkingZone = {
    id,
    name,
    description,
    location: [topLeft, topRight, bottomRight, bottomLeft],
  };

  return parkingZoneCoords;
};

const getParkingZones = async (): Promise<ParkingZoneResponse> => {
  const parkingZonesFromModel = await selectParkingZones();

  if (!parkingZonesFromModel || parkingZonesFromModel.length === 0) {
    return {
      message: "No parking zones found",
      parkingZones: [],
    };
  }

  // Logic to calculate parkingzone topRight and bottomLeft coordinates
  // using the topLeft and bottomRight coordinates

  const parkingZones = parkingZonesFromModel.map((parkingZone) =>
    calculateCoordinates(parkingZone)
  );

  return {
    message: "Parking zones retrieved successfully",
    parkingZones,
  };
};

const addParkingZone = async (parkingzoneData: NewParkingZone) => {
  const { name, description, location } = parkingzoneData;

  const topLeft = {
    longitude: location[0].longitude,
    latitude: location[0].latitude,
  };

  const bottomRight = {
    longitude: location[1].longitude,
    latitude: location[1].latitude,
  };

  const paramsForInsertParkingZone = {
    name,
    description,
    location: {
      topLeft,
      bottomRight,
    },
  };

  const parkingZoneId = await insertParkingZone(paramsForInsertParkingZone);

  return {
    message: "Parking zone created successfully",
    parkingZone: {
      id: parkingZoneId,
      name,
      description,
    },
  };
};

export { getParkingZones, addParkingZone };
