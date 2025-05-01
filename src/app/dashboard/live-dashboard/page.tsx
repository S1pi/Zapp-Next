"use client";
import { CurrentStatus } from "@/components/live-dashboard/CurrentStatus";
import { LastWeek } from "@/components/live-dashboard/LastWeek";
import { useAdminSession } from "@/contexts/userContext";

export default function LiveDashboard() {
  const { userSession } = useAdminSession();

  return (
    <div>
      <h1 className="text-h2 text-seabed-green mb-2 mt-5">
        Live Dashboard - {userSession?.dealership?.name}
      </h1>
      <h2 className="text-base text-seabed-green mt-4 py-4 border-t border-seperator-line">
        Tällä hetkellä
      </h2>
      <CurrentStatus />
      <h2 className="text-base text-seabed-green mt-10 py-4 border-t border-seperator-line">
        Tilannekatsaus - 7 päivää
      </h2>
      <LastWeek />
    </div>
  );
}
