import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  HeartPulse, User, Mail, Lock, Eye, EyeOff, ArrowRight,
} from "lucide-react";
import { isLoggedIn, saveSession } from "../lib/auth";
import { apiFetch } from "../lib/api";

function Field({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
      <Icon size={20} className="shrink-0 text-slate-500" />
      {children}
    </div>
  );
}

const inputClass =
  "w-full min-w-0 bg-transparent text-base outline-none placeholder:text-slate-400";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isLoggedIn()) return <Navigate to="/home" replace />;

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const data = await apiFetch("/api/auth/signup/", {
        method: "POST",
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        },
      });
      saveSession(data, true);
      navigate("/home", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#0b1a33] px-5 py-10 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 scale-110 bg-cover bg-center blur-sm"
        style={{ backgroundImage: "url('/static/frontend/login-bg.png')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#07172f]/80 via-[#12345b]/55 to-[#0e5a6b]/35"
      />

      <div className="w-full max-w-md">
        <Link to="/login" className="mb-6 flex items-center justify-center gap-3">
          <HeartPulse size={44} strokeWidth={1.7} className="text-pink-400" />
          <div>
            <p className="text-2xl font-bold leading-none">DHDAD</p>
            <p className="mt-1 text-xs text-slate-200">
              District Health Development Analytics Dashboard
            </p>
          </div>
        </Link>

        <section className="rounded-3xl bg-white p-8 text-slate-800 shadow-2xl shadow-black/25">
          <h1 className="text-3xl font-bold text-[#0f1f3d]">Create Account</h1>
          <div className="mt-3 h-1 w-16 rounded-full bg-emerald-500" />
          <p className="mt-4 text-sm text-slate-500">
            Register to access the District Health Development Analytics Dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Field icon={User}>
              <input
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={set("name")}
                placeholder="Full name"
                className={inputClass}
                required
              />
            </Field>

            <Field icon={Mail}>
              <input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                placeholder="Email"
                className={inputClass}
                required
              />
            </Field>

            <Field icon={Lock}>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={form.password}
                onChange={set("password")}
                placeholder="Password"
                className={inputClass}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="shrink-0 text-slate-500 hover:text-slate-800"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </Field>

            <Field icon={Lock}>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={form.confirm}
                onChange={set("confirm")}
                placeholder="Confirm password"
                className={inputClass}
                required
              />
            </Field>

            <p className="text-xs text-slate-400">
              At least 8 characters. Not too common, and not only numbers.
            </p>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f1f3d] py-3.5 text-base font-semibold text-white transition hover:bg-[#16305c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign Up"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
