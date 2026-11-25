import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, LogOut } from "lucide-react";
import { navItems } from "../lib/navItems";
import { logout, getUser, saveUser } from "../lib/auth";
import { apiFetch } from "../lib/api";

export default function Topbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
   const [user, setUser] = useState(getUser());

  // Server se confirm karo ki login abhi bhi valid hai, aur latest naam le aao
  useEffect(() => {
    apiFetch("/api/auth/me/", { auth: true })
      .then((u) => {
        saveUser(u);
        setUser(u);
      })
      .catch(() => {});
  }, []);

  const displayName = user?.name || user?.email || "User";
  const initial = displayName.charAt(0).toUpperCase(); 

  const title = navItems.find((n) => n.to === pathname)?.label ?? "Dashboard";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-3">
      <div>
        <h1 className="text-2xl font-bold leading-tight text-[#0f1f3d]">{title}</h1>
        {pathname !== "/home" && (
          <p className="text-sm text-slate-500">
            <Link to="/home" className="hover:underline">Home</Link>
            <span className="mx-1">›</span>
            {title}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <label className="hidden w-80 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm md:flex">
          <input
            placeholder="Search for a district, state or indicator..."
            className="w-full bg-transparent outline-none placeholder:text-slate-400"
          />
          <Search size={18} className="text-slate-500" />
        </label>

        <button className="relative rounded-full p-2 hover:bg-slate-100" aria-label="Notifications">
          <Bell size={22} className="text-slate-600" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="relative">
          <button onClick={() => setOpen(!open)} className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
  {initial}
</span>
<span className="hidden text-sm font-semibold text-slate-800 sm:block">{displayName}</span>
 <ChevronDown size={18} className="text-slate-500" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50"
              >
                <LogOut size={16} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}