import React from "react";
import { CarTable } from "./CarTable";
import { CategorySelectionNav } from "@/app/_components/CategorySelectionNav";

export const DealerCars = () => {
  return (
    <div className="flex flex-col gap-4">
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
            count: cars.length - 1,
          },
        ]}
        setSelectedView={setView}
      />

      <h1 className="text-2xl font-bold">Yrityksen autot</h1>
      <CarTable cars={cars} view={view} setView={setView} />
    </div>
  );
};
