import {
  createDealership as createDS,
  getDealershipById,
} from "@/models/dealershipModel";
import { DealershipCreate } from "@/types/dealership";

const createDealership = async (dealershipData: DealershipCreate) => {
  try {
    const createdDealershipId = await createDS(dealershipData);
    const createdDealership = await getDealershipById(createdDealershipId);

    return {
      message: "Dealership created successfully",
      dealership: createdDealership,
    };
  } catch (err) {}
};

export { createDealership };
