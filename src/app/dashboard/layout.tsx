import { DashboardNavigation } from "@/components/DashboardNavigation";
import { UserWithoutPassword } from "@/types/user";

// Mock user data for demonstration purposes
const adminUser: UserWithoutPassword = {
  id: 1,
  email: "dwad@daw.fo",
  firstname: "Admin",
  lastname: "User",
  phone_number: "123456789",
  postnumber: "1234",
  address: "Admin Street 1",
  validated: true,
  role: "dealer",
  created_at: new Date().toISOString(),
};

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Main Content with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-65 bg-secondary text-primary p-4 relative">
          {/* Logo */}
          <div className="flex justify-center mt-6">
            <img src="/logo-zapp.png" alt="Logo" width="150" />
          </div>
          {/* Navigation */}
          <DashboardNavigation user={adminUser} />

          {/* User Profile / Logout */}
          <div className="absolute bottom-4 left-4 p-2">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-gray-500 rounded-full"></div>
              <div>
                <p className="text-base text-primary">Username</p>
                <button className="text-sm text-blue-400 hover:text-aqua-gem">
                  Log out
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-primary">{children}</main>
      </div>
    </div>
  );
}
