import { Heart, Baby, Utensils, Stethoscope, Info } from "lucide-react";
import Card from "../Card";
import { getBand } from "../../lib/scoreBands";

const styles = {
  maternal: { icon: Heart, tile: "bg-rose-50", iconBox: "bg-rose-100 text-rose-500" },
  child: { icon: Baby, tile: "bg-sky-50", iconBox: "bg-sky-100 text-sky-600" },
  nutrition: { icon: Utensils, tile: "bg-orange-50", iconBox: "bg-orange-100 text-orange-500" },
  access: { icon: Stethoscope, tile: "bg-emerald-50", iconBox: "bg-emerald-100 text-emerald-600" },
};

export default function CategoryScores({ categories }) {
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          Health Category Scores <Info size={15} className="text-slate-400" />
        </span>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map(({ key, label, score }) => {
          const { icon: Icon, tile, iconBox } = styles[key];
          const band = getBand(score);
          return (
            <div key={key} className={`rounded-xl p-3 ${tile}`}>
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconBox}`}>
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-sm text-slate-700">{label}</p>
                  <p className="text-2xl font-bold text-slate-900">{score.toFixed(1)}</p>
                </div>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white">
                <div className={`h-2 rounded-full ${band.bar}`} style={{ width: `${score}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}