import { NavLink } from "react-router-dom";
import { HeartPulse } from "lucide-react";
import { navItems } from "../lib/navItems";

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col bg-gradient-to-b from-[#0b1a33] to-[#0f2a52] text-slate-300 lg:flex">
      <div className="flex items-center gap-3 px-5 py-5">
        <HeartPulse size={40} strokeWidth={1.75} className="shrink-0 text-pink-400" />
        <div>
          <p className="text-xl font-bold leading-none text-white">DHDAD</p>
          <p className="mt-1 text-[11px] leading-tight text-slate-300">
            District Development Data Analytics Dashboard
          </p>
        </div>
      </div>

      <nav className="mt-2 flex-1 space-y-1 overflow-y-auto px-3">
        {navItems.map(({ to, label, icon: Icon, beta }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={20} strokeWidth={1.75} />
            <span>{label}</span>
            {beta && (
              <span className="rounded bg-blue-500/30 px-1.5 py-0.5 text-[10px] font-semibold text-blue-200">
                Beta
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <p className="px-6 pb-8 text-base italic leading-7 text-slate-400">"Better data for stronger districts."</p>
    </aside>
  );
}
