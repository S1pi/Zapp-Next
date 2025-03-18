import React from "react";
import Link from "next/link";

const adminTabs = [
  { name: "Live Dashboard", href: "/admin/live-dashboard" },
  { name: "ZAPP-Fleet", href: "/admin/zapp-fleet" },
  { name: "Cars", href: "/admin/cars" },
  { name: "Users", href: "/admin/users" },
  { name: "Reservations", href: "/admin/reservations" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-green-400">
      {/* Navigation Tabs */}
      <nav className="bg-white shadow p-4">
        <ul className="flex space-x-6">
          {adminTabs.map((tab) => (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {tab.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Page Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}