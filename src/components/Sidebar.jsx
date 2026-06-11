import {
  LayoutDashboard,
  GitBranch,
  Boxes,
  GitCompare,
  FileText,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Sync",
      path: "/sync",
      icon: GitBranch,
    },
    {
      name: "Environments",
      path: "/environments",
      icon: Boxes,
    },
    {
      name: "Compare",
      path: "/compare",
      icon: GitCompare,
    },
    {
      name: "Logs",
      path: "/logs",
      icon: FileText,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-slate-200 shadow-sm">

      {/* Logo */}

      <div className="p-6 border-b border-slate-200">

        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          DevSync
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Auto Environment Sync Platform
        </p>

      </div>

      {/* Navigation */}

      <nav className="p-4 space-y-2">

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border border-blue-100 font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <Icon size={20} />

              <span>{link.name}</span>
            </NavLink>
          );
        })}

      </nav>



    </aside>
  );
}

export default Sidebar;