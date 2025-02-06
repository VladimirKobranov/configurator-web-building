import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Divider,
  Heading,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SliderContext } from "./ChakraInit";
import Footer from "./Footer";

function Controls() {
  /* eslint-disable no-unused-vars */
  const { sliderValueX, setSliderValueX } = useContext(SliderContext);
  const { sliderValueY, setSliderValueY } = useContext(SliderContext);
  const { sliderValueZ, setSliderValueZ } = useContext(SliderContext);
  const { seed, setSeed } = useContext(SliderContext);

  const { rotateSpeed, setRotateSpeed } = useContext(SliderContext);

  const { doorSide, setDoorSide } = useContext(SliderContext);
  const { doorPosition, setDoorPosition } = useContext(SliderContext);
  const [selectedDoorSide, setSelectedDoorSide] = useState("Front");

  const { balconyPosition, setBalconyPosition } = useContext(SliderContext);
  const { balconySide, setBalconySide } = useContext(SliderContext);

  const { pipeBool, setPipeBool } = useContext(SliderContext);
  const { airCondBool, setAirCondBool } = useContext(SliderContext);
  const { airCondPercentage, setAirCondPercentage } = useContext(SliderContext);
  const { roofAccessoriesPercentage, setRoofAccessoriesPercentage } =
    useContext(SliderContext);
  const { roofAccessoriesBool, setRoofAccessoriesBool } =
    useContext(SliderContext);
  const { balconyAccessoriesPercentage, setBalconyAccessoriesPercentage } =
    useContext(SliderContext);
  const { balconyAccessoriesBool, setBalconyAccessoriesBool } =
    useContext(SliderContext);

  /* eslint-enable no-unused-vars, no-console */

  function onSliderChangeX(val) {
    setSliderValueX(val);
  }

  function onSliderChangeY(val) {
    setSliderValueY(val);
  }

  function onSliderChangeZ(val) {
    setSliderValueZ(val);
  }

  function onSliderChangeSeed(val) {
    setSeed(val);
  }

  function onSliderChangeDoorPosition(val) {
    setDoorPosition(val);
  }

  function onSliderChangeSpeed(val) {
    setRotateSpeed(val);
  }

  function onInputChangeBalconyPositions(val) {
    const parsedArray = val
      .split(",")
      .map((str) => parseInt(str.trim(), 10))
      .filter((num) => !isNaN(num));
    if (parsedArray.length === 0) {
      setBalconyPosition([1, 3]);
    } else {
      setBalconyPosition(parsedArray);
    }
  }

  function onCheckboxChangeBalconySide(checkboxValue, isChecked) {
    if (isChecked) {
      setBalconySide((prevBalconySides) => [
        ...prevBalconySides,
        checkboxValue,
      ]);
    } else {
      setBalconySide((prevBalconySides) =>
        prevBalconySides.filter((side) => side !== checkboxValue),
      );
    }
  }

  function onCheckboxChangePipes(isChecked) {
    if (isChecked) {
      setPipeBool(true);
    } else {
      setPipeBool(false);
    }
  }

  function onCheckboxChangeAirCond(isChecked) {
    if (isChecked) {
      setAirCondBool(true);
    } else {
      setAirCondBool(false);
    }
  }

  function onSliderChangeAirCondPercentage(val) {
    setAirCondPercentage(val);
  }

  function onCheckboxChangeRoofAccessories(isChecked) {
    if (isChecked) {
      setRoofAccessoriesBool(true);
    } else {
      setRoofAccessoriesBool(false);
    }
  }

  function onSliderChangeRoofAccessoriesPercentage(val) {
    setRoofAccessoriesPercentage(val);
  }

  function onCheckboxChangeBalconyAccessories(isChecked) {
    if (isChecked) {
      setBalconyAccessoriesBool(true);
    } else {
      setBalconyAccessoriesBool(false);
    }
  }

  function onSliderChangeBalconyAccessoriesPercentage(val) {
    setBalconyAccessoriesPercentage(val);
  }

  useEffect(() => {
    if (doorSide === "Front" || doorSide === "Back") {
      setSelectedDoorSide(sliderValueZ - 2);
    } else {
      setSelectedDoorSide(sliderValueX - 2);
    }
  }, [doorSide, sliderValueX, sliderValueZ]);

  return (
    <Box
      position="absolute"
      top="3%"
      right="0"
      width="20%"
      height="94vh"
      overflowY="auto"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      sx={{
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
    >
      <VStack w="90%" spacing={4} pb="60px">
        <Heading as="h3" size="lg" mb="10px">
          Configurator
        </Heading>

        <Box w="full" mb="10px">
          <Text align="center">Depth number: {sliderValueX}</Text>
          <Slider
            defaultValue={sliderValueX}
            min={0}
            max={12}
            step={1}
            onChangeEnd={(val) => onSliderChangeX(val)}
          >
            <SliderTrack bg="red.100">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>

          <Text align="center">Height number: {sliderValueY}</Text>
          <Slider
            defaultValue={sliderValueY}
            min={0}
            max={12}
            step={1}
            onChangeEnd={(val) => onSliderChangeY(val)}
          >
            <SliderTrack bg="red.100">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>

          <Text align="center">Width number: {sliderValueZ}</Text>
          <Slider
            defaultValue={sliderValueZ}
            min={0}
            max={12}
            step={1}
            onChangeEnd={(val) => onSliderChangeZ(val)}
          >
            <SliderTrack bg="red.100">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </Box>

        <Text fontSize="18px" fontWeight="600">
          Entrance door side:
        </Text>
        <RadioGroup onChange={setDoorSide} value={doorSide}>
          <Stack direction="row" spacing="20px">
            <Radio value="Front">Front</Radio>
            <Radio value="Back">Back</Radio>
            <Radio value="Left">Left</Radio>
            <Radio value="Right">Right</Radio>
          </Stack>
        </RadioGroup>

        <Text fontSize="18px" fontWeight="600">
          Door position: {doorPosition}
        </Text>
        <Slider
          defaultValue={doorPosition}
          min={1}
          max={
            doorSide === "Front" || doorSide === "Back"
              ? sliderValueZ - 2
              : sliderValueX - 2
          }
          step={1}
          onChangeEnd={(val) => onSliderChangeDoorPosition(val)}
        >
          <SliderTrack bg="red.100">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>

        <Text fontSize="18px" fontWeight="600">
          Balcony positions:
        </Text>
        <Input
          placeholder={`enter numbers with comma: ${balconyPosition.join(
            ", ",
          )}`}
          onBlur={(event) => onInputChangeBalconyPositions(event.target.value)}
        />

        <Text fontSize="18px" fontWeight="600">
          Balcony sides:
        </Text>
        <Stack direction="row">
          <Checkbox
            defaultChecked
            onChange={(event) =>
              onCheckboxChangeBalconySide("Front", event.target.checked)
            }
          >
            Front
          </Checkbox>
          <Checkbox
            defaultChecked
            onChange={(event) =>
              onCheckboxChangeBalconySide("Back", event.target.checked)
            }
          >
            Back
          </Checkbox>
          <Checkbox
            onChange={(event) =>
              onCheckboxChangeBalconySide("Left", event.target.checked)
            }
          >
            Left
          </Checkbox>
          <Checkbox
            onChange={(event) =>
              onCheckboxChangeBalconySide("Right", event.target.checked)
            }
          >
            Right
          </Checkbox>
        </Stack>

        <Text fontSize="18px" fontWeight="600">
          Accessories:
        </Text>
        <SimpleGrid columns={2} spacing={2}>
          <Checkbox
            defaultChecked
            onChange={(event) => onCheckboxChangePipes(event.target.checked)}
          >
            Flood pipes
          </Checkbox>
          <Checkbox
            defaultChecked
            onChange={(event) => onCheckboxChangeAirCond(event.target.checked)}
          >
            Air conditioners
          </Checkbox>
          <Checkbox
            defaultChecked
            onChange={(event) =>
              onCheckboxChangeRoofAccessories(event.target.checked)
            }
          >
            Roof stuff
          </Checkbox>
          <Checkbox
            defaultChecked
            onChange={(event) =>
              onCheckboxChangeBalconyAccessories(event.target.checked)
            }
          >
            Balcony gardens
          </Checkbox>
        </SimpleGrid>
        <Text fontSize="18px" fontWeight="600">
          Percentages:
        </Text>
        <Text>Air conditioners: {airCondPercentage}</Text>
        <Slider
          defaultValue={airCondPercentage}
          min={0}
          max={100}
          step={1}
          onChangeEnd={(val) => onSliderChangeAirCondPercentage(val)}
        >
          <SliderTrack bg="red.100">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
        <Text>Roof accessories: {roofAccessoriesPercentage}</Text>
        <Slider
          defaultValue={roofAccessoriesPercentage}
          min={0}
          max={100}
          step={1}
          onChangeEnd={(val) => onSliderChangeRoofAccessoriesPercentage(val)}
        >
          <SliderTrack bg="red.100">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
        <Text>Balcony accessories: {balconyAccessoriesPercentage}</Text>
        <Slider
          defaultValue={balconyAccessoriesPercentage}
          min={0}
          max={100}
          step={1}
          onChangeEnd={(val) => onSliderChangeBalconyAccessoriesPercentage(val)}
        >
          <SliderTrack bg="red.100">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>

        {/*aditional settings */}
        <Divider mb="20px" mt="20px" />

        <Heading as="h4" size="md">
          Additional settings:
        </Heading>

        <Text>Seed: {seed}</Text>
        <Slider
          defaultValue={seed}
          min={0}
          max={100}
          step={1}
          onChangeEnd={(val) => onSliderChangeSeed(val)}
        >
          <SliderTrack bg="red.100">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>

        <Text>Camera rotation speed: {rotateSpeed}</Text>
        <Slider
          defaultValue={rotateSpeed}
          min={0}
          max={5}
          step={0.1}
          onChangeEnd={(val) => onSliderChangeSpeed(val)}
        >
          <SliderTrack bg="red.100">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
      </VStack>
      <Footer />
    </Box>
  );
}

export default Controls;

