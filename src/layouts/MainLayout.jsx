import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar />

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
}

export default MainLayout;