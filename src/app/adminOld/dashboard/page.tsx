import React from "react";

export default function LiveDashboard() {
  return (
    <div>
      <h1 className="text-h2 text-[var(--color-seabed-green)] mb-2 mt-5">Live Dashboard</h1>
      <h2 className="text-base text-[var(--color-seabed-green)] mt-10 p-4 border-t border-[var(--color-seabed-green)]">
        Tällä hetkellä
      </h2>
      <div className="grid grid-cols-3 gap-8 mb-6 m-auto mr-4 sm:mr-8 md:mr-12 lg:mr-20 xl:mr-80">
        <div className="bg-white p-2 rounded-lg shadow-[var(--shadow-dataCard)]">
          <p className="text-sm text-[var(--color-secondary)]">Vapaita ZAPP-autoja</p>
          <p className="text-h3 text-gray-800">7/8</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-[var(--shadow-dataCard)]">
          <p className="text-sm text-[var(--color-secondary)]">Vapaita autoja</p>
          <p className="text-h3 text-gray-800">10/11</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-[var(--shadow-dataCard)]">
          <p className="text-sm text-[var(--color-secondary)]">Käyttäjiä</p>
          <p className="text-h3 text-gray-800">1069</p>
        </div>
      </div>
      <h2 className="text-base text-[var(--color-seabed-green)] mt-10 p-4 border-t border-[var(--color-seabed-green)]">
        Tilannekatsaus - 7 päivää
      </h2>
      <div className="grid grid-cols-3 gap-8 mb-6 m-auto mr-4 sm:mr-8 md:mr-12 lg:mr-20 xl:mr-80">
        <div className="bg-white p-4 rounded-lg shadow-[var(--shadow-dataCard)]">
          <p className="text-sm text-[var(--color-secondary)]">Varauksia</p>
          <p className="text-h3 text-gray-800">23</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-[var(--shadow-dataCard)]">
          <p className="text-sm text-[var(--color-secondary)]">Liikevaihto</p>
          <p className="text-h3  text-gray-800">98,69 €</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-[var(--shadow-dataCard)]">
          <p className="text-sm text-[var(--color-secondary)]">Varauksen keskihinta</p>
          <p className="text-h3 text-gray-800">7,82 €</p>
        </div>
      </div>
    </div>
  );
}
