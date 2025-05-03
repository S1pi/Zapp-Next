"use client";
import { CategorySelectionNav } from "@/app/_components/CategorySelectionNav";
import { CarTable } from "./CarTable";
import { useEffect, useState } from "react";

type AdminCarsProps = {};

export const AdminCars = () => {
  const cars = [
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Valkoinen",
      license: "ZRO-681",
      companyId: 1,
      company: "ZAPP Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Harmaa",
      license: "ZRO-681",
      companyId: 1,
      company: "ZAPP Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Musta",
      license: "ZRO-681",
      companyId: 1,
      company: "ZAPP Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Harmaa",
      license: "ZRO-681",
      companyId: 1,
      company: "ZAPP Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Harmaa",
      license: "ZRO-681",
      companyId: 1,
      company: "ZAPP Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Valkoinen",
      license: "ZRO-681",
      companyId: 1,
      company: "ZAPP Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Valkoinen",
      license: "ZRO-681",
      companyId: 2,
      company: "Random Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Valkoinen",
      license: "ZRO-681",
      companyId: 2,
      company: "Random Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Valkoinen",
      license: "ZRO-681",
      companyId: 2,
      company: "Random Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Valkoinen",
      license: "ZRO-681",
      companyId: 2,
      company: "Random Oy",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Valkoinen",
      license: "ZRO-681",
      companyId: 2,
      company: "Random Oy2",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Valkoinen",
      license: "ZRO-681",
      companyId: 2,
      company: "Random Oy2",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Valkoinen",
      license: "ZRO-681",
      companyId: 2,
      company: "Random Oy2",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Valkoinen",
      license: "ZRO-681",
      companyId: 2,
      company: "Random Oy2",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Valkoinen",
      license: "ZRO-681",
      companyId: 2,
      company: "Random Oy2",
      lastUpdate: "18.3.2025 klo 19:32",
    },
    {
      availability: "Saatavilla",
      model: "Tesla Model Y",
      color: "Valkoinen",
      license: "ZRO-681",
      companyId: 2,
      company: "Random Oy2",
      lastUpdate: "18.3.2025 klo 19:32",
    },
  ];

  const [view, setView] = useState("all"); // State to hold the current view (all, pending, etc.)
  const [allCars, setAllCars] = useState(cars); // State to hold all cars
  const [zappCars, setZappCars] = useState(cars); // State to hold ZAPP cars

  useEffect(() => {
    // Function to fetch all cars from the API
    // fetchAllCars(); // Fetch all cars when the component mounts or view changes
  }, []); // Effect to fetch all cars when the component mounts

  return (
    <div className="flex flex-col gap-4 max-h-full overflow-y-auto">
      <CategorySelectionNav
        views={[
          {
            name: "all",
            title: "Kaikki",
            count: cars.length,
          },
          {
            name: "zapp",
            title: "ZAPP",
            count: cars.filter((car) => car.companyId === 1).length,
          },
        ]}
        setSelectedView={setView}
      />
      <div className="flex flex-col gap-4 max-h-full overflow-y-auto py-6">
        {view === "all" && <CarTable cars={cars} />}
        {view === "zapp" && (
          <CarTable cars={cars.filter((car) => car.companyId === 1)} />
        )}
      </div>
    </div>
  );
};
