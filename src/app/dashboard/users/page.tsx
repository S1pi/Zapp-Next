"use client";

import { getAllUsers } from "@/actions/dashboardActions";
import { CategorySelectionNav } from "@/app/_components/CategorySelectionNav";
import { Spinner } from "@/app/_components/Spinner";
import { UserList } from "@/app/_components/UserList";
import { UserModal } from "@/app/_components/UserModal";
import { useAdminSession } from "@/contexts/userContext";
import { UserWithoutPassword } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

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
      console.log("Fetched users:", response); // Log the fetched users
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
  }, [user, isAdmin, router, startTransition]);

  if (!user || !isAdmin || isPending) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-h2 text-seabed-green mb-2 mt-5">Users</h1>

      <CategorySelectionNav
        views={[
          {
            name: "all",
            title: "All",
            count: validatedUsers.length,
          },
          {
            name: "pending",
            title: "Pending Users",
            count: pendingUsers.length,
          },
          {
            name: "dealersAndAdmins",
            title: "Dealers & Admins",
            count: dealersAndAdmins.length,
          },
        ]}
        setSelectedView={setView}
      />

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
