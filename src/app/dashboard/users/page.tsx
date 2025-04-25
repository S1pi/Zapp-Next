"use client";

import { useAdminSession } from "@/contexts/userContext";
import { UserWithoutPassword } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

// Sample data for users
const users = [
  {
    name: "Jani-Petteri Lindqvist",
    phone: "+358 40 6920069",
    email: "jani-p@gmail.com",
    registered: "18.3.2025 15:37",
  },
  {
    name: "Aatu Kuokkanen",
    phone: "+358 40 6920069",
    email: "aatuk@gmail.com",
    registered: "18.3.2025 15:37",
  },
  {
    name: "Jan Schuravlev",
    phone: "+358 40 6920069",
    email: "janschv@gmail.com",
    registered: "18.3.2025 15:37",
  },
  {
    name: "Juha Kuusmaa-Teir",
    phone: "+358 40 6920069",
    email: "juha@hercules.fi",
    registered: "18.3.2025 15:37",
  },
  {
    name: "Jaakko Myyrä",
    phone: "+358 40 6920069",
    email: "jmyyra@gmail.com",
    registered: "18.3.2025 15:37",
  },
];

// mock user data for demonstration purposes
const adminUser: UserWithoutPassword = {
  id: 1,
  email: "dwad@daw.fo",
  firstname: "Admin",
  lastname: "User",
  phone_number: "123456789",
  postnumber: "1234",
  address: "Admin Street 1",
  validated: true,
  role: "admin",
  // role: "dealer",
  created_at: new Date().toISOString(),
};

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-seperator-line border-t-seabed-green" />
    </div>
  );
};

export default function Users() {
  const { userSession } = useAdminSession();
  const router = useRouter();

  const user = userSession?.user; // Replace with actual user data from context or props
  const isAdmin = user?.role === "admin"; // Check if the user is an admin

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!user || !isAdmin) {
      // navigointi tehdään “transitionina”
      startTransition(() => {
        router.push("/dashboard");
      });
    }
  }, [user, isAdmin, router, startTransition]);

  if (!user || !isAdmin || isPending) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-h2 text-seabed-green mb-2 mt-5">Users</h1>
      <div className="flex justify-between items-center mt-4 py-4">
        <div className="flex space-x-2">
          <button className=" text-black-zapp rounded-full text-mid cursor-pointer">
            Kaikki{" "}
            <span className="ml-1 text-secondary rounded-full bg-card-background border-1 border-card-stroke px-3 py-1">
              {users.length}
            </span>
          </button>
          <button className="px-3 text-black-zapp rounded-full text-mid cursor-pointer">
            Odottaa hyväksyntää{" "}
            <span className="ml-1 text-secondary rounded-full bg-card-background border-1 border-card-stroke px-3 py-1">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto border-t border-seperator-line">
        <table className="w-full text-left">
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b border-secondary">
                <td className="py-6 px-2 text-black-zapp">{user.name}</td>
                <td className="py-6 px-2 text-black-zapp">{user.phone}</td>
                <td className="py-6 px-2 text-black-zapp">{user.email}</td>
                <td className="py-6 px-2 text-black-zapp">{user.registered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
