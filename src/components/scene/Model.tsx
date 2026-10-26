import { useGLTF } from "@react-three/drei";
import { useLoader, type ThreeElements } from "@react-three/fiber";
import { memo } from "react";
import { TextureLoader } from "three";
import type { Mesh } from "three";

type ModelProps = ThreeElements["group"] & {
  name: string;
};

const GLB_PATH = "/objects/building.glb";

export const Model = memo(function Model({ name, ...props }: ModelProps) {
  const texPath = "/objects/map.png";

  const { nodes } = useGLTF(GLB_PATH);
  const meshes = nodes as unknown as Record<string, Mesh>;
  const texture = useLoader(TextureLoader, texPath);
  // GLTF textures use the opposite vertical orientation from this map.
  // eslint-disable-next-line react-hooks/immutability
  texture.flipY = false;

  const meshName = name === "null" ? "Null" : name;
  const geometry = meshes[meshName]?.geometry ?? meshes.Window_0.geometry;

  return (
    <group {...props} name={name}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshLambertMaterial map={texture} />
      </mesh>
    </group>
  );
});

useGLTF.preload(GLB_PATH);
