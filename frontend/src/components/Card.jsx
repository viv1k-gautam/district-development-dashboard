export default function Card({ title, action, className = "", children }) {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}