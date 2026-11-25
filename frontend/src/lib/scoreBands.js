// PLACEHOLDER thresholds. Final bands ko docs/methodology.md mein document karna hai.
// Missing data (null) ko hamesha alag dikhana, 0 nahi.
export function getBand(score) {
  if (score == null)
    return { label: "No data", bar: "bg-slate-300", badge: "bg-slate-200 text-slate-700" };
  if (score >= 60)
    return { label: "Strong", bar: "bg-emerald-500", badge: "bg-emerald-200 text-emerald-900" };
  if (score >= 55)
    return { label: "Moderate", bar: "bg-amber-400", badge: "bg-amber-300 text-amber-900" };
  if (score >= 40)
    return { label: "Low", bar: "bg-orange-400", badge: "bg-orange-200 text-orange-900" };
  return { label: "Needs improvement", bar: "bg-red-500", badge: "bg-red-200 text-red-900" };
}