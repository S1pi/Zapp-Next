"use client";
import { useAdminSession } from "@/contexts/userContext";
import DataCard from "../DataCard";
import { useEffect, useState } from "react";
import { getLiveData } from "@/actions/dashboardActions";
import { AdminLiveData, DealerLiveData } from "@/types/dashboardData";

// const adminCards = [
//   { title: "Vapaita ZAPP-autoja", value: "7/8" },
//   { title: "Vapaita autoja", value: "10/11" },
//   { title: "Käyttäjiä", value: "1069" },
// ];

// const userCards = [
//   { title: "Vapaita autoja", value: "10/11" },
//   { title: "Huollossa olevia autoja", value: "2" },
//   { title: "Käyttäjiä", value: "1069" },
// ];
const skeletonCards = (titles: string[]) => {
  return titles.map((title) => ({
    title: title,
    value: "Loading...",
  }));
};

const adminCards = (data: AdminLiveData | null) => {
  if (!data)
    return skeletonCards([
      "Vapaita ZAPP-autoja",
      "Vapaita autoja",
      "Käyttäjiä",
      "Jälleenmyyjiä",
    ]);

  return [
    {
      title: "Vapaita ZAPP-autoja",
      value: `${data.available_company_cars}/${data.total_company_cars}`,
    },
    {
      title: "Vapaita autoja",
      value: `${data.available_cars}/${data.total_cars}`,
    },
    { title: "Käyttäjiä", value: data.total_users },
    { title: "Yrityksiä", value: data.total_dealerships },
  ];
};
const dealerCards = (data: DealerLiveData | null) => {
  if (!data)
    return skeletonCards([
      "Vapaita autoja",
      "Huollossa olevia autoja (hardcoded)",
      "Käyttäjiä",
    ]);

  return [
    {
      title: "Vapaita autoja",
      value: `${data.available_company_cars}/${data.total_company_cars}`,
    },
    // Hardcoded value for demo purposes
    { title: "Huollossa olevia autoja (hardcoded)", value: "2" },
    { title: "Käyttäjiä", value: data.total_users },
  ];
};

export const CurrentStatus = () => {
  const { userSession } = useAdminSession();
  const user = userSession?.user; // Get the user from the session

  const [data, setData] = useState<AdminLiveData | DealerLiveData | null>(null); // State to hold live data
  const [error, setError] = useState<Error | null>(null); // State to hold error message

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const response = await getLiveData();
        setData(response); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching live data:", error);
        setError(error as Error); // Update state with the error
      }
    };
    fetchLiveData(); // Call the function to fetch live data
    const id = setInterval(fetchLiveData, 30000); // Set an interval to fetch live data every 5 seconds

    return () => clearInterval(id); // Clear the timeout on component unmount
  }, []);

  const cards =
    user?.role === "admin"
      ? adminCards(data as AdminLiveData)
      : dealerCards(data as DealerLiveData);

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4">
        Error fetching live data: {error.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-8 mb-6 m-auto mr-4 sm:mr-8 md:mr-12 lg:mr-20 xl:mr-80">
      {/* <div className="grid grid-cols-4 gap-8 mb-6 m-auto mr-4"> */}
      {cards.map((card, index) => (
        <DataCard key={index} title={card.title} value={String(card.value)} />
      ))}

      {/* </div> */}
    </div>
  );
};
