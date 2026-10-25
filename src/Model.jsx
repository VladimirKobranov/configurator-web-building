import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export function Model(props) {
  const glbPath = "/objects/window.glb";
  const texPath = "/objects/map.png";

  const { nodes } = useGLTF(glbPath);
  const meshes = /** @type {Record<string, import("three").Mesh>} */ (nodes);
  const texture = useLoader(TextureLoader, texPath);
  // GLTF textures use the opposite vertical orientation from this map.
  // eslint-disable-next-line react-hooks/immutability
  texture.flipY = false;

  function selectMesh() {
    let selectedMesh = meshes.Window_0.geometry;

    if (props.name === "Corner") selectedMesh = meshes.Corner.geometry;
    else if (props.name === "null") selectedMesh = meshes.Null.geometry;
    else if (props.name === "Ceiling") selectedMesh = meshes.Ceiling.geometry;
    else if (props.name === "Ceiling_corner")
      selectedMesh = meshes.Ceiling_corner.geometry;
    else if (props.name === "Ceiling_cap")
      selectedMesh = meshes.Ceiling_cap.geometry;
    else if (props.name === "Door_0") selectedMesh = meshes.Door_0.geometry;
    else if (props.name === "Window_0") selectedMesh = meshes.Window_0.geometry;
    else if (props.name === "Window_1") selectedMesh = meshes.Window_1.geometry;
    else if (props.name === "Window_2") selectedMesh = meshes.Window_2.geometry;
    else if (props.name === "Window_balcony_0")
      selectedMesh = meshes.Window_balcony_0.geometry;
    else if (props.name === "Window_balcony_1")
      selectedMesh = meshes.Window_balcony_1.geometry;
    else if (props.name === "Window_balcony_2")
      selectedMesh = meshes.Window_balcony_2.geometry;
    else if (props.name === "Window_balcony_3")
      selectedMesh = meshes.Window_balcony_3.geometry;
    else if (props.name === "Window_balcony_4")
      selectedMesh = meshes.Window_balcony_4.geometry;
    else if (props.name === "Window_balcony_5")
      selectedMesh = meshes.Window_balcony_5.geometry;
    else if (props.name === "Window_balcony_6")
      selectedMesh = meshes.Window_balcony_6.geometry;
    else if (props.name === "Pipe_0") selectedMesh = meshes.Pipe_0.geometry;
    else if (props.name === "Pipe_1") selectedMesh = meshes.Pipe_1.geometry;
    else if (props.name === "Pipe_2") selectedMesh = meshes.Pipe_2.geometry;
    else if (props.name === "AirCond_0")
      selectedMesh = meshes.AirCond_0.geometry;
    else if (props.name === "AirCond_1")
      selectedMesh = meshes.AirCond_1.geometry;
    else if (props.name === "AirCond_2")
      selectedMesh = meshes.AirCond_2.geometry;
    else if (props.name === "RoofAccessories_0")
      selectedMesh = meshes.RoofAccessories_0.geometry;
    else if (props.name === "RoofAccessories_1")
      selectedMesh = meshes.RoofAccessories_1.geometry;
    else if (props.name === "RoofAccessories_2")
      selectedMesh = meshes.RoofAccessories_2.geometry;
    else if (props.name === "RoofAccessories_3")
      selectedMesh = meshes.RoofAccessories_3.geometry;
    else if (props.name === "BalconyAccessories_0")
      selectedMesh = meshes.BalconyAccessories_0.geometry;
    else if (props.name === "BalconyAccessories_1")
      selectedMesh = meshes.BalconyAccessories_1.geometry;
    else if (props.name === "BalconyAccessories_2")
      selectedMesh = meshes.BalconyAccessories_2.geometry;
    else if (props.name === "BalconyAccessories_3")
      selectedMesh = meshes.BalconyAccessories_3.geometry;
    else if (props.name === "BalconyAccessories_4")
      selectedMesh = meshes.BalconyAccessories_4.geometry;

    return selectedMesh;
  }

  return (
    <group {...props}>
      <mesh geometry={selectMesh()} castShadow receiveShadow>
        <meshLambertMaterial map={texture} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/objects/window.glb");
