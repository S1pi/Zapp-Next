"use client";

import { CategorySelectionNav } from "@/app/_components/CategorySelectionNav";
import { ReservationsTable } from "./components/ReservationsTable";
import { use, useEffect, useState } from "react";
import { ReservationReturnType } from "@/types/reservations";
import { getAllReservations } from "@/actions/dashboardActions";

export default function Reservations() {
  // Sample data for reservations
  // const reservations = [
  //   {
  //     startTime: "18.3.2025 klo 19:32",
  //     endTime: "18.3.2025 klo 19:47",
  //     user: "Jani-Petteri Lindqvist",
  //     model: "Tesla Model Y",
  //     license: "ZRO-681",
  //     price: "10,50 €",
  //   },
  //   {
  //     startTime: "18.3.2025 klo 19:32",
  //     endTime: "18.3.2025 klo 19:47",
  //     user: "Jani-Petteri Lindqvist",
  //     model: "Tesla Model Y",
  //     license: "ZRO-681",
  //     price: "10,50 €",
  //   },
  //   {
  //     startTime: "18.3.2025 klo 19:32",
  //     endTime: "18.3.2025 klo 19:47",
  //     user: "Jani-Petteri Lindqvist",
  //     model: "Tesla Model Y",
  //     license: "ZRO-681",
  //     price: "10,50 €",
  //   },
  //   {
  //     startTime: "18.3.2025 klo 19:32",
  //     endTime: "18.3.2025 klo 19:47",
  //     user: "Jani-Petteri Lindqvist",
  //     model: "Tesla Model Y",
  //     license: "ZRO-681",
  //     price: "10,50 €",
  //   },
  //   {
  //     startTime: "18.3.2025 klo 19:32",
  //     endTime: "18.3.2025 klo 19:47",
  //     user: "Jani-Petteri Lindqvist",
  //     model: "Tesla Model Y",
  //     license: "ZRO-681",
  //     price: "10,50 €",
  //   },
  // ];

  const [view, setView] = useState("all"); // State to hold the current view
  const [error, setError] = useState<Error | null>(null); // State to hold any error messages
  const [reservationsData, setReservationsData] = useState<
    ReservationReturnType[]
  >([]); // State to hold the reservations data

  const [last7days, setLast7days] = useState<ReservationReturnType[]>([]); // State to hold the last 7 days reservations

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getAllReservations(); // Fetch reservations data from the API

        console.log("Reservations data:", response); // Log the reservations data for debugging

        setReservationsData(response); // Set the reservations data state

        const currentDate = new Date(); // Get the current date
        const last7daysData = response.filter((reservation) => {
          const timeDiff =
            currentDate.getTime() - reservation.start_time.getTime(); // Calculate the time difference in milliseconds
          const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Convert the time difference to days
          return daysDiff <= 7; // Filter reservations that are within the last 7 days
        });
        setLast7days(last7daysData); // Set the last 7 days reservations state
      } catch (error) {
        setError(error as Error); // Set the error state if an error occurs
      }
    };

    fetchReservations(); // Call the fetch function to get reservations data
  }, []); // Empty dependency array means this effect runs once on mount

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <h2 className="text-h2 text-seabed-green mt-4 py-4">{error.message}</h2>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-h2 text-seabed-green mb-2 mt-5">Reservations</h1>
      <CategorySelectionNav
        views={[
          { name: "all", title: "Kaikki", count: reservationsData.length },
          {
            name: "last7days",
            title: "Viim. 7 päivää",
            count: last7days.length,
          },
        ]}
        setSelectedView={setView}
      />

      {/* Reservations Table */}

      {view === "all" && <ReservationsTable reservations={reservationsData} />}
      {/* {view === "last7days" && (
        <div className="flex justify-center items-center h-full">
          <h2 className="text-h2 text-seabed-green mt-4 py-4">
            Viim. 7 päivää ei varauksia
          </h2>
        </div>
      )} */}
      {view === "last7days" && <ReservationsTable reservations={last7days} />}
    </div>
  );
}
