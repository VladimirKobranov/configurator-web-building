import { Suspense, useContext, useEffect, useState, useCallback } from "react";
import type { MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  Environment,
  Html,
  OrbitControls,
  useProgress,
} from "@react-three/drei";
import { SliderContext } from "@/contexts/configurator-context";
import { Model } from "./Model";
import { MathUtils } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import seedRandom from "seedrandom";

type Vector3Tuple = [number, number, number];

interface GridItem {
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  meshType: string;
  pipeMeshType: string;
  aircondMeshType: string;
  roofAccessoriesMesh: string;
  balconyAccessoriesMesh: string;
}

interface AppProps {
  orbitControlsRef: MutableRefObject<OrbitControlsImpl | null>;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background/90 p-4 shadow-lg">
        <div
          className="grid size-16 place-items-center rounded-full"
          style={{
            background: `conic-gradient(var(--primary) ${progress}%, var(--muted) ${progress}%)`,
          }}
          role="progressbar"
          aria-label="Loading building model"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.floor(progress)}
        >
          <div className="grid size-12 place-items-center rounded-full bg-background text-xs font-semibold tabular-nums">
            {Math.floor(progress)}%
          </div>
        </div>
        <span className="text-xs text-muted-foreground">Loading…</span>
      </div>
    </Html>
  );
}

export default function App({ orbitControlsRef }: AppProps) {
  const [gridData, setGridData] = useState<GridItem[]>([]);
  const [boundsRevision, setBoundsRevision] = useState("");

  const xTile = 3.0;
  const yTile = 3.0;
  const zTile = 3.0;

  const { sliderValueX } = useContext(SliderContext);
  const { theme, systemDark } = useContext(SliderContext);
  const { sliderValueY } = useContext(SliderContext);
  const { sliderValueZ } = useContext(SliderContext);
  const { seed } = useContext(SliderContext);

  const { doorSide } = useContext(SliderContext);
  const { doorPosition } = useContext(SliderContext);
  const { balconyPosition } = useContext(SliderContext);
  const { balconySide } = useContext(SliderContext);

  const { pipeBool } = useContext(SliderContext);
  const { airCondPercentage } = useContext(SliderContext);
  const { roofAccessoriesPercentage } = useContext(SliderContext);
  const { balconyAccessoriesPercentage } = useContext(SliderContext);

  const { rotateSpeed } = useContext(SliderContext);
  const { lightAzimuth, lightHeight, lightIntensity } =
    useContext(SliderContext);

  const boundsKey = `${sliderValueX}-${sliderValueY}-${sliderValueZ}-${lightAzimuth}-${lightHeight}`;

  useEffect(() => {
    const timeout = window.setTimeout(() => setBoundsRevision(boundsKey), 180);
    return () => window.clearTimeout(timeout);
  }, [boundsKey]);

  const buildingHeight = sliderValueY * yTile;
  const footprintRadius = Math.hypot(
    (sliderValueX * xTile) / 2,
    (sliderValueZ * zTile) / 2,
  );
  const safeLightHeight = Math.max(lightHeight, 0.5);
  const shadowMargin = 16;
  const groundExtent =
    footprintRadius + buildingHeight / safeLightHeight + shadowMargin;
  const lightAngle = MathUtils.degToRad(lightAzimuth);
  const shadowTravel = (buildingHeight + 3) / safeLightHeight;
  const shadowOffsetX = -Math.sin(lightAngle) * shadowTravel;
  const shadowOffsetZ = -Math.cos(lightAngle) * shadowTravel;
  // The camera frame includes the building and the full projected shadow, but
  // stays centered on the building so the settings panel does not cover it.
  const shadowBoundsWidth =
    sliderValueX * xTile + Math.abs(shadowOffsetX) * 2 + 8;
  const shadowBoundsDepth =
    sliderValueZ * zTile + Math.abs(shadowOffsetZ) * 2 + 8;
  // Keep the receiving plane large enough for the tallest building's shadow.
  // The directional shadow camera has its own world-space bounds below.
  const shadowExtent = Math.max(
    24,
    Math.SQRT2 * groundExtent + buildingHeight + 8,
  );
  const lightDistance = Math.max(15, buildingHeight);
  // Bound the light-camera depth by the complete scene volume. The previous
  // fixed multiple of lightDistance could clip the far edge of the shadow
  // when the building was tall or the light was low.
  const lightPositionLength = Math.hypot(
    lightDistance,
    lightHeight * lightDistance,
  );
  const sceneRadius = Math.hypot(Math.SQRT2 * groundExtent, buildingHeight + 3);
  const shadowCameraFar = lightPositionLength + sceneRadius + 10;

  const generateGrid = useCallback(() => {
    const gridData: GridItem[] = [];

    for (let x = 0.0; x < sliderValueX; x++) {
      for (let y = 0.0; y < sliderValueY + 1; y++) {
        for (let z = 0.0; z < sliderValueZ; z++) {
          const position: Vector3Tuple = [
            x * xTile - ((sliderValueX - 1) * xTile) / 2,
            y * yTile, //- yTile / 2
            z * zTile - ((sliderValueZ - 1) * zTile) / 2,
          ];
          if (sliderValueX === 1 || sliderValueY === 0 || sliderValueZ === 1)
            break;
          // Each feature has its own draw, so changing one setting cannot
          // shift the random choices for other cells or features.
          const randomFor = (feature: string) =>
            seedRandom(`${seed}:${x}:${y}:${z}:${feature}`)();
          let angleX = MathUtils.degToRad(0);
          let angleY = MathUtils.degToRad(0);
          let angleZ = MathUtils.degToRad(0);
          let mesh = "null";
          let pipeMesh = "null";
          let aircondMesh = "null";
          let roofAccessoriesMesh = "null";
          let balconyAccessoriesMesh = "null";

          // main floor
          if (x === 0 || x === sliderValueX - 1) {
            if (x === 0) {
              angleY = MathUtils.degToRad(180); //Front facade
              if (z === 0 || z === sliderValueZ - 1) {
                if (y === sliderValueY) {
                  mesh = "Ceiling_corner";
                  if (z !== sliderValueZ - 1 && pipeBool) {
                    pipeMesh = "Pipe_2";
                  }
                } else if (y === 0) {
                  mesh = "Corner";
                  if (z !== sliderValueZ - 1 && pipeBool) {
                    pipeMesh = "Pipe_1";
                  }
                } else {
                  mesh = "Corner";
                  if (z !== sliderValueZ - 1 && pipeBool) {
                    pipeMesh = "Pipe_0";
                  }
                }
                z === sliderValueZ - 1
                  ? (angleY = MathUtils.degToRad(270))
                  : (angleY = MathUtils.degToRad(180));
              } else {
                if (y === sliderValueY) {
                  mesh = "Ceiling";
                } else if (
                  y === 0 &&
                  doorSide === "Front" &&
                  z === doorPosition
                ) {
                  mesh = "Door_0";
                } else {
                  if (
                    y !== 0 &&
                    balconyPosition.includes(z) &&
                    balconySide.includes("Front")
                  ) {
                    mesh = `Window_balcony_${Math.floor(randomFor("balcony-window") * 7)}`;
                    if (
                      randomFor("balcony-accessory-chance") * 100 <
                      balconyAccessoriesPercentage
                    ) {
                      balconyAccessoriesMesh = `BalconyAccessories_${Math.floor(
                        randomFor("balcony-accessory-variant") * 5,
                      )}`;
                    }
                  } else {
                    mesh = `Window_${Math.floor(randomFor("window") * 3)}`;
                    if (
                      y !== 0 &&
                      randomFor("air-conditioner-chance") * 100 <
                        airCondPercentage
                    ) {
                      aircondMesh = `AirCond_${Math.floor(randomFor("air-conditioner-variant") * 3)}`;
                    }
                  }
                }
              }
            } else {
              angleY = MathUtils.degToRad(0); //Back facade
              if (z === 0 || z === sliderValueZ - 1) {
                if (y === sliderValueY) {
                  mesh = "Ceiling_corner";
                  if (z !== 0 && pipeBool) {
                    pipeMesh = "Pipe_2";
                  }
                } else if (y === 0) {
                  mesh = "Corner";
                  if (z !== 0 && pipeBool) {
                    pipeMesh = "Pipe_1";
                  }
                } else {
                  mesh = "Corner";
                  if (z !== 0 && pipeBool) {
                    pipeMesh = "Pipe_0";
                  }
                }
                z === sliderValueZ - 1
                  ? (angleY = MathUtils.degToRad(0))
                  : (angleY = MathUtils.degToRad(90));
              } else if (y === 0 && doorSide === "Back" && z === doorPosition) {
                mesh = "Door_0";
              } else {
                if (y === sliderValueY) {
                  mesh = "Ceiling";
                } else {
                  if (
                    y !== 0 &&
                    balconyPosition.includes(z) &&
                    balconySide.includes("Back")
                  ) {
                    mesh = `Window_balcony_${Math.floor(randomFor("balcony-window") * 7)}`;
                    if (
                      randomFor("balcony-accessory-chance") * 100 <
                      balconyAccessoriesPercentage
                    ) {
                      balconyAccessoriesMesh = `BalconyAccessories_${Math.floor(
                        randomFor("balcony-accessory-variant") * 5,
                      )}`;
                    }
                  } else {
                    mesh = `Window_${Math.floor(randomFor("window") * 3)}`;
                    if (
                      y !== 0 &&
                      randomFor("air-conditioner-chance") * 100 <
                        airCondPercentage
                    ) {
                      aircondMesh = `AirCond_${Math.floor(randomFor("air-conditioner-variant") * 3)}`;
                    }
                  }
                }
              }
            }
          } else if (z === 0) {
            angleY = MathUtils.degToRad(90); //Left facade
            if (y === sliderValueY) {
              mesh = "Ceiling";
            } else if (y === 0 && doorSide === "Left" && x === doorPosition) {
              mesh = "Door_0";
            } else {
              if (
                y !== 0 &&
                balconyPosition.includes(x) &&
                balconySide.includes("Left")
              ) {
                mesh = `Window_balcony_${Math.floor(randomFor("balcony-window") * 7)}`;
                if (
                  randomFor("balcony-accessory-chance") * 100 <
                  balconyAccessoriesPercentage
                ) {
                  balconyAccessoriesMesh = `BalconyAccessories_${Math.floor(
                    randomFor("balcony-accessory-variant") * 5,
                  )}`;
                }
              } else {
                mesh = `Window_${Math.floor(randomFor("window") * 3)}`;
                if (
                  y !== 0 &&
                  randomFor("air-conditioner-chance") * 100 < airCondPercentage
                ) {
                  aircondMesh = `AirCond_${Math.floor(randomFor("air-conditioner-variant") * 3)}`;
                }
              }
            }
          } else if (z === sliderValueZ - 1) {
            angleY = MathUtils.degToRad(270); //Right facade
            if (y === sliderValueY) {
              mesh = "Ceiling";
            } else if (y === 0 && doorSide === "Right" && x === doorPosition) {
              mesh = "Door_0";
            } else {
              if (
                y !== 0 &&
                balconyPosition.includes(x) &&
                balconySide.includes("Right")
              ) {
                mesh = `Window_balcony_${Math.floor(randomFor("balcony-window") * 7)}`;
                if (
                  randomFor("balcony-accessory-chance") * 100 <
                  balconyAccessoriesPercentage
                ) {
                  balconyAccessoriesMesh = `BalconyAccessories_${Math.floor(
                    randomFor("balcony-accessory-variant") * 5,
                  )}`;
                }
              } else {
                mesh = `Window_${Math.floor(randomFor("window") * 3)}`;
                if (
                  y !== 0 &&
                  randomFor("air-conditioner-chance") * 100 < airCondPercentage
                ) {
                  aircondMesh = `AirCond_${Math.floor(randomFor("air-conditioner-variant") * 3)}`;
                }
              }
            }
          } else {
            // Roof cap
            if (y === sliderValueY) {
              mesh = "Ceiling_cap";
              if (
                randomFor("roof-accessory-chance") * 100 <
                roofAccessoriesPercentage
              ) {
                roofAccessoriesMesh = `RoofAccessories_${Math.floor(
                  randomFor("roof-accessory-variant") * 4,
                )}`;
              }
            } else {
              mesh = "null";
            }
          }

          const rotation: Vector3Tuple = [angleX, angleY, angleZ];
          const gridItem = {
            position: position,
            rotation: rotation,
            meshType: mesh,
            pipeMeshType: pipeMesh,
            aircondMeshType: aircondMesh,
            roofAccessoriesMesh: roofAccessoriesMesh,
            balconyAccessoriesMesh: balconyAccessoriesMesh,
          };

          gridData.push(gridItem);
        }
      }
    }
    setGridData(gridData);
    //console.log("grid data: ", gridData);
  }, [
    sliderValueX,
    sliderValueY,
    sliderValueZ,
    doorSide,
    doorPosition,
    balconyPosition,
    balconySide,
    pipeBool,
    airCondPercentage,
    seed,
    roofAccessoriesPercentage,
    balconyAccessoriesPercentage,
    xTile,
    yTile,
    zTile,
  ]);

  useEffect(() => {
    generateGrid();
  }, [
    sliderValueX,
    sliderValueY,
    sliderValueZ,
    doorSide,
    doorPosition,
    balconyPosition,
    balconySide,
    pipeBool,
    airCondPercentage,
    roofAccessoriesPercentage,
    balconyAccessoriesPercentage,
    generateGrid,
  ]);

  return (
    <Canvas
      shadows="soft"
      camera={{
        position: [-56.703, 28.98, -49.734],
        fov: 30,
      }}
    >
      <Suspense fallback={<Loader />}>
        <color
          attach="background"
          args={[
            theme === "dark" || (theme === "system" && systemDark)
              ? "#171717"
              : "#ececec",
          ]}
        />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[
            Math.sin(MathUtils.degToRad(lightAzimuth)) * lightDistance,
            lightHeight * lightDistance,
            Math.cos(MathUtils.degToRad(lightAzimuth)) * lightDistance,
          ]}
          intensity={lightIntensity}
          castShadow
          shadow-mapSize={[4096, 4096]}
          shadow-bias={-0.0001}
          shadow-normalBias={0.02}
          shadow-camera-near={1}
          shadow-camera-far={shadowCameraFar}
          shadow-camera-left={-shadowExtent}
          shadow-camera-right={shadowExtent}
          shadow-camera-top={shadowExtent}
          shadow-camera-bottom={-shadowExtent}
        />
        <Environment
          preset="city"
          background={false}
          environmentIntensity={0.4}
        />
        <Bounds
          key={boundsRevision || boundsKey}
          maxDuration={0.35}
          fit
          clip
          observe
          margin={1.25}
        >
          <group>
            {gridData.map((item, index) => (
              <group key={index}>
                {item.meshType !== "null" && (
                  <Model
                    scale={1}
                    name={item.meshType}
                    position={item.position}
                    rotation={item.rotation}
                  />
                )}
                {item.pipeMeshType !== "null" && (
                  <Model
                    scale={1}
                    name={item.pipeMeshType}
                    position={item.position}
                    rotation={item.rotation}
                  />
                )}
                {item.aircondMeshType !== "null" && (
                  <Model
                    scale={1}
                    name={item.aircondMeshType}
                    position={item.position}
                    rotation={item.rotation}
                  />
                )}
                {item.roofAccessoriesMesh !== "null" && (
                  <Model
                    scale={1}
                    name={item.roofAccessoriesMesh}
                    position={item.position}
                    rotation={item.rotation}
                  />
                )}
                {item.balconyAccessoriesMesh !== "null" && (
                  <Model
                    scale={1}
                    name={item.balconyAccessoriesMesh}
                    position={item.position}
                    rotation={item.rotation}
                  />
                )}
              </group>
            ))}
            <mesh position={[0, buildingHeight / 2, 0]}>
              <boxGeometry
                args={[
                  shadowBoundsWidth,
                  buildingHeight + 6,
                  shadowBoundsDepth,
                ]}
              />
              <meshBasicMaterial
                transparent
                opacity={0}
                depthWrite={false}
                colorWrite={false}
              />
            </mesh>
          </group>
        </Bounds>

        <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
          <planeGeometry args={[groundExtent * 2, groundExtent * 2]} />
          <shadowMaterial transparent opacity={0.28} />
        </mesh>

        <OrbitControls
          ref={orbitControlsRef}
          autoRotate
          autoRotateSpeed={rotateSpeed}
          target={[-0.345, 7.7528, 3.557]}
          makeDefault
        />
      </Suspense>
    </Canvas>
  );
}
