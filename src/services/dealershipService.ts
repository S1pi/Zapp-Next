import { DuplicateEntryError } from "@/lib/customErrors";
import {
  insertDealership,
  getDealershipById,
  getDealershipByContactId,
} from "@/models/dealershipModel";
import { DealershipCreate } from "@/types/dealership";

const createDealership = async (dealershipData: DealershipCreate) => {
  try {
    const createdDealershipId = await insertDealership(dealershipData);
    const createdDealership = await getDealershipById(createdDealershipId);

    return {
      message: "Dealership created successfully",
      dealership: createdDealership,
    };
  } catch (err) {
    if ((err as any).code === "ER_DUP_ENTRY") {
      throw new DuplicateEntryError("User is already linked to a dealership");
    }
    throw new Error("Dealership could not be created");
  }
};

const getDealershipIdByUser = async (userId: number) => {
  try {
    const dealership = await getDealershipByContactId(userId);
    return dealership;
  } catch (err) {
    console.log("Error in getDealershipIdByUser:", err);
    throw new Error("Dealership not found");
  }
};

export { createDealership, getDealershipIdByUser };
