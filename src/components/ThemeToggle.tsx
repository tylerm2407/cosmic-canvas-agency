import { useState, useEffect } from "react";
import { Palette } from "lucide-react";

export type ThemeKey = "purple" | "cyan" | "green" | "red" | "navy";

const themes: { key: ThemeKey; label: string }[] = [
  { key: "purple", label: "Purple" },
  { key: "cyan", label: "Cyan" },
  { key: "green", label: "Forest Green" },
  { key: "red", label: "Red" },
  { key: "navy", label: "Deep Navy" },
];

export const themeBackgroundColors: Record<ThemeKey, [string, string, string]> = {
  cyan: ["#87f0f7", "#2F4BC0", "#095271"],
  purple: ["#B19EEF", "#5227FF", "#FF9FFC"],
  green: ["#34d399", "#065f46", "#a7f3d0"],
  red: ["#f87171", "#991b1b", "#fca5a5"],
  navy: ["#60a5fa", "#1e3a8a", "#93c5fd"],
};

export function getActiveTheme(): ThemeKey {
  const stored = localStorage.getItem("theme-color");
  if (stored && stored in themeBackgroundColors) return stored as ThemeKey;
  return "purple";
}

function applyTheme(theme: ThemeKey) {
  localStorage.setItem("theme-color", theme);
  document.documentElement.setAttribute("data-theme", theme);
  window.dispatchEvent(new CustomEvent("theme-change", { detail: theme }));
}

export default function ThemeToggle() {
  const [current, setCurrent] = useState<ThemeKey>(getActiveTheme);

  useEffect(() => {
    applyTheme(current);
  }, [current]);

  // Apply on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", current);
  }, []);

  const cycle = () => {
    const idx = themes.findIndex((t) => t.key === current);
    const next = themes[(idx + 1) % themes.length];
    setCurrent(next.key);
  };

  return (
    <button
      onClick={cycle}
      className="flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      title={`Theme: ${themes.find((t) => t.key === current)?.label}`}
    >
      <Palette className="w-4 h-4" />
    </button>
  );
}
