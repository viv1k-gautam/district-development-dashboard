import { Link } from "react-router-dom";
import { Map as MapIcon, GitCompare, Download, Share2 } from "lucide-react";
import Card from "../Card";

const actions = [
  { label: "View on Map", icon: MapIcon, to: "/map" },
  { label: "Compare District", icon: GitCompare, to: "/compare" },
  { label: "Download Report", icon: Download },
  { label: "Share", icon: Share2 },
];

const style =
  "flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800";

export default function QuickActions() {
  return (
    <Card title="Quick Actions">
      <div className="space-y-2.5">
        {actions.map(({ label, icon: Icon, to }) =>
          to ? (
            <Link key={label} to={to} className={`${style} hover:bg-slate-100`}>
              <Icon size={18} className="text-blue-600" /> {label}
            </Link>
          ) : (
            <button key={label} type="button" title="Coming soon"
              className={`${style} cursor-not-allowed opacity-80`}>
              <Icon size={18} className="text-blue-600" /> {label}
            </button>
          )
        )}
      </div>
    </Card>
  );
}