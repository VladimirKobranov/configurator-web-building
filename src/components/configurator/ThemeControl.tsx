import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Theme } from "@/contexts/configurator-context";

interface ThemeControlProps {
  theme: Theme;
  onChange: (theme: Theme) => void;
}

const nextTheme: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
};

const themeIcons = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

const themeLabels: Record<Theme, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

export default function ThemeControl({ theme, onChange }: ThemeControlProps) {
  const ThemeIcon = themeIcons[theme];
  const nextLabel = themeLabels[nextTheme[theme]];

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={`Theme: ${themeLabels[theme]}. Switch to ${nextLabel}`}
      title={`Theme: ${themeLabels[theme]} · Click for ${nextLabel}`}
      className="fixed bottom-4 right-4 z-20 size-10 rounded-full bg-background/95 shadow-lg backdrop-blur-md"
      onClick={() => onChange(nextTheme[theme])}
    >
      <ThemeIcon className="size-4" aria-hidden="true" />
    </Button>
  );
}
