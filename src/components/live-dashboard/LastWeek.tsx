"use client";
import { useAdminSession } from "@/contexts/userContext";
import DataCard from "../DataCard";
import { useEffect } from "react";

const adminCards = [
  { title: "Kaikki varaukset", value: "23" },
  { title: "Zapp-autojen varaukset", value: "12" },
  { title: "Liikevaihto", value: "98,69 €" },
  { title: "Varauksen keskihinta", value: "7,82 €" },
];

const userCards = [
  { title: "Varauksia", value: "23" },
  { title: "Liikevaihto", value: "98,69 €" },
  { title: "Varauksen keskihinta", value: "7,82 €" },
];

export const LastWeek = () => {
  const { userSession } = useAdminSession();
  const user = userSession?.user; // Get the user from the session
  const dealership = userSession?.dealership; // Get the dealership from the session

  useEffect(() => {
    // Perform any necessary side effects here

    const fetchLiveData = async () => {};
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="grid grid-cols-4 gap-8 mb-6 m-auto mr-4 sm:mr-8 md:mr-12 lg:mr-20 xl:mr-80">
      {user?.role === "admin"
        ? adminCards.map((card, index) => (
            <DataCard key={index} title={card.title} value={card.value} />
          ))
        : userCards.map((card, index) => (
            <DataCard key={index} title={card.title} value={card.value} />
          ))}
    </div>
  );
};
