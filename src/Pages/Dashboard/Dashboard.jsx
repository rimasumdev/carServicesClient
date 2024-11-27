import { useState } from "react";
import {
  FaCalendarCheck,
  FaHistory,
  FaMoneyBillWave,
  FaUserCog,
  FaListAlt,
  FaTools,
  FaUsers,
  FaChartBar,
  FaUserTie,
  FaBars,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import Nav from "../Shared/Header/Nav";
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // TODO: Add authentication check and role management
  const isAdmin = true; // This should come from your auth context/state

  const menuItems = [
    {
      title: "My Bookings",
      icon: FaCalendarCheck,
      path: "/dashboard/my-bookings",
    },
    {
      title: "Service History",
      icon: FaHistory,
      path: "/dashboard/service-history",
    },
    {
      title: "Payment History",
      icon: FaMoneyBillWave,
      path: "/dashboard/payments",
    },
    {
      title: "Profile",
      icon: FaUserCog,
      path: "/dashboard/profile",
    },
  ];

  const adminMenuItems = [
    {
      title: "All Bookings",
      icon: FaListAlt,
      path: "/dashboard/all-bookings",
    },
    {
      title: "Service Management",
      icon: FaTools,
      path: "/dashboard/services",
    },
    {
      title: "Customer List",
      icon: FaUsers,
      path: "/dashboard/customers",
    },
    {
      title: "Reports & Analytics",
      icon: FaChartBar,
      path: "/dashboard/analytics",
    },
    {
      title: "Mechanic Management",
      icon: FaUserTie,
      path: "/dashboard/mechanics",
    },
  ];

  return (
    <div className="flex bg-base-100">
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-base-200 p-4 transition-transform duration-300 ease-in-out z-30
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:z-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo or Brand */}
          <div className="text-xl font-bold mb-6 text-center">Your Brand</div>

          {/* Menu Items */}
          <ul className="menu space-y-2 flex-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center gap-2 hover:bg-base-300 rounded-lg"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon /> {item.title}
                </Link>
              </li>
            ))}

            {isAdmin && (
              <>
                <div className="divider">Admin</div>
                {adminMenuItems.map((item, index) => (
                  <li key={`admin-${index}`}>
                    <Link
                      to={item.path}
                      className="flex items-center gap-2 hover:bg-base-300 rounded-lg"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon /> {item.title}
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation with Toggle Button */}
        <div className="sticky top-0 z-20 bg-base-100">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-base-200 rounded-lg lg:hidden"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <Nav />
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
