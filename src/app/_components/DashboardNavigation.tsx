"use client";

import { UserWithoutPassword } from "@/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHouse,
  FaCar,
  FaUsers,
  FaListUl,
  FaSquareParking,
} from "react-icons/fa6";

type DashboardNavigationProps = {
  user: Omit<UserWithoutPassword, "is_validated">;
};

// Define the navigation items for the admin dashboard
const adminMenu = [
  { name: "Live Dashboard", href: "/live-dashboard", icon: <FaHouse /> },
  { name: "Cars", href: "/cars", icon: <FaCar /> },
  { name: "Parking Zones", href: "/parkingzones", icon: <FaSquareParking /> },
  { name: "Users", href: "/users", icon: <FaUsers /> },
  { name: "Reservations", href: "/reservations", icon: <FaListUl /> },
];

// Define the navigation items for the dealer dashboard
const dealerMenu = [
  { name: "Live Dashboard", href: "/live-dashboard", icon: <FaHouse /> },
  { name: "Cars", href: "/cars", icon: <FaCar /> },
  { name: "Parking Zones", href: "/parkingzones", icon: <FaSquareParking /> },
  { name: "Reservations", href: "/reservations", icon: <FaListUl /> },
];

export function DashboardNavigation({ user }: DashboardNavigationProps) {
  const pathname = usePathname();

  console.log("user", user);
  console.log("pathname", pathname);

  return (
    <nav className="mt-10">
      <ul className="space-y-2">
        {user.role === "admin" &&
          adminMenu.map((item) => (
            <li key={item.href}>
              <Link
                href={"/dashboard" + item.href}
                className={`flex items-center p-2 hover:text-aqua-gem transition-all duration-200 ease-in-out
                  ${
                    pathname === "/dashboard" + item.href
                      ? "text-aqua-gem text-lg"
                      : "text-black-zapp"
                  }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}

        {user.role === "dealer" &&
          dealerMenu.map((item) => (
            <li key={item.href}>
              <Link
                href={"/dashboard" + item.href}
                className={`flex items-center p-2 hover:text-aqua-gem transition-all duration-200 ease-in-out
                  ${
                    pathname === "/dashboard" + item.href
                      ? "text-aqua-gem text-lg"
                      : "text-black-zapp"
                  }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
