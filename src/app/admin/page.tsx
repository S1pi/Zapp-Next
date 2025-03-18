import React from "react";
import { redirect } from "next/navigation";

export default function Admin() {
  // Redirect to Live Dashboard by default
  redirect("/admin/live-dashboard");

  // Fallback content (will only show if redirect fails)
  return <div>Welcome to ZAPP Admin Dashboard</div>;
}