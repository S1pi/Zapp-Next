import { getUserSession } from "@/actions/authActions";
import { CurrentStatus } from "@/app/_components/live-dashboard/CurrentStatus";
import { LastWeek } from "@/app/_components/live-dashboard/LastWeek";

export default async function LiveDashboard() {
  const userSession = await getUserSession();

  if (!userSession) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-h2 text-seabed-green mb-2 mt-5">
          Ei käyttöoikeutta
        </h1>
        <p className="text-base text-seabed-green mt-4 py-4 border-t border-seperator-line">
          Sinulla ei ole oikeuksia käyttää tätä sivua.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-h2 text-seabed-green mb-2 mt-5">
        Live Dashboard - {userSession.dealership?.name}
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
