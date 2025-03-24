import React from "react";

export default function LiveDashboard() {
  return (
    <div>
      <h1 className="text-3xl text-[#093331] mb-2 mt-50">Live Dashboard</h1>
      <h2 className="text-lg text-[#093331] mt-10 p-4 border-t border-[#093331]">Tällä hetkellä</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-[#007f5f]">Vapaita ZAPP-autoja</p>
          <p className="text-3xl font-bold text-gray-800">7/8</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-[#007f5f]">Vapaita autoja</p>
          <p className="text-3xl font-bold text-gray-800">10/11</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-[#007f5f]">Käyttäjiä</p>
          <p className="text-3xl font-bold text-gray-800">1069</p>
        </div>
      </div>
      <h2 className="text-lg text-[#093331] mt-10 p-4 border-t border-border-[#093331]">Tilannekatsaus - 7 päivää</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-[#007f5f]">Varauksia</p>
          <p className="text-3xl font-bold text-gray-800">23</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-[#007f5f]">Liikevaihto</p>
          <p className="text-3xl font-bold text-gray-800">98,69 €</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-[#007f5f]">Varauksen keskihinta</p>
          <p className="text-3xl font-bold text-gray-800">7,82 €</p>
        </div>
      </div>
    </div>
  );
}