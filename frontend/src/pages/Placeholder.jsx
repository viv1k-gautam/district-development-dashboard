export default function Placeholder({ title }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">
        This page will be built in a later step.
      </p>
    </div>
  );
}