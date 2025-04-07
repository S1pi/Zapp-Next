import React from "react";

export default function Cars() {
  // Sample/static data for cars
  const cars = [
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Valkoinen",
      license: "ZRO-681",
      company: "ZAPP Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Harmaa",
      license: "ZRO-681",
      company: "ZAPP Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Musta",
      license: "ZRO-681",
      company: "ZAPP Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Harmaa",
      license: "ZRO-681",
      company: "ZAPP Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Harmaa",
      license: "ZRO-681",
      company: "ZAPP Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Valkoinen",
      license: "ZRO-681",
      company: "ZAPP Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
  ];

  return (
    <div>
      <h1 className="text-h2 text-seabed-green mb-2 mt-5">Cars</h1>
      <div className="flex justify-between items-center mt-4 py-4">
        <div className="flex space-x-2">
          <button className="px-3 py-1  text-black-zapp rounded-full text-mid cursor-pointer">
            Kaikki{" "}
            <span className="ml-1 text-secondary rounded-full bg-card-background border-1 border-card-stroke px-3 py-1">
              {cars.length}
            </span>
          </button>
          <button className="px-3 py-1 text-black-zapp rounded-full text-mid cursor-pointer">
            ZAPP{" "}
            <span className="ml-1 text-secondary rounded-full bg-card-background border-1 border-card-stroke px-3 py-1">
              {cars.length - 1}
            </span>
          </button>
        </div>
      </div>

      {/* Cars Table */}
      <div className="overflow-x-auto border-t border-seperator-line">
        <table className="w-full text-left">
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className="border-b border-secondary">
                <td className="py-4 px-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      car.availability === "Saatavilla"
                        ? "bg-aqua-gem text-black-zapp"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {car.availability}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div>
                    <p className="text-black-zapp">{car.model}</p>
                    <p className="text-sm text-secondary">{car.color}</p>
                  </div>
                </td>
                <td className="py-4 px-2 text-black-zapp">{car.license}</td>
                <td className="py-4 px-2 text-black-zapp">{car.company}</td>
                <td className="py-4 px-2 text-black-zapp">{car.lastUpdate}</td>
                <td className="py-4 px-2">
                  <button className="px-3 py-2 bg-secondary text-white rounded-lg text-sm hover:bg-seabed-green cursor-pointer">
                    Muokkaa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
