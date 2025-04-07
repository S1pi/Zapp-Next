import React from "react";

export default function Reservations() {
  // Sample data for reservations
  const reservations = [
    {
      startTime: "18.3.2025 klo 19:32",
      endTime: "18.3.2025 klo 19:47",
      user: "Jani-Petteri Lindqvist",
      model: "Tesla Model Y",
      license: "ZRO-681",
      price: "10,50 €",
    },
    {
      startTime: "18.3.2025 klo 19:32",
      endTime: "18.3.2025 klo 19:47",
      user: "Jani-Petteri Lindqvist",
      model: "Tesla Model Y",
      license: "ZRO-681",
      price: "10,50 €",
    },
    {
      startTime: "18.3.2025 klo 19:32",
      endTime: "18.3.2025 klo 19:47",
      user: "Jani-Petteri Lindqvist",
      model: "Tesla Model Y",
      license: "ZRO-681",
      price: "10,50 €",
    },
    {
      startTime: "18.3.2025 klo 19:32",
      endTime: "18.3.2025 klo 19:47",
      user: "Jani-Petteri Lindqvist",
      model: "Tesla Model Y",
      license: "ZRO-681",
      price: "10,50 €",
    },
    {
      startTime: "18.3.2025 klo 19:32",
      endTime: "18.3.2025 klo 19:47",
      user: "Jani-Petteri Lindqvist",
      model: "Tesla Model Y",
      license: "ZRO-681",
      price: "10,50 €",
    },
  ];

  return (
    <div>
      <h1 className="text-h2 text-seabed-green mb-2 mt-5">Reservations</h1>
      <div className="flex justify-between items-center mt-4 py-4">
        <div className="flex space-x-2">
          <button className="  text-black-zapp rounded-full text-mid cursor-pointer">
            Kaikki{" "}
            <span className="ml-1 text-secondary rounded-full bg-card-background border-1 border-card-stroke px-3 py-1">
              {reservations.length}
            </span>
          </button>
          <button className="px-3 py-1  text-black-zapp rounded-full text-mid cursor-pointer">
            Viim. 7 päivää{" "}
            <span className="ml-1 text-secondary rounded-full bg-card-background border-1 border-card-stroke px-3 py-1">
              1
            </span>
          </button>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="overflow-x-auto border-t border-seperator-line pt-10">
        <table className="w-full text-left">
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index} className="border-b border-secondary">
                <td className="py-4 px-2">
                  <span className="px-3 py-1 bg-aqua-gem text-black-zapp rounded-lg text-sm">
                    {reservation.startTime}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <span className="px-3 py-1 bg-red-500 text-black-zapp rounded-lg text-sm">
                    {reservation.endTime}
                  </span>
                </td>
                <td className="py-4 px-2 text-black-zapp">
                  {reservation.user}
                </td>
                <td className="py-4 px-2 text-black-zapp">
                  {reservation.model}
                </td>
                <td className="py-4 px-2 text-black-zapp">
                  {reservation.license}
                </td>
                <td className="py-4 px-2 text-black-zapp">
                  {reservation.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
