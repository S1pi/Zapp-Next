import React from "react";

export default function LiveDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Live Dashboard</h1>
      <h2 className="text-lg text-gray-500 mb-6">Tällä hetkellä</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Vapaita ZAPP-autoja</p>
          <p className="text-3xl font-bold text-gray-800">7/8</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Vapaita autoja</p>
          <p className="text-3xl font-bold text-gray-800">10/11</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Käyttäjiä</p>
          <p className="text-3xl font-bold text-gray-800">1069</p>
        </div>
      </div>
      <h2 className="text-lg text-gray-500 mb-4">Tilannekatsaus - 7 päivää</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Varauksia</p>
          <p className="text-3xl font-bold text-gray-800">23</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Liikevaihto</p>
          <p className="text-3xl font-bold text-gray-800">98,69 €</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Varauksen keskihinta</p>
          <p className="text-3xl font-bold text-gray-800">7,82 €</p>
        </div>
      </div>
    </div>
  );
}