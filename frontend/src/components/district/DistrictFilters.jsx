import { ChevronsUpDown } from "lucide-react";

function Field({ label, value, onChange, options }) {
  return (
    <label className="relative block min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
      <span className="block text-xs text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-transparent pr-6 text-sm font-semibold text-slate-900 outline-none"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronsUpDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
      />
    </label>
  );
}

export default function DistrictFilters({ filters, values, onChange }) {
  return (
    <div className="grid max-w-4xl gap-3 sm:grid-cols-3">
      <Field label="State" value={values.state} options={filters.states}
        onChange={(v) => onChange("state", v)} />
      <Field label="District" value={values.district} options={filters.districts}
        onChange={(v) => onChange("district", v)} />
      <Field label="Reference Period" value={values.period} options={filters.periods}
        onChange={(v) => onChange("period", v)} />
    </div>
  );
}