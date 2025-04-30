"use client";

import { getAllUsers } from "@/actions/dashboardActions";
import { Spinner } from "@/components/Spinner";
import { UserList } from "@/components/UserList";
import { UserModal } from "@/components/UserModal";
import { useAdminSession } from "@/contexts/userContext";
import { UserWithoutPassword } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

// export const Spinner = () => {
//   return (
//     <div className="flex justify-center items-center h-full">
//       <div className="animate-spin rounded-full h-12 w-12 border-4 border-seperator-line border-t-seabed-green" />
//     </div>
//   );
// };

export default function Users() {
  // const { isAdmin } = useAuthentication();
  const { userSession } = useAdminSession();
  const isAdmin = userSession?.user.role === "admin"; // Check if the user is an admin
  const router = useRouter();
  const user = userSession?.user; // Get the user from the session

  const [isPending, startTransition] = useTransition();
  const [validatedUsers, setValidatedUsers] = useState<UserWithoutPassword[]>(
    []
  ); // State to hold users
  const [pendingUsers, setPendingUsers] = useState<UserWithoutPassword[]>([]); // State to hold pending users
  const [dealersAndAdmins, setDealersAndAdmin] = useState<
    UserWithoutPassword[]
  >([]); // State to hold dealers and

  const [view, setView] = useState("all"); // State to hold the current view (all, pending, etc.)
  const [selectedUser, setSelectedUser] = useState<UserWithoutPassword | null>(
    null
  ); // State to hold the selected user for the modal
  const [showUserDetails, setShowUserDetails] = useState(false); // State to control the visibility of the user details

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      const validatedUsers = response.filter((user) => user.is_validated);
      const pendingUsers = response.filter((user) => !user.is_validated);

      const dealersAndAdmins = response
        .filter((user) => user.role === "dealer" || user.role === "admin")
        .sort((a, b) => {
          const order: Record<string, number> = { dealer: 0, admin: 1 };
          return (order[a.role] || 0) - (order[b.role] || 0);
        });
      setDealersAndAdmin(dealersAndAdmins); // Set the dealers and admins state
      setValidatedUsers(validatedUsers); // Set the validated users state
      setPendingUsers(pendingUsers); // Set the pending users state

      // setUsers(response); // Set the users state with the fetched data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleValidation = () => {
    fetchUsers(); // Fetch users again after validation
  };

  useEffect(() => {
    if (!user || !isAdmin) {
      // navigointi tehdään “transitionina”
      startTransition(() => {
        router.push("/dashboard");
      });
    }

    // console.log("view", view);
    fetchUsers();
  }, [user, isAdmin, router, startTransition, view]);

  if (!user || !isAdmin || isPending) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-h2 text-seabed-green mb-2 mt-5">Users</h1>
      <div className="flex justify-between items-center mt-4 py-4">
        <div className="space-x-4 relative border-b-2 border-seperator-line w-full">
          <div className="flex">
            <button
              onClick={() => {
                setView("all");
              }}
              className="relative py-2 px-4 text-seabed-green text-lg cursor-pointer"
            >
              Kaikki{" "}
              <span className="ml-1 text-secondary rounded-full bg-card-background border-1 border-card-stroke px-3 py-1">
                {validatedUsers.length}
              </span>
              {view === "all" && (
                // bottom: calc(var(--spacing) * -0.5) /* -0.125rem = -2px */;
                <span className="absolute -bottom-[3px] left-0 w-full h-1 bg-aqua-gem" />
              )}
            </button>
            <button
              onClick={() => {
                setView("pending");
              }}
              className="relative py-2 px-4 text-seabed-green text-lg cursor-pointer"
            >
              Odottaa hyväksyntää{" "}
              <span className="ml-1 text-secondary rounded-full bg-card-background border-1 border-card-stroke px-3 py-1">
                {pendingUsers.length}
              </span>
              {view === "pending" && (
                <span className="absolute -bottom-[3px] left-0 w-full h-1 bg-aqua-gem" />
              )}
            </button>
            <button
              onClick={() => {
                setView("dealersAndAdmins");
              }}
              className="relative py-2 px-4 text-seabed-green text-lg cursor-pointer"
            >
              Dealers And Admins{" "}
              <span className="ml-1 text-secondary rounded-full bg-card-background border-1 border-card-stroke px-3 py-1">
                {dealersAndAdmins.length}
              </span>
              {view === "dealersAndAdmins" && (
                <span className="absolute -bottom-[3px] left-0 w-full h-1 bg-aqua-gem" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      {view === "pending" && (
        <UserList
          users={pendingUsers}
          setSelectedUser={setSelectedUser}
          setShowUser={setShowUserDetails}
        />
      )}
      {view === "all" && (
        <UserList
          users={validatedUsers}
          setSelectedUser={setSelectedUser}
          setShowUser={setShowUserDetails}
        />
      )}
      {view === "dealersAndAdmins" && (
        <UserList
          users={dealersAndAdmins}
          setSelectedUser={setSelectedUser}
          setShowUser={setShowUserDetails}
        />
      )}

      {/* User Details Modal */}

      {showUserDetails && (
        <UserModal
          user={selectedUser}
          setShowUser={setShowUserDetails}
          onSuccess={handleValidation}
        />
      )}
    </div>
  );
}
