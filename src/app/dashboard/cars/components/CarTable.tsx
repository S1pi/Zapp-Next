type CarTableProps = {
  cars: {
    availability: string;
    model: string;
    color: string;
    license: string;
    company: string;
    lastUpdate: string;
  }[];
};

export const CarTable = ({ cars }: CarTableProps) => {
  return (
    <div className="h-full px-4 pb-6">
      <table className="w-full min-w-max text-left">
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
  );
};
