import { requireRole } from "@/actions/authActions";
import { InvalidRoleError } from "@/lib/customErrors";
import {
  selectAllReservations,
  selectAllReservationsByDealershipId,
} from "@/models/reservationModel";

const getReservationsService = async (role: string, dealershipId: number) => {
  try {
    if (role === "admin") {
      await requireRole("admin");
      return await selectAllReservations();
    }

    if (role === "dealer") {
      await requireRole("dealer");
      return await selectAllReservationsByDealershipId(dealershipId);
    }
  } catch (error) {
    console.error("Error fetching live dashboard data:", error);
    throw new Error("Failed to fetch Reservations");
  }

  throw new InvalidRoleError("Invalid user role");
};

export { getReservationsService };
