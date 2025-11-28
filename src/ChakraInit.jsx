import * as React from "react";
import { createContext, useState } from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import Controls from "./Controls";

export const SliderContext = createContext();

function ChakraInit() {
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

  return (
    <ChakraProvider>
      <SliderContext.Provider
        value={{
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
        }}
      >
        <Box w="calc(100% - 400px)" h="100%">
          <App />
        </Box>
        <Box minW="400px" bg="red.100">
          <Controls />
        </Box>
      </SliderContext.Provider>
    </ChakraProvider>
  );
}

export default ChakraInit;
