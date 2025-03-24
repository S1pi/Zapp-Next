"use client"; // Add this line at the top

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Sidebar menu items
const adminMenu = [
  { name: "Live Dashboard", href: "/admin/live-dashboard", icon: "🏠" },
  { name: "ZAPP-fleet", href: "/admin/zapp-fleet", icon: "⚡" },
  { name: "Cars", href: "/admin/cars", icon: "🚗" },
  { name: "Users", href: "/admin/users", icon: "👥" },
  { name: "Reservations", href: "/admin/reservations", icon: "📋" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-green-400">
      {/* Main Content with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-[#007f5f] text-white p-4">
          {/* Navigation */}
          <nav className="mt-60">
            <ul className="space-y-2">
              {adminMenu.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 text-[#093331] hover:text-[#1AF3CF] hover:shadow-lg hover:shadow-[#1AF3CF] ${
                      pathname === item.href ? "text-[#093331]" : ""
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile / Logout */}
          <div className="m-auto mt-60 p-4 border-t border-green-600">
            <div className="flex items-center space-x-3  ">
              <div className="w-8 h-8 bg-gray-500 rounded-full "></div>
              <div>
                <p className="text-sm text-white">Username</p>
                <button className="text-xs text-[#093331] hover:text-[#1AF3CF] ">
                  Log out
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
