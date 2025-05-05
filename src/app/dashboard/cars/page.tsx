import { AdminCars } from "./components/AdminCars";
import { getUserSession } from "@/actions/authActions";
import { redirect } from "next/navigation";
import { DealerCars } from "./components/DealerCars";

export default async function Cars() {
  // Sample/static data for cars
  // const [view, setView] = useState("all"); // State to hold the current view (all, pending, etc.)
  const userSession = await getUserSession(); // Get the user session

  if (!userSession) {
    // Redirect to login page if user session is not available
    redirect("/auth/login");
  }

  const user = userSession.user; // Get the user from the session

  return (
    <div className="flex flex-col max-h-screen">
      <h1 className="text-h2 text-seabed-green mb-2 mt-5">Cars</h1>

      {user.role === "admin" && <AdminCars />}
      {user.role === "dealer" && <DealerCars />}
    </div>
  );
}
