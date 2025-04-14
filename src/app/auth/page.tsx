"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
  // This is a fallback page for authentication errors

  // Redirect to the login instantly
  useEffect(() => {
    redirect("/auth/login");
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-secondary p-8 rounded-2xl shadow-loginform">
      This page is fallback for authentication errors
    </div>
  );
}
