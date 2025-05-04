import stringifyDate from "@/lib/helpers";
import { ReservationReturnType } from "@/types/reservations";

type ReservationsTableProps = {
  reservations: ReservationReturnType[]; // Array of reservation objects
};

export const ReservationsTable = ({ reservations }: ReservationsTableProps) => {
  return (
    <div className="overflow-x-auto h-full px-4 pt-4">
      <table className="w-full text-left">
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index} className="border-b border-secondary">
              <td>
                <span className="px-3 py-1 text-black-zapp rounded-lg text-lg">
                  {reservation.dealership_name}
                </span>
              </td>
              <td className="py-4 px-2">
                <span className="px-3 py-1 bg-aqua-gem text-black-zapp rounded-lg text-sm">
                  {stringifyDate(reservation.start_time)}
                </span>
              </td>
              <td className="py-4 px-2">
                <span className="px-3 py-1 bg-red-500 text-black-zapp rounded-lg text-sm">
                  {stringifyDate(reservation.end_time)}
                </span>
              </td>
              <td className="py-4 px-2 text-black-zapp">
                {reservation.firstname} {reservation.lastname}
              </td>
              <td className="py-4 px-2 text-black-zapp">{reservation.model}</td>
              <td className="py-4 px-2 text-black-zapp">
                {reservation.license_plate}
              </td>
              <td className="py-4 px-2 text-black-zapp">{reservation.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
