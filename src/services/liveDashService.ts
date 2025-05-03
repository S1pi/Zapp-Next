import {
  findAdminLiveDashboardData,
  findDealerLiveDashboardData,
} from "@/models/liveDashModel";

export async function getLiveDashboardData(
  userRole: string,
  dealershipId: number
) {
  if (userRole === "admin") {
    return await findAdminLiveDashboardData(dealershipId);
  }

  if (userRole === "dealer") {
    return await findDealerLiveDashboardData(dealershipId);
  }

  throw new Error("Invalid user role");
}
