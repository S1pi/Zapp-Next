"use client";
import { useAdminSession } from "@/contexts/userContext";
import DataCard from "../DataCard";
import { useEffect, useState } from "react";
import { AdminLastWeekData, DealerLastWeekData } from "@/types/dashboardData";
import { set } from "react-hook-form";
import { getLastWeekData } from "@/actions/dashboardActions";

// const adminCards = [
//   { title: "Kaikki varaukset", value: "23" },
//   { title: "Zapp-autojen varaukset", value: "12" },
//   { title: "Liikevaihto", value: "98,69 €" },
//   { title: "Varauksen keskihinta", value: "7,82 €" },
// ];

// const userCards = [
//   { title: "Varauksia", value: "23" },
//   { title: "Liikevaihto", value: "98,69 €" },
//   { title: "Varauksen keskihinta", value: "7,82 €" },
// ];

const skeletonCards = (titles: string[]) => {
  return titles.map((title) => ({
    title: title,
    value: "Loading...",
  }));
};

const adminCards = (data: AdminLastWeekData | null) => {
  if (!data)
    return skeletonCards([
      "Kaikki varaukset",
      "Zapp-autojen varaukset",
      "Kokonaisliikevaihto",
      "Zapp-autojen liikevaihto",
      "Kaikkien varauksien keskihinta",
      "Zapp-autojen varauksien keskihinta",
    ]);

  return [
    {
      title: "Kaikki varaukset",
      value: data.all_reservations_count,
    },
    {
      title: "Zapp-autojen varaukset",
      value: data.company_reservations_count,
    },
    {
      title: "Kokonaisliikevaihto",
      value: `${data.total_revenue} €`,
    },
    {
      title: "Zapp-autojen liikevaihto",
      value: `${data.company_revenue} €`,
    },
    {
      title: "Kaikkien varauksien keskihinta",
      value: `${data.reservation_average_price} €`,
    },
    {
      title: "Zapp-autojen varauksien keskihinta",
      value: `${data.company_reservation_average_price} €`,
    },
  ];
};

const dealerCards = (data: DealerLastWeekData | null) => {
  if (!data)
    return skeletonCards(["Varaukset", "Liikevaihto", "Varauksen keskihinta"]);

  return [
    {
      title: "Varaukset",
      value: data.company_reservations_count,
    },
    {
      title: "Liikevaihto",
      value: `${data.company_revenue} €`,
    },
    {
      title: "Varauksen keskihinta",
      value: `${data.company_reservation_average_price} €`,
    },
  ];
};

export const LastWeek = () => {
  const { userSession } = useAdminSession();
  const user = userSession?.user; // Get the user from the session
  const dealership = userSession?.dealership; // Get the dealership from the session

  const [error, setError] = useState<Error | null>(null); // State to hold error
  const [data, setData] = useState<
    AdminLastWeekData | DealerLastWeekData | null
  >(null); // State to hold last week data

  useEffect(() => {
    const fetchLastWeekData = async () => {
      try {
        const response = await getLastWeekData();
        setData(response); // Update state with the fetched data
      } catch (err) {
        console.error("Error fetching last week data:", err);
        setError(err as Error); // Update state with the error
      }
    };
    fetchLastWeekData(); // Fetch data on component mount
    const id = setInterval(fetchLastWeekData, 30000); // Fetch data every 10 seconds
    return () => clearInterval(id); // Clear interval on component unmount
  }, []);

  return (
    <div className="grid grid-cols-4 gap-8 mb-6 m-auto mr-4 sm:mr-8 md:mr-12 lg:mr-20 xl:mr-80">
      {error && (
        <div className="text-red-500 text-center mt-4">
          Error fetching last week data: {error.message}
        </div>
      )}
      {user?.role === "admin" &&
        adminCards(data as AdminLastWeekData).map((card, index) => (
          <DataCard key={index} title={card.title} value={String(card.value)} />
        ))}
      {user?.role === "dealer" &&
        dealerCards(data as DealerLastWeekData).map((card, index) => (
          <DataCard key={index} title={card.title} value={String(card.value)} />
        ))}
    </div>
  );
};
