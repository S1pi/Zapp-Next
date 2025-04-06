import React from "react";

export default function Cars() {
  // Sample/static data for cars
  const cars = [
    { availability: "Saatavilla", model: "Tesla Model Y", color: "Valkoinen", license: "ZRO-681", company: "ZAPP Oy", lastUpdate: "18.3.2025 klo 19:32" },
    { availability: "Saatavilla", model: "Tesla Model Y", color: "Harmaa", license: "ZRO-681", company: "ZAPP Oy", lastUpdate: "18.3.2025 klo 19:32" },
    { availability: "Saatavilla", model: "Tesla Model Y", color: "Musta", license: "ZRO-681", company: "ZAPP Oy", lastUpdate: "18.3.2025 klo 19:32" },
    { availability: "Saatavilla", model: "Tesla Model Y", color: "Harmaa", license: "ZRO-681", company: "ZAPP Oy", lastUpdate: "18.3.2025 klo 19:32" },
    { availability: "Saatavilla", model: "Tesla Model Y", color: "Harmaa", license: "ZRO-681", company: "ZAPP Oy", lastUpdate: "18.3.2025 klo 19:32" },
    { availability: "Saatavilla", model: "Tesla Model Y", color: "Valkoinen", license: "ZRO-681", company: "ZAPP Oy", lastUpdate: "18.3.2025 klo 19:32" },
  ];

  return (
    <div>
      <h1 className="text-h2 text-[var(--color-seabed-green)] mb-2 mt-5">Cars</h1>
      <div className="flex justify-between items-center mt-10 p-4 border-t border-[var(--color-seabed-green)]">
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-[var(--color-black-zapp)] rounded-full text-sm">
            Kaikki <span className="ml-1 bg-white text-[var(--color-black-zapp)] rounded-full px-2">{cars.length}</span>
          </button>
          <button className="px-3 py-1 text-[var(--color-black-zapp)] rounded-full text-sm">
            ZAPP <span className="ml-1 bg-white text-[var(--color-black-zapp)] rounded-full px-2">{cars.length - 1}</span>
          </button>
        </div>
      </div>

      {/* Cars Table */}
      <div className="overflow-x-auto border-t border-[var(--color-seabed-green)]">
        <table className="w-full text-left">
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-4 px-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      car.availability === "Saatavilla"
                        ? "bg-[var(--color-aqua-gem)] text-[var(--color-black-zapp)]"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {car.availability}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div>
                    <p className="text-[var(--color-black-zapp)]">{car.model}</p>
                    <p className="text-sm text-[var(--color-secondary)]">{car.color}</p>
                  </div>
                </td>
                <td className="py-4 px-2 text-[var(--color-black-zapp)]">{car.license}</td>
                <td className="py-4 px-2 text-[var(--color-black-zapp)]">{car.company}</td>
                <td className="py-4 px-2 text-[var(--color-black-zapp)]">{car.lastUpdate}</td>
                <td className="py-4 px-2">
                  <button className="px-3 py-1 bg-[var(--color-secondary)] text-white rounded-lg text-sm hover:bg-[var(--color-seabed-green)]">
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