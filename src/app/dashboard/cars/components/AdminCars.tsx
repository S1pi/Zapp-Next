"use client";
import { CategorySelectionNav } from "@/app/_components/CategorySelectionNav";
import { CarTable } from "./CarTable";
import { useEffect, useState } from "react";
import { getAllCars } from "@/actions/dashboardActions";
import { CarReturnType } from "@/types/cars";
import { AddCarModal } from "./AddCarModal";

export const AdminCars = () => {
  const [view, setView] = useState("all"); // State to hold the current view (all, pending, etc.)
  const [allCars, setAllCars] = useState<CarReturnType[]>([]); // State to hold all cars
  const [zappCars, setZappCars] = useState<CarReturnType[]>([]); // State to hold ZAPP cars
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

  const [error, setError] = useState<Error | null>(null); // State to hold any error messages

  useEffect(() => {
    // Function to fetch all cars from the API
    // fetchAllCars(); // Fetch all cars when the component mounts or view changes
    const fetchAllCars = async () => {
      try {
        const response = await getAllCars(); // Fetch all cars from the serverAction

        setAllCars(response); // Update the state with the fetched cars
        setZappCars(response.filter((car) => car.dealership_id === 1));
      } catch (error) {
        console.error("Error fetching cars:", error); // Log any errors to the console
        setError(error as Error); // Update the error state with the caught error
      }
    };

    fetchAllCars(); // Call the function to fetch all cars
  }, []); // Effect to fetch all cars when the component mounts

  if (error) {
    return (
      <div className="flex flex-col gap-4 max-h-full overflow-y-auto">
        <CategorySelectionNav
          views={[
            {
              name: "all",
              title: "Kaikki",
              count: allCars.length,
            },
            {
              name: "zapp",
              title: "ZAPP",
              count: zappCars.length,
            },
          ]}
          setSelectedView={setView}
        />
        <div className="flex flex-col gap-4 max-h-full overflow-y-auto pb-6">
          <p className="text-red-500">Error fetching cars: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-h-full overflow-y-auto">
      <CategorySelectionNav
        views={[
          {
            name: "all",
            title: "Kaikki",
            count: allCars.length,
          },
          {
            name: "zapp",
            title: "ZAPP",
            count: zappCars.length,
          },
        ]}
        setSelectedView={setView}
      />
      <button
        className="px-3 py-2 bg-secondary max-w-30 text-white rounded-lg text-sm hover:bg-seabed-green cursor-pointer"
        onClick={() => {
          setShowModal(true); // Show the modal
        }}
      >
        Add new car
      </button>
      <div className="flex flex-col gap-4 max-h-full overflow-y-auto pb-6">
        {view === "all" && <CarTable cars={allCars} />}
        {view === "zapp" && <CarTable cars={zappCars} />}
      </div>

      {showModal && <AddCarModal setShowModal={setShowModal} />}
    </div>
  );
};
