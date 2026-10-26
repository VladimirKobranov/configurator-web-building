import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConfiguratorStore, type Theme } from "@/store/configurator-store";

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

export default function ThemeControl() {
  const theme = useConfiguratorStore((state) => state.theme);
  const setTheme = useConfiguratorStore((state) => state.setTheme);
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
      onClick={() => setTheme(nextTheme[theme])}
    >
      <ThemeIcon className="size-4" aria-hidden="true" />
    </Button>
  );
}
