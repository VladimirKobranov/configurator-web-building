import { createContext, type Dispatch, type SetStateAction } from "react";

export type DoorSide = "Front" | "Back" | "Left" | "Right";
type StateSetter<T> = Dispatch<SetStateAction<T>>;

export interface ConfiguratorState {
  sliderValueX: number;
  setSliderValueX: StateSetter<number>;
  sliderValueY: number;
  setSliderValueY: StateSetter<number>;
  sliderValueZ: number;
  setSliderValueZ: StateSetter<number>;
  seed: number;
  setSeed: StateSetter<number>;
  doorSide: DoorSide;
  setDoorSide: StateSetter<DoorSide>;
  doorPosition: number;
  setDoorPosition: StateSetter<number>;
  rotateSpeed: number;
  setRotateSpeed: StateSetter<number>;
  balconyPosition: number[];
  setBalconyPosition: StateSetter<number[]>;
  balconySide: string[];
  setBalconySide: StateSetter<string[]>;
  pipeBool: boolean;
  setPipeBool: StateSetter<boolean>;
  airCondPercentage: number;
  setAirCondPercentage: StateSetter<number>;
  roofAccessoriesPercentage: number;
  setRoofAccessoriesPercentage: StateSetter<number>;
  balconyAccessoriesPercentage: number;
  setBalconyAccessoriesPercentage: StateSetter<number>;
  lightAzimuth: number;
  setLightAzimuth: StateSetter<number>;
  lightHeight: number;
  setLightHeight: StateSetter<number>;
  lightIntensity: number;
  setLightIntensity: StateSetter<number>;
}

export const SliderContext = createContext({} as ConfiguratorState);
