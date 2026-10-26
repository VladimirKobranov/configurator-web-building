import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
  SliderContext,
  type DoorSide,
  type Theme,
} from "@/contexts/configurator-context";
import BuildingScene from "@/components/scene/BuildingScene";
import Controls from "@/components/configurator/Controls";
import Footer from "@/components/layout/Footer";
import DebugPanel from "@/components/configurator/DebugPanel";
import ThemeControl from "@/components/configurator/ThemeControl";

const THEME_STORAGE_KEY = "building-configurator-theme";

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (!stored) return "system";
    const theme = JSON.parse(stored)?.state?.theme;
    return theme === "light" || theme === "dark" ? theme : "system";
  } catch {
    return "system";
  }
}

export default function Configurator() {
  const showDebugPanel =
    new URLSearchParams(window.location.search).get("dev") === "true";
  const [sliderValueX, setSliderValueX] = useState(5);
  const [sliderValueY, setSliderValueY] = useState(5);
  const [sliderValueZ, setSliderValueZ] = useState(8);
  const [seed, setSeed] = useState(50);
  const [doorSide, setDoorSide] = useState<DoorSide>("Front");
  const [doorPosition, setDoorPosition] = useState(2);
  const [balconyPosition, setBalconyPosition] = useState<number[]>([
    1, 3, 4, 6,
  ]);
  const [balconySide, setBalconySide] = useState<string[]>(["Front", "Back"]);
  const [pipeBool, setPipeBool] = useState(true);
  const [airCondPercentage, setAirCondPercentage] = useState(25);
  const [roofAccessoriesPercentage, setRoofAccessoriesPercentage] =
    useState(10);
  const [balconyAccessoriesPercentage, setBalconyAccessoriesPercentage] =
    useState(20);
  const [rotateSpeed, setRotateSpeed] = useState(0.2);
  const [controlsOpen, setControlsOpen] = useState(true);
  const [theme, setTheme] = useState<Theme>(readStoredTheme);
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const [lightAzimuth, setLightAzimuth] = useState(293);
  const [lightHeight, setLightHeight] = useState(1.3);
  const [lightIntensity, setLightIntensity] = useState(2);
  const orbitControlsRef = useRef<OrbitControlsImpl | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = () => setSystemDark(media.matches);
    media.addEventListener("change", updateSystemTheme);
    return () => media.removeEventListener("change", updateSystemTheme);
  }, []);

  useEffect(() => {
    const syncStoredTheme = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      setTheme(readStoredTheme());
    };
    window.addEventListener("storage", syncStoredTheme);
    return () => window.removeEventListener("storage", syncStoredTheme);
  }, []);

  useLayoutEffect(() => {
    const isDark = theme === "dark" || (theme === "system" && systemDark);
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

    try {
      if (theme === "system") {
        localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        localStorage.setItem(
          THEME_STORAGE_KEY,
          JSON.stringify({ state: { theme }, version: 0 }),
        );
      }
    } catch {
      // Theme still applies for this session when storage is unavailable.
    }
  }, [theme, systemDark]);

  const contextValue = {
    sliderValueX,
    setSliderValueX,
    sliderValueY,
    setSliderValueY,
    sliderValueZ,
    setSliderValueZ,
    seed,
    setSeed,
    doorSide,
    setDoorSide,
    doorPosition,
    setDoorPosition,
    rotateSpeed,
    setRotateSpeed,
    balconyPosition,
    setBalconyPosition,
    balconySide,
    setBalconySide,
    pipeBool,
    setPipeBool,
    airCondPercentage,
    setAirCondPercentage,
    roofAccessoriesPercentage,
    setRoofAccessoriesPercentage,
    balconyAccessoriesPercentage,
    setBalconyAccessoriesPercentage,
    theme,
    setTheme,
    systemDark,
    lightAzimuth,
    setLightAzimuth,
    lightHeight,
    setLightHeight,
    lightIntensity,
    setLightIntensity,
  };

  return (
    <SliderContext.Provider value={contextValue}>
      <main className="relative h-dvh w-full overflow-hidden bg-background">
        <div className="absolute inset-0">
          <BuildingScene orbitControlsRef={orbitControlsRef} />
        </div>
        {showDebugPanel && <DebugPanel orbitControlsRef={orbitControlsRef} />}
        <Controls
          open={controlsOpen}
          onToggle={() => setControlsOpen((open) => !open)}
        />
        <ThemeControl theme={theme} onChange={setTheme} />
        <Footer />
      </main>
    </SliderContext.Provider>
  );
}
