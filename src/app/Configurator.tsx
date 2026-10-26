import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  lazy,
  Suspense,
  useRef,
} from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import Footer from "@/components/layout/Footer";
import ThemeControl from "@/components/configurator/ThemeControl";
import {
  selectThemeIsDark,
  useConfiguratorStore,
  type Theme,
} from "@/store/configurator-store";

const THEME_STORAGE_KEY = "building-configurator-theme";

const BuildingScene = lazy(() => import("@/components/scene/BuildingScene"));
const Controls = lazy(() => import("@/components/configurator/Controls"));
const DebugPanel = lazy(() => import("@/components/configurator/DebugPanel"));

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
  const [loadingStarted, setLoadingStarted] = useState(false);
  const [uiReady, setUiReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const isDark = useConfiguratorStore(selectThemeIsDark);

  const handleSceneReady = useCallback(() => setSceneReady(true), []);

  useEffect(() => {
    setLoadingStarted(true);

    const controlsPromise = import("@/components/configurator/Controls");
    const debugPromise = showDebugPanel
      ? import("@/components/configurator/DebugPanel")
      : Promise.resolve();

    void Promise.all([controlsPromise, debugPromise]).then(() =>
      setUiReady(true),
    );
  }, [showDebugPanel]);

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
      {loadingStarted && (
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <BuildingScene
              orbitControlsRef={orbitControlsRef}
              onReady={handleSceneReady}
            />
          </Suspense>
        </div>
      )}
      {sceneReady && uiReady ? (
        <>
          <Suspense fallback={null}>
            {showDebugPanel && (
              <DebugPanel orbitControlsRef={orbitControlsRef} />
            )}
            <Controls />
          </Suspense>
        </>
      ) : (
        <div
          className="absolute inset-0 z-10 grid place-items-center bg-background"
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <span
              className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary"
              aria-hidden="true"
            />
            <span className="text-sm">Loading configurator…</span>
          </div>
        </div>
      )}
      <ThemeControl />
      <Footer />
    </main>
  );
}
