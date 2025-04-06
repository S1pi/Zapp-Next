import React from "react";

export default function LiveDashboard() {
  return (
    <div>
      <h1 className="text-h2 text-seabed-green mb-2 mt-5">Live Dashboard</h1>
      <h2 className="text-base text-seabed-green mt-4 py-4 border-t border-seperator-line">
        Tällä hetkellä
      </h2>
      <div className="grid grid-cols-3 gap-8 mb-6 m-auto mr-4 sm:mr-8 md:mr-12 lg:mr-20 xl:mr-80">
        <div className="bg-card-background p-2 rounded-lg shadow-dataCard border-1 border-card-stroke">
          <p className="text-sm text-secondary">Vapaita ZAPP-autoja</p>
          <p className="text-h3 text-black-zapp">7/8</p>
        </div>
        <div className="bg-card-background p-4 rounded-lg shadow-dataCard border-1 border-card-stroke">
          <p className="text-sm text-secondary">Vapaita autoja</p>
          <p className="text-h3 text-black-zapp">10/11</p>
        </div>
        <div className="bg-card-background p-4 rounded-lg shadow-dataCard border-1 border-card-stroke">
          <p className="text-sm text-secondary">Käyttäjiä</p>
          <p className="text-h3 text-black-zapp">1069</p>
        </div>
      </div>
      <h2 className="text-base text-seabed-green mt-10 py-4 border-t border-seperator-line">
        Tilannekatsaus - 7 päivää
      </h2>
      <div className="grid grid-cols-3 gap-8 mb-6 m-auto mr-4 sm:mr-8 md:mr-12 lg:mr-20 xl:mr-80">
        <div className="bg-card-background p-4 rounded-lg shadow-dataCard border-1 border-card-stroke">
          <p className="text-sm text-secondary">Varauksia</p>
          <p className="text-h3 text-black-zapp">23</p>
        </div>
        <div className="bg-card-background p-4 rounded-lg shadow-dataCard border-1 border-card-stroke">
          <p className="text-sm text-secondary">Liikevaihto</p>
          <p className="text-h3  text-black-zapp">98,69 €</p>
        </div>
        <div className="bg-card-background p-4 rounded-lg shadow-dataCard border-1 border-card-stroke">
          <p className="text-sm text-secondary">Varauksen keskihinta</p>
          <p className="text-h3 text-black-zapp">7,82 €</p>
        </div>
      </div>
    </div>
  );
}
