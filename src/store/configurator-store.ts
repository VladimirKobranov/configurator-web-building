import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DoorSide = "Front" | "Back" | "Left" | "Right";
export type Theme = "system" | "light" | "dark";
export type Dimension = "x" | "y" | "z";

interface ConfiguratorStore {
  sliderValueX: number;
  sliderValueY: number;
  sliderValueZ: number;
  seed: number;
  doorSide: DoorSide;
  doorPosition: number;
  rotateSpeed: number;
  balconyPosition: number[];
  balconySide: DoorSide[];
  pipeBool: boolean;
  airCondPercentage: number;
  roofAccessoriesPercentage: number;
  balconyAccessoriesPercentage: number;
  theme: Theme;
  systemDark: boolean;
  lightAzimuth: number;
  lightHeight: number;
  lightIntensity: number;
  controlsOpen: boolean;
  setDimension: (dimension: Dimension, value: number) => void;
  setSeed: (value: number) => void;
  setDoorSide: (side: DoorSide) => void;
  setDoorPosition: (position: number) => void;
  setRotateSpeed: (value: number) => void;
  toggleBalconyPosition: (position: number) => void;
  setBalconySide: (sides: string[]) => void;
  setPipeBool: (value: boolean) => void;
  setAirCondPercentage: (value: number) => void;
  setRoofAccessoriesPercentage: (value: number) => void;
  setBalconyAccessoriesPercentage: (value: number) => void;
  setTheme: (theme: Theme) => void;
  setSystemDark: (value: boolean) => void;
  setLightAzimuth: (value: number) => void;
  setLightHeight: (value: number) => void;
  setLightIntensity: (value: number) => void;
  toggleControls: () => void;
}

const doorSides: DoorSide[] = ["Front", "Back", "Left", "Right"];

const getSystemDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const useConfiguratorStore = create<ConfiguratorStore>()(
  persist(
    (set, get) => ({
      sliderValueX: 5,
      sliderValueY: 5,
      sliderValueZ: 8,
      seed: 50,
      doorSide: "Front",
      doorPosition: 2,
      rotateSpeed: 0.2,
      balconyPosition: [1, 3, 4, 6],
      balconySide: ["Front", "Back"],
      pipeBool: true,
      airCondPercentage: 25,
      roofAccessoriesPercentage: 10,
      balconyAccessoriesPercentage: 20,
      theme: "system",
      systemDark: getSystemDark(),
      lightAzimuth: 293,
      lightHeight: 1.3,
      lightIntensity: 2,
      controlsOpen: true,
      setDimension: (dimension, value) =>
        set((state) => {
          const nextValue = Math.round(
            Math.min(12, Math.max(dimension === "y" ? 1 : 2, value)),
          );
          const sliderValueX =
            dimension === "x" ? nextValue : state.sliderValueX;
          const sliderValueY =
            dimension === "y" ? nextValue : state.sliderValueY;
          const sliderValueZ =
            dimension === "z" ? nextValue : state.sliderValueZ;
          const doorSideLength =
            state.doorSide === "Front" || state.doorSide === "Back"
              ? sliderValueZ
              : sliderValueX;
          const maxBalconyPosition = Math.max(
            1,
            Math.max(sliderValueX, sliderValueZ) - 2,
          );

          return {
            sliderValueX,
            sliderValueY,
            sliderValueZ,
            doorPosition: Math.min(
              state.doorPosition,
              Math.max(1, doorSideLength - 2),
            ),
            balconyPosition: state.balconyPosition.filter(
              (position) => position <= maxBalconyPosition,
            ),
          };
        }),
      setSeed: (seed) => set({ seed }),
      setDoorSide: (doorSide) =>
        set((state) => {
          const sideLength =
            doorSide === "Front" || doorSide === "Back"
              ? state.sliderValueZ
              : state.sliderValueX;
          return {
            doorSide,
            doorPosition: Math.min(
              state.doorPosition,
              Math.max(1, sideLength - 2),
            ),
          };
        }),
      setDoorPosition: (doorPosition) => set({ doorPosition }),
      setRotateSpeed: (rotateSpeed) => set({ rotateSpeed }),
      toggleBalconyPosition: (position) =>
        set((state) => ({
          balconyPosition: state.balconyPosition.includes(position)
            ? state.balconyPosition.filter((item) => item !== position)
            : [...state.balconyPosition, position].sort((a, b) => a - b),
        })),
      setBalconySide: (sides) =>
        set({
          balconySide: sides.filter((side): side is DoorSide =>
            doorSides.includes(side as DoorSide),
          ),
        }),
      setPipeBool: (pipeBool) => set({ pipeBool }),
      setAirCondPercentage: (airCondPercentage) => set({ airCondPercentage }),
      setRoofAccessoriesPercentage: (roofAccessoriesPercentage) =>
        set({ roofAccessoriesPercentage }),
      setBalconyAccessoriesPercentage: (balconyAccessoriesPercentage) =>
        set({ balconyAccessoriesPercentage }),
      setTheme: (theme) => set({ theme }),
      setSystemDark: (systemDark) => set({ systemDark }),
      setLightAzimuth: (lightAzimuth) => set({ lightAzimuth }),
      setLightHeight: (lightHeight) => set({ lightHeight }),
      setLightIntensity: (lightIntensity) => set({ lightIntensity }),
      toggleControls: () =>
        set((state) => ({ controlsOpen: !state.controlsOpen })),
    }),
    {
      name: "building-configurator-theme",
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);

export const selectThemeIsDark = (state: ConfiguratorStore) =>
  state.theme === "dark" || (state.theme === "system" && state.systemDark);
