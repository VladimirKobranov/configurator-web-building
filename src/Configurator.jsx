import { useState } from "react";
import { SliderContext } from "./configurator-context";
import App from "./App";
import Controls from "./Controls";
import Footer from "./Footer";

export default function Configurator() {
  const [sliderValueX, setSliderValueX] = useState(5);
  const [sliderValueY, setSliderValueY] = useState(5);
  const [sliderValueZ, setSliderValueZ] = useState(8);
  const [seed, setSeed] = useState(50);
  const [doorSide, setDoorSide] = useState("Front");
  const [doorPosition, setDoorPosition] = useState(2);
  const [balconyPosition, setBalconyPosition] = useState([1, 3, 4, 6]);
  const [balconySide, setBalconySide] = useState(["Front", "Back"]);
  const [pipeBool, setPipeBool] = useState(true);
  const [airCondBool, setAirCondBool] = useState(true);
  const [airCondPercentage, setAirCondPercentage] = useState(25);
  const [roofAccessoriesBool, setRoofAccessoriesBool] = useState(true);
  const [roofAccessoriesPercentage, setRoofAccessoriesPercentage] =
    useState(10);
  const [balconyAccessoriesPercentage, setBalconyAccessoriesPercentage] =
    useState(20);
  const [balconyAccessoriesBool, setBalconyAccessoriesBool] = useState(true);
  const [rotateSpeed, setRotateSpeed] = useState(0.2);
  const [controlsOpen, setControlsOpen] = useState(true);

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
    airCondBool,
    setAirCondBool,
    airCondPercentage,
    setAirCondPercentage,
    roofAccessoriesBool,
    setRoofAccessoriesBool,
    roofAccessoriesPercentage,
    setRoofAccessoriesPercentage,
    balconyAccessoriesPercentage,
    setBalconyAccessoriesPercentage,
    balconyAccessoriesBool,
    setBalconyAccessoriesBool,
  };

  return (
    <SliderContext.Provider value={contextValue}>
      <main className="relative h-dvh w-full overflow-hidden bg-background">
        <div className="absolute inset-0">
          <App />
        </div>
        <Controls
          open={controlsOpen}
          onToggle={() => setControlsOpen((open) => !open)}
        />
        <Footer />
      </main>
    </SliderContext.Provider>
  );
}
