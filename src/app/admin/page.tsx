import React from "react";
import { redirect } from "next/navigation";

export default function Admin() {
  // Optionally redirect to Live Dashboard by default
  redirect("/admin/live-dashboard");

  return <div>Welcome to ZAPP Admin Dashboard</div>;
}