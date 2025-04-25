"use client";

import { useTransition } from "react";
import { DashboardNavigation } from "./DashboardNavigation";
import { useAdminSession } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { logOutUser } from "@/actions/authActions";

export const SideBar = () => {
  const { userSession } = useAdminSession(); // Assuming you have a user context to get the current user
  // const navigation = useNavigation(); // Assuming you have a navigation hook to get the current path
  const router = useRouter(); // Assuming you have a router hook to navigate
  const [pending, startTransition] = useTransition();

  if (!userSession) {
    // If user is not found, redirect to login page
    router.push("/auth/login");
    return null; // Render nothing while redirecting
  }

  console.log("UserSession in Sidebar:", userSession);

  return (
    <>
      {/* Sidebar */}
      <aside className="w-65 bg-secondary text-primary p-4 relative">
        {/* Logo */}
        <div className="flex justify-center mt-6">
          <img src="/logo-zapp.png" alt="Logo" width="150" />
        </div>
        {/* Navigation */}
        <DashboardNavigation user={userSession.user} />

        {/* User Profile / Logout */}
        <div className="absolute bottom-4 left-4 p-2">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gray-500 rounded-full"></div>
            <div>
              <p className="text-base text-primary">
                {userSession.user.firstname} {userSession.user.lastname}
              </p>
              <button
                disabled={pending}
                className="text-sm text-blue-400 hover:text-aqua-gem cursor-pointer"
                onClick={async () => {
                  startTransition(async () => {
                    await logOutUser(); // Call the logout action
                  });
                }}
              >
                {pending ? "Logging out..." : "Log out"}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
