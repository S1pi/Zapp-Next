"use client";
import { useEffect, useState } from "react";
import { CarTable } from "./CarTable";
import { CategorySelectionNav } from "@/app/_components/CategorySelectionNav";
import { CarReturnType } from "@/types/cars";
import { getAllCars } from "@/actions/dashboardActions";

export const DealerCars = () => {
  const [view, setView] = useState("all");
  const [allCars, setAllCars] = useState<CarReturnType[]>([]);
  const [reservedCars, setReservedCars] = useState<CarReturnType[]>([]);
  const [availableCars, setAvailableCars] = useState<CarReturnType[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getAllCars();

        setAllCars(response);
        setReservedCars(response.filter((car) => car.is_reserved));
        setAvailableCars(response.filter((car) => !car.is_reserved));
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError(error as Error);
      }
    };

    fetchCars();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <CategorySelectionNav
        views={[
          {
            name: "all",
            title: "Kaikki",
            count: allCars.length,
          },
          {
            name: "available",
            title: "Vapaat",
            count: availableCars.length,
          },
          {
            name: "reserved",
            title: "Varatut",
            count: reservedCars.length,
          },
        ]}
        setSelectedView={setView}
      />

      <h1 className="text-2xl font-bold text-seabed-green pl-6">
        Yrityksen autot
      </h1>

      <div className="flex flex-col gap-4 max-h-full overflow-y-auto py-6">
        {view === "all" && <CarTable cars={allCars} />}
        {view === "available" && <CarTable cars={availableCars} />}
        {view === "reserved" && <CarTable cars={reservedCars} />}
      </div>
    </div>
  );
};
