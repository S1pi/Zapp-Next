import { InvalidRoleError } from "@/lib/customErrors";
import {
  findAdminLastWeekDashboardData,
  findAdminLiveDashboardData,
  findDealerLastWeekDashboardData,
  findDealerLiveDashboardData,
} from "@/models/liveDashModel";
import { LastWeekDataNumbers } from "@/types/dashboardData";

export async function getLiveDashboardData(
  userRole: string,
  dealershipId: number
) {
  try {
    if (userRole === "admin") {
      return await findAdminLiveDashboardData(dealershipId);
    }

    if (userRole === "dealer") {
      return await findDealerLiveDashboardData(dealershipId);
    }
  } catch (error) {
    console.error("Error fetching live dashboard data:", error);
    throw new Error("Failed to fetch live dashboard data");
  }

  throw new InvalidRoleError("Invalid user role");
}

export async function getLastWeekDashboardData(
  userRole: string,
  dealershipId: number
): Promise<LastWeekDataNumbers> {
  try {
    if (userRole === "admin") {
      return await findAdminLastWeekDashboardData(dealershipId);
    }

    if (userRole === "dealer") {
      return await findDealerLastWeekDashboardData(dealershipId);
    }
  } catch (error) {
    console.error("Error fetching last week dashboard data:", error);
    throw new Error("Failed to fetch last week dashboard data");
  }

  throw new InvalidRoleError("Invalid user role");
}
