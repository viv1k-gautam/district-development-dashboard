import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { isLoggedIn, saveSession } from "../lib/auth";
import { apiFetch } from "../lib/api";
import {
  HeartPulse,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BarChart3,
  MapPinned,
  Users,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Data Driven",
    text: "Evidence-based insights",
  },
  {
    icon: MapPinned,
    title: "Interactive Maps",
    text: "Explore district data",
  },
  {
    icon: Users,
    title: "Better Healthcare",
    text: "For a stronger tomorrow",
  },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-6 w-6 shrink-0">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("login-scale");

    return () => {
      document.documentElement.classList.remove("login-scale");
    };
  }, []);

  if (isLoggedIn()) {
    return <Navigate to="/home" replace />;
  }

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your email/username and password.");
      return;
    }

    setLoading(true);
    try {
      const data = await apiFetch("/api/auth/login/", {
        method: "POST",
        body: { identifier: username.trim(), password },
      });
      saveSession(data, remember);
      navigate("/home", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#0b1a33] font-sans text-white">
      {/* Background image: public/login-bg.png */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${import.meta.env.BASE_URL}login-bg.png")`,
        }}
      />

      {/* Dark overlay for readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#07172f]/80 via-[#12345b]/55 to-[#0e5a6b]/35"
      />

      {/* Decorative India map: public/india-map.png */}
      <img
        src={`${import.meta.env.BASE_URL}india-map.png`}
        alt=""
        aria-hidden="true"
        draggable="false"
        className="pointer-events-none absolute left-[25%] top-[13%] z-0 hidden h-[55vh] max-h-[682px] w-auto object-contain opacity-60 drop-shadow-[0_0_20px_rgba(56,189,248,0.25)] xl:block"
      />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-[4vw]">
          <a href="/" className="flex items-center gap-3">
            <HeartPulse
              size={53}
              strokeWidth={1.7}
              className="shrink-0 text-pink-400 sm:h-14 sm:w-14"
            />

            <div>
              <p className="text-2xl font-bold leading-none sm:text-3xl">
                DHDAD
              </p>
              <p className="mt-1 max-w-[242px] text-xs leading-snug text-slate-200 sm:text-sm">
                District Health Development Analytics Dashboard
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-4 sm:flex">
            <span className="text-sm text-slate-200 sm:text-base">
              New here?
            </span>
            <button
              type="button"
             onClick={() => navigate("/signup")}
              className="rounded-xl border border-white/50 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10 sm:px-6 sm:py-3 sm:text-base"
            >
              Request Access
            </button>
          </div>
        </header>

        {/* Two-column layout */}
        <div className="grid flex-1 items-center gap-8 px-5 pb-8 pt-3 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(462px,594px)] lg:gap-12 lg:px-[4vw] lg:py-6 xl:grid-cols-[minmax(0,1fr)_616px]">
          {/* Left branding section */}
          <section className="hidden min-w-0 flex-col justify-between self-stretch py-8 lg:flex">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-200">
                District Health Intelligence
              </p>

              <h1 className="text-4xl font-bold leading-[1.2] xl:text-6xl">
                Data for
                <br />
                Healthier Districts,
                <br />
                <span className="bg-gradient-to-r from-sky-400 to-emerald-300 bg-clip-text text-transparent">
                  Stronger India
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-slate-100 xl:text-lg">
                Analyzing district-level health indicators for a healthier and
                more equitable India.
              </p>

              <ul className="mt-9 space-y-7">
                {features.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex items-center gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
                      <Icon
                        size={30}
                        strokeWidth={1.6}
                        className="text-emerald-100"
                      />
                    </div>

                    <div>
                      <p className="text-lg font-semibold">{title}</p>
                      <p className="mt-1 text-sm text-slate-300">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 max-w-sm">
              <div className="h-1 w-10 rounded-full bg-emerald-300" />
              <blockquote className="mt-5 text-lg italic leading-8 text-slate-100 xl:text-xl">
                “Healthy people, healthier districts, a stronger India.”
              </blockquote>
            </div>
          </section>

          {/* Login card */}
          <section className="mx-auto w-full max-w-[594px] rounded-[1.75rem] bg-white p-6 text-slate-800 shadow-2xl shadow-black/25 sm:p-9 lg:mx-0 lg:justify-self-end lg:p-10 xl:p-12">
            <div className="mb-7">
             

              <h2 className="text-3xl font-bold tracking-tight text-[#0f1f3d] sm:text-4xl">
                Welcome Back
              </h2>

              <div className="mt-3 h-1 w-16 rounded-full bg-emerald-500" />

              <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
                Login to access the District Health Development Analytics
                Dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email or Username
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3.5 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
                  <User size={23} className="shrink-0 text-slate-500" />

                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your email or username"
                    className="w-full min-w-0 bg-transparent text-base outline-none placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3.5 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
                  <Lock size={23} className="shrink-0 text-slate-500" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full min-w-0 bg-transparent text-base outline-none placeholder:text-slate-400"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="shrink-0 text-slate-500 transition hover:text-slate-800"
                  >
                    {showPassword ? (
                      <Eye size={23} />
                    ) : (
                      <EyeOff size={23} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember and forgot password */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-slate-700">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 accent-blue-600"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setError(
                      "Password reset is not configured yet. Please contact the administrator."
                    )
                  }
                  className="font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Error message */}
              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f1f3d] py-4 text-base font-semibold text-white transition hover:bg-[#16305c] focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
              >
                {loading ? "Signing in..." : "Log In"}
                {!loading && <ArrowRight size={20} />}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4 text-sm text-slate-400">
              <div className="h-px flex-1 bg-slate-200" />
              OR
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google button: UI only */}
            <button
              type="button"
              onClick={() =>
                setError("Google sign-in has not been configured yet.")
              }
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 py-3.5 text-base font-medium transition hover:bg-slate-50 sm:text-lg"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* Security information */}
            <div className="mt-7 flex items-start gap-4 rounded-xl border border-sky-100 bg-sky-50 p-4 sm:p-5">
              <ShieldCheck
                size={41}
                strokeWidth={1.6}
                className="shrink-0 text-emerald-500"
              />

              <div>
                <p className="text-sm font-semibold text-[#0f1f3d]">
                  Secure Access
                </p>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  This platform is intended for authorized academic, research,
                  and institutional use.
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
              District Health Development Analytics Dashboard
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
