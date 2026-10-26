import { useGLTF } from "@react-three/drei";
import { useLoader, type ThreeElements } from "@react-three/fiber";
import { TextureLoader } from "three";
import type { Mesh } from "three";

type ModelProps = ThreeElements["group"] & {
  name: string;
};

export function Model({ name, ...props }: ModelProps) {
  const glbPath = "/objects/window.glb";
  const texPath = "/objects/map.png";

  const { nodes } = useGLTF(glbPath);
  const meshes = nodes as unknown as Record<string, Mesh>;
  const texture = useLoader(TextureLoader, texPath);
  // GLTF textures use the opposite vertical orientation from this map.
  // eslint-disable-next-line react-hooks/immutability
  texture.flipY = false;

  function selectMesh() {
    let selectedMesh = meshes.Window_0.geometry;

    if (name === "Corner") selectedMesh = meshes.Corner.geometry;
    else if (name === "null") selectedMesh = meshes.Null.geometry;
    else if (name === "Ceiling") selectedMesh = meshes.Ceiling.geometry;
    else if (name === "Ceiling_corner")
      selectedMesh = meshes.Ceiling_corner.geometry;
    else if (name === "Ceiling_cap") selectedMesh = meshes.Ceiling_cap.geometry;
    else if (name === "Door_0") selectedMesh = meshes.Door_0.geometry;
    else if (name === "Window_0") selectedMesh = meshes.Window_0.geometry;
    else if (name === "Window_1") selectedMesh = meshes.Window_1.geometry;
    else if (name === "Window_2") selectedMesh = meshes.Window_2.geometry;
    else if (name === "Window_balcony_0")
      selectedMesh = meshes.Window_balcony_0.geometry;
    else if (name === "Window_balcony_1")
      selectedMesh = meshes.Window_balcony_1.geometry;
    else if (name === "Window_balcony_2")
      selectedMesh = meshes.Window_balcony_2.geometry;
    else if (name === "Window_balcony_3")
      selectedMesh = meshes.Window_balcony_3.geometry;
    else if (name === "Window_balcony_4")
      selectedMesh = meshes.Window_balcony_4.geometry;
    else if (name === "Window_balcony_5")
      selectedMesh = meshes.Window_balcony_5.geometry;
    else if (name === "Window_balcony_6")
      selectedMesh = meshes.Window_balcony_6.geometry;
    else if (name === "Pipe_0") selectedMesh = meshes.Pipe_0.geometry;
    else if (name === "Pipe_1") selectedMesh = meshes.Pipe_1.geometry;
    else if (name === "Pipe_2") selectedMesh = meshes.Pipe_2.geometry;
    else if (name === "AirCond_0") selectedMesh = meshes.AirCond_0.geometry;
    else if (name === "AirCond_1") selectedMesh = meshes.AirCond_1.geometry;
    else if (name === "AirCond_2") selectedMesh = meshes.AirCond_2.geometry;
    else if (name === "RoofAccessories_0")
      selectedMesh = meshes.RoofAccessories_0.geometry;
    else if (name === "RoofAccessories_1")
      selectedMesh = meshes.RoofAccessories_1.geometry;
    else if (name === "RoofAccessories_2")
      selectedMesh = meshes.RoofAccessories_2.geometry;
    else if (name === "RoofAccessories_3")
      selectedMesh = meshes.RoofAccessories_3.geometry;
    else if (name === "BalconyAccessories_0")
      selectedMesh = meshes.BalconyAccessories_0.geometry;
    else if (name === "BalconyAccessories_1")
      selectedMesh = meshes.BalconyAccessories_1.geometry;
    else if (name === "BalconyAccessories_2")
      selectedMesh = meshes.BalconyAccessories_2.geometry;
    else if (name === "BalconyAccessories_3")
      selectedMesh = meshes.BalconyAccessories_3.geometry;
    else if (name === "BalconyAccessories_4")
      selectedMesh = meshes.BalconyAccessories_4.geometry;

    return selectedMesh;
  }

  return (
    <group {...props} name={name}>
      <mesh geometry={selectMesh()} castShadow receiveShadow>
        <meshLambertMaterial map={texture} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/objects/window.glb");
