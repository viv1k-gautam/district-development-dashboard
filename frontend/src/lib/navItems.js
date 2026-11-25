import {
  Home, Map as MapIcon, BarChart3, GitCompare, Activity,
  Trophy, Sparkles, FileText, Database, Info,
} from "lucide-react";

export const navItems = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/map", label: "Interactive Map", icon: MapIcon },
  { to: "/district-analysis", label: "District Analysis", icon: BarChart3 },
  { to: "/compare", label: "Compare Districts", icon: GitCompare },
  { to: "/indicators", label: "Health Indicators", icon: Activity },
  { to: "/rankings", label: "Rankings", icon: Trophy },
  { to: "/ai-insights", label: "AI Insights", icon: Sparkles, beta: true },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/data-sources", label: "Data Sources", icon: Database },
  { to: "/about", label: "About", icon: Info },
];