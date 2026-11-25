import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Card from "../Card";
import { getBand } from "../../lib/scoreBands";

export default function KeyIndicators({ districtName, indicators }) {
  return (
    <Card
      title={`Key Indicators (${districtName})`}
      action={
        <Link to="/indicators" className="flex items-center text-sm font-medium text-blue-600 hover:underline">
          See All <ChevronRight size={16} />
        </Link>
      }
    >
      <ul className="divide-y divide-slate-100">
        {indicators.map(({ label, value, unit, score }) => {
          const band = getBand(score);
          return (
            <li key={label} className="grid grid-cols-[1fr_4.5rem_7rem] items-center gap-3 py-2.5 text-sm">
              <span className="text-slate-700">{label}</span>
              <span className="text-right leading-tight">
                <span className="font-semibold text-slate-900">
                  {value}{unit === "%" ? "%" : ""}
                </span>
                {unit !== "%" && (
                  <span className="block text-[10px] text-slate-500">({unit})</span>
                )}
              </span>
              <div className="h-2 rounded-full bg-slate-100">
                <div className={`h-2 rounded-full ${band.bar}`} style={{ width: `${score}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}