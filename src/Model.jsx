import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export function Model(props) {
  const glbPath = "/objects/window.glb";
  const texPath = "/objects/map.png";

  const { nodes } = useGLTF(glbPath);
  const texture = useLoader(TextureLoader, texPath);
  texture.flipY = false;

  function selectMesh() {
    let selectedMesh = nodes.Window_0.geometry;

    if (props.name === "Corner") selectedMesh = nodes.Corner.geometry;
    else if (props.name === "null") selectedMesh = nodes.Null.geometry;
    else if (props.name === "Ceiling") selectedMesh = nodes.Ceiling.geometry;
    else if (props.name === "Ceiling_corner")
      selectedMesh = nodes.Ceiling_corner.geometry;
    else if (props.name === "Ceiling_cap")
      selectedMesh = nodes.Ceiling_cap.geometry;
    else if (props.name === "Door_0") selectedMesh = nodes.Door_0.geometry;
    else if (props.name === "Window_0") selectedMesh = nodes.Window_0.geometry;
    else if (props.name === "Window_1") selectedMesh = nodes.Window_1.geometry;
    else if (props.name === "Window_2") selectedMesh = nodes.Window_2.geometry;
    else if (props.name === "Window_balcony_0")
      selectedMesh = nodes.Window_balcony_0.geometry;
    else if (props.name === "Window_balcony_1")
      selectedMesh = nodes.Window_balcony_1.geometry;
    else if (props.name === "Window_balcony_2")
      selectedMesh = nodes.Window_balcony_2.geometry;
    else if (props.name === "Window_balcony_3")
      selectedMesh = nodes.Window_balcony_3.geometry;
    else if (props.name === "Window_balcony_4")
      selectedMesh = nodes.Window_balcony_4.geometry;
    else if (props.name === "Window_balcony_5")
      selectedMesh = nodes.Window_balcony_5.geometry;
    else if (props.name === "Window_balcony_6")
      selectedMesh = nodes.Window_balcony_6.geometry;
    else if (props.name === "Pipe_0") selectedMesh = nodes.Pipe_0.geometry;
    else if (props.name === "Pipe_1") selectedMesh = nodes.Pipe_1.geometry;
    else if (props.name === "Pipe_2") selectedMesh = nodes.Pipe_2.geometry;
    else if (props.name === "AirCond_0")
      selectedMesh = nodes.AirCond_0.geometry;
    else if (props.name === "AirCond_1")
      selectedMesh = nodes.AirCond_1.geometry;
    else if (props.name === "AirCond_2")
      selectedMesh = nodes.AirCond_2.geometry;
    else if (props.name === "RoofAccessories_0")
      selectedMesh = nodes.RoofAccessories_0.geometry;
    else if (props.name === "RoofAccessories_1")
      selectedMesh = nodes.RoofAccessories_1.geometry;
    else if (props.name === "RoofAccessories_2")
      selectedMesh = nodes.RoofAccessories_2.geometry;
    else if (props.name === "RoofAccessories_3")
      selectedMesh = nodes.RoofAccessories_3.geometry;
    else if (props.name === "BalconyAccessories_0")
      selectedMesh = nodes.BalconyAccessories_0.geometry;
    else if (props.name === "BalconyAccessories_1")
      selectedMesh = nodes.BalconyAccessories_1.geometry;
    else if (props.name === "BalconyAccessories_2")
      selectedMesh = nodes.BalconyAccessories_2.geometry;
    else if (props.name === "BalconyAccessories_3")
      selectedMesh = nodes.BalconyAccessories_3.geometry;
    else if (props.name === "BalconyAccessories_4")
      selectedMesh = nodes.BalconyAccessories_4.geometry;

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
