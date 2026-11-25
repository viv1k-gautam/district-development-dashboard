import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import DistrictAnalysis from "./pages/DistrictAnalysis";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Login ke baad wale pages (sidebar + topbar ke saath) */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/district-analysis" element={<DistrictAnalysis />} />

          <Route path="/map" element={<Explore />} />
          <Route path="/compare" element={<Explore />} />
          <Route path="/indicators" element={<Explore />} />
          <Route path="/rankings" element={<Explore />} />
          <Route path="/ai-insights" element={<Explore />} />
          <Route path="/reports" element={<Explore />} />
          <Route path="/data-sources" element={<Explore />} />
          <Route path="/about" element={<Explore />} />
        </Route>

        {/* Koi bhi galat URL */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
