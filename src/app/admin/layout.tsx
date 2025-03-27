"use client"; // Add this line at the top

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Sidebar menu items
const adminMenu = [
  { name: "Live Dashboard", href: "/admin/live-dashboard", icon: "🏠" },
  // { name: "ZAPP-fleet", href: "/admin/zapp-fleet", icon: "⚡" },
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
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      {/* Main Content with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-65 bg-[var(--color-secondary)] text-[var(--color-primary)] p-4">
          {/* Logo */}
          <div className="flex justify-center mt-6">
            <img src="/logo-zapp.png" alt="Logo" width="150" />
          </div>
          {/* Navigation */}
          <nav className="mt-10">
            <ul className="space-y-2">
              {adminMenu.map((item) => (
                <li key={item.href}>
                 <Link
                href={item.href}
                className={`flex items-center p-2 text-[var(--color-seabed-green)] hover:text-[var(--color-aqua-gem)] hover:shadow-lg ${
                  pathname === item.href ? "text-[var(--color-seabed-green)]" : "text-[var(--color-black-zapp)]"
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
          <div className="m-auto mt-80 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
              <div>
                <p className="text-sm text-[var(--color-primary)]">Username</p>
                <button className="text-xs text-[var(--color-seabed-green)] hover:text-[var(--color-aqua-gem)]">
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
