import {
  MapPinned, Users, MapPin, LayoutGrid, Home as HomeIcon,
  Info, Trophy, BarChart3,
} from "lucide-react";
import Card from "../Card";
import { getBand } from "../../lib/scoreBands";

const statIcons = {
  population: Users,
  area: MapPin,
  blocks: LayoutGrid,
  villages: HomeIcon,
};

function RankTile({ icon: Icon, color, label, value }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3">
      <Icon size={26} className={color} />
      <div>
        <p className="text-[11px] text-slate-500">{label}</p>
        <p className="text-sm font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

export default function DistrictOverview({ district }) {
  const band = getBand(district.dhdi);

  return (
    <Card>
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* District map placeholder (asli map Phase 4 mein) */}
        <div className="hidden h-44 w-44 shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center text-xs text-slate-400 lg:flex">
          <MapPinned size={32} />
          <span>District map<br />(GeoJSON, Phase 4)</span>
        </div>

        {/* Name + stats */}
        <div className="min-w-0 flex-1">
          <h2 className="text-3xl font-bold text-slate-900">{district.name}</h2>
          <p className="mt-1 text-lg">
            <span className="font-medium text-blue-700">{district.state}</span>
            <span className="mx-3 text-slate-300">|</span>
            <span className="text-slate-600">District Code: {district.code}</span>
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">{district.description}</p>

          <div className="mt-4 grid grid-cols-2 gap-2 xl:grid-cols-4">
            {district.stats.map(({ key, label, value, note }) => {
              const Icon = statIcons[key];
              return (
                <div key={key} className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="text-sm font-bold text-slate-900">{value}</p>
                    {note && <p className="text-[10px] text-slate-400">{note}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DHDI + ranks */}
        <div className="w-full shrink-0 space-y-3 lg:w-72">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="flex items-center gap-2 font-semibold text-slate-800">
              DHDI Score <Info size={15} className="text-slate-400" />
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-5xl font-bold text-slate-900">{district.dhdi.toFixed(1)}</span>
              <span className={`rounded-md px-3 py-1 text-sm font-semibold ${band.badge}`}>
                {band.label}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <RankTile icon={Trophy} color="text-amber-500" label="State Rank"
              value={`${district.stateRank} / ${district.stateTotal}`} />
            <RankTile icon={BarChart3} color="text-blue-600" label="National Rank"
              value={`${district.nationalRank} / ${district.nationalTotal}`} />
          </div>
        </div>
      </div>
    </Card>
  );
}