import { redirect } from "next/navigation";

export default function Dashboard() {
  // Redirect to Live Dashboard by default
  redirect("/dashboard/live-dashboard");

  // Fallback content (will only show if redirect fails)
  return <div>Welcome to ZAPP Admin Dashboard</div>;
}
