import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import SelectDropdown from "./SharedComponents/selectDropdown";
import { Activity, LayoutDashboard, Users, Settings, Bell, LogOut } from "lucide-react";
import { Button } from "./SharedComponents/button";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationModal } from "./modals/NotificationModal";
import { SupportIcons } from "./SupportIcons";

const Layout = () => {
  const [selectedUnit, setSelectedUnit] = useState("icu-1");
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const units = [
    { value: "icu-1", label: "ICU Unit A" },
    { value: "surgical-icu", label: "Surgical ICU" },
    { value: "nicu", label: "NICU" },
  ];

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen">
      <header className="glass-card-full-width fixed top-0 z-50 rounded-b-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-primary-glow bg-clip-text text-transparent">
                AINA
              </h1>
            </div>

            <nav className="hidden lg:flex items-center space-x-6">
              <Link to="/dashboard">
                <Button
                  variant={isActiveRoute("/dashboard") ? "default" : "ghost"}
                  className={`flex items-center space-x-2 ${isActiveRoute("/dashboard") ? "btn-medical-primary" : ""}`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Link to="/patients">
                <Button
                  variant={isActiveRoute("/patients") ? "default" : "ghost"}
                  className={`flex items-center space-x-2 ${isActiveRoute("/patients") ? "btn-medical-primary" : ""}`}
                >
                  <Users className="w-4 h-4" />
                  <span>My Patients</span>
                </Button>
              </Link>
            </nav>

            <nav className="lg:hidden flex items-center space-x-2">
              <Link to="/dashboard">
                <Button
                  variant={isActiveRoute("/dashboard") ? "default" : "ghost"}
                  size="icon"
                  title="Dashboard"
                  className={isActiveRoute("/dashboard") ? "btn-medical-primary" : ""}
                >
                  <LayoutDashboard className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/patients">
                <Button
                  variant={isActiveRoute("/patients") ? "default" : "ghost"}
                  size="icon"
                  title="My Patients"
                  className={isActiveRoute("/patients") ? "btn-medical-primary" : ""}
                >
                  <Users className="w-5 h-5" />
                </Button>
              </Link>
            </nav>

            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="hidden sm:block">
                <SelectDropdown
                  values={units}
                  value={selectedUnit}
                  onChange={setSelectedUnit}
                  placeholder="Select Unit"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                title="Notifications"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="w-5 h-5" />
              </Button>

              <Link to="/settings">
                <Button variant="ghost" size="icon" title="Settings">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>

              <ThemeToggle />
              <SupportIcons />

              {/* Logout */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/login")}
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pt-24">
        <Outlet />
      </main>

      <NotificationModal 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)} />
    </div>
  );
};

export default Layout;