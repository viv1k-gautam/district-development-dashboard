import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      <div className="lg:pl-60">
        <Topbar />
        <main className="p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}