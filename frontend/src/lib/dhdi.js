// N_i = ((X - Xmin) / (Xmax - Xmin)) * 100   (higher is better)
// N_i = ((Xmax - X) / (Xmax - Xmin)) * 100   (lower is better)
export function normalize(x, min, max, direction = "higher") {
  if (x == null || max === min) return null; // missing data or zero range
  const n = ((x - min) / (max - min)) * 100;
  const value = direction === "higher" ? n : 100 - n;
  return Math.max(0, Math.min(100, value));
}

// Equal-weight DHDI = average of available category scores
export function dhdi(scores) {
  const valid = scores.filter((s) => s != null);
  if (valid.length === 0) return null;
  return valid.reduce((a, b) => a + b, 0) / valid.length;
}

// PLACEHOLDER thresholds. Final cut-offs go into docs/methodology.md.
export function getBand(score) {
  if (score == null)
    return { label: "No data", bar: "bg-slate-300", pill: "bg-slate-200 text-slate-600" };
  if (score >= 60)
    return { label: "Strong", bar: "bg-green-500", pill: "bg-green-200 text-green-900" };
  if (score >= 45)
    return { label: "Moderate", bar: "bg-amber-400", pill: "bg-amber-300 text-amber-900" };
  if (score >= 30)
    return { label: "Lower", bar: "bg-orange-500", pill: "bg-orange-200 text-orange-900" };
  return { label: "Needs improvement", bar: "bg-red-500", pill: "bg-red-200 text-red-900" };
}