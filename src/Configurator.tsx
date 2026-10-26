import { useRef, useState } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { SliderContext, type DoorSide } from "./configurator-context";
import App from "./App";
import Controls from "./Controls";
import Footer from "./Footer";
import DebugPanel from "./DebugPanel";

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
  const [lightAzimuth, setLightAzimuth] = useState(293);
  const [lightHeight, setLightHeight] = useState(1.3);
  const [lightIntensity, setLightIntensity] = useState(2);
  const orbitControlsRef = useRef<OrbitControlsImpl | null>(null);

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
          <App orbitControlsRef={orbitControlsRef} />
        </div>
        {showDebugPanel && <DebugPanel orbitControlsRef={orbitControlsRef} />}
        <Controls
          open={controlsOpen}
          onToggle={() => setControlsOpen((open) => !open)}
        />
        <Footer />
      </main>
    </SliderContext.Provider>
  );
}
