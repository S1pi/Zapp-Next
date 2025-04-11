import DataCard from "@/components/DataCard";
import React from "react";

export default function LiveDashboard() {
  return (
    <div>
      <h1 className="text-h2 text-seabed-green mb-2 mt-5">Live Dashboard</h1>
      <h2 className="text-base text-seabed-green mt-4 py-4 border-t border-seperator-line">
        Tällä hetkellä
      </h2>
      <div className="grid grid-cols-4 gap-8 mb-6 m-auto mr-4 sm:mr-8 md:mr-12 lg:mr-20 xl:mr-80">
      {/* <div className="grid grid-cols-4 gap-8 mb-6 m-auto mr-4"> */}
        <DataCard title="Vapaita ZAPP-autoja" value="7/8" />
        <DataCard title="Vapaita autoja" value="10/11" />
        <DataCard title="Käyttäjiä" value="1069" />
      </div>
      <h2 className="text-base text-seabed-green mt-10 py-4 border-t border-seperator-line">
        Tilannekatsaus - 7 päivää
      </h2>
      <div className="grid grid-cols-4 gap-8 mb-6 m-auto mr-4 sm:mr-8 md:mr-12 lg:mr-20 xl:mr-80">
        <DataCard title="Varauksia" value="23" />
        <DataCard title="Liikevaihto" value="98,69 €" />
        <DataCard title="Varauksen keskihinta" value="7,82 €" />
      </div>
    </div>
  );
}
