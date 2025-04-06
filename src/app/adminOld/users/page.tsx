import React from "react";

export default function Users() {
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

  return (
    <div>
      <h1 className="text-h2 text-[var(--color-seabed-green)] mb-2 mt-5">Users</h1>
      <div className="flex justify-between items-center mt-10 p-4 border-t border-[var(--color-seabed-green)]">
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-[var(--color-black-zapp)] rounded-full text-sm">
            Kaikki <span className="ml-1 bg-white text-[var(--color-black-zapp)] rounded-full px-2">{users.length}</span>
          </button>
          <button className="px-3 py-1 text-[var(--color-black-zapp)] rounded-full text-sm">
            Odottaa hyväksyntää <span className="ml-1 bg-white text-[var(--color-black-zapp)] rounded-full px-2 ">0</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto border-t border-[var(--color-seabed-green)]">
        <table className="w-full text-left">
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-4 px-2 text-[var(--color-black-zapp)]">{user.name}</td>
                <td className="py-4 px-2 text-[var(--color-black-zapp)]">{user.phone}</td>
                <td className="py-4 px-2 text-[var(--color-black-zapp)]">{user.email}</td>
                <td className="py-4 px-2 text-[var(--color-black-zapp)]">{user.registered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}