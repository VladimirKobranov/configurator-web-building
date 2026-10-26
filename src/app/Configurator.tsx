import { useEffect, useLayoutEffect, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import BuildingScene from "@/components/scene/BuildingScene";
import Controls from "@/components/configurator/Controls";
import Footer from "@/components/layout/Footer";
import DebugPanel from "@/components/configurator/DebugPanel";
import ThemeControl from "@/components/configurator/ThemeControl";
import {
  selectThemeIsDark,
  useConfiguratorStore,
  type Theme,
} from "@/store/configurator-store";

const THEME_STORAGE_KEY = "building-configurator-theme";

function readTheme(value: string | null): Theme {
  try {
    const theme = value ? JSON.parse(value)?.state?.theme : "system";
    return theme === "light" || theme === "dark" ? theme : "system";
  } catch {
    return "system";
  }
}

export default function Configurator() {
  const showDebugPanel =
    new URLSearchParams(window.location.search).get("dev") === "true";
  const orbitControlsRef = useRef<OrbitControlsImpl | null>(null);
  const isDark = useConfiguratorStore(selectThemeIsDark);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = () =>
      useConfiguratorStore.getState().setSystemDark(media.matches);
    updateSystemTheme();
    media.addEventListener("change", updateSystemTheme);
    return () => media.removeEventListener("change", updateSystemTheme);
  }, []);

  useEffect(() => {
    const syncStoredTheme = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      const theme = readTheme(event.newValue);
      if (useConfiguratorStore.getState().theme !== theme) {
        useConfiguratorStore.getState().setTheme(theme);
      }
    };
    window.addEventListener("storage", syncStoredTheme);
    return () => window.removeEventListener("storage", syncStoredTheme);
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.classList.toggle("light", !isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#171717" : "#ffffff");
    document
      .querySelector('meta[name="color-scheme"]')
      ?.setAttribute("content", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-background">
      <div className="absolute inset-0">
        <BuildingScene orbitControlsRef={orbitControlsRef} />
      </div>
      {showDebugPanel && <DebugPanel orbitControlsRef={orbitControlsRef} />}
      <Controls />
      <ThemeControl />
      <Footer />
    </main>
  );
}
