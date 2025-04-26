import { getCurrentUser, getUserSession } from "@/actions/authActions";
import { SideBar } from "@/components/SideBar";
import { UserSessionProvider } from "@/contexts/userContext";
import { redirect } from "next/navigation";

// Mock user data for demonstration purposes
// const adminUser: UserWithoutPassword = {
//   id: 1,
//   email: "dwad@daw.fo",
//   firstname: "Admin",
//   lastname: "User",
//   phone_number: "123456789",
//   postnumber: "1234",
//   address: "Admin Street 1",
//   validated: true,
//   role: "admin",
//   created_at: new Date().toISOString(),
// };

export default async function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSession = await getUserSession();
  if (!userSession) redirect("/auth/login");

  return (
    <UserSessionProvider initialSession={userSession}>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Main Content with Sidebar */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <SideBar />

          {/* Main Content Area */}
          <main className="flex-1 p-6 bg-primary">{children}</main>
        </div>
      </div>
    </UserSessionProvider>
  );
}
