"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, N8AO } from "@react-three/postprocessing";
import niceColors from "nice-color-palettes";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();
const data = Array.from({ length: 1000 }, () => ({
  color:
    niceColors[Math.floor(Math.random() * 17)][Math.floor(Math.random() * 5)],
  scale: 1,
}));

export function ThreeScene() {
  return (
    <Canvas
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 15], near: 5, far: 20 }}
      flat
      linear
    >
      <Boxes />
      <EffectComposer>
        <N8AO aoRadius={0.5} intensity={1} />
        <Bloom luminanceThreshold={1} intensity={0.5} levels={9} />
      </EffectComposer>
    </Canvas>
  );
}
function Boxes() {
  const [hovered, set] = useState();
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(1000)
          .fill()
          .flatMap((_, i) => tempColor.set(data[i].color).toArray())
      ),
    []
  );
  const meshRef = useRef();
  const prevRef = useRef();
  useEffect(() => void (prevRef.current = hovered), [hovered]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time / 12);
    meshRef.current.rotation.y = Math.sin(time / 13);
    let i = 0;
    for (let x = 0; x < 10; x++)
      for (let y = 0; y < 10; y++)
        for (let z = 0; z < 10; z++) {
          const id = i++;
          tempObject.position.set(5 - x, 5 - y, 5 - z);
          tempObject.rotation.y =
            Math.sin(x / 4 + time / 3) +
            Math.sin(y / 4 + time / 3) +
            Math.sin(z / 4 + time / 3);
          tempObject.rotation.z = tempObject.rotation.y * 2;
          if (hovered !== prevRef.Current) {
            (data[id].color === data[hovered].color
              ? tempColor
                  .set(data[id].color)
                  .addScalar(
                    Math.abs(
                      Math.sin(x + time * 3) +
                        Math.sin(y + time * 3) +
                        Math.sin(z + time * 3)
                    )
                  )
              : tempColor.set(data[id].color)
            ).toArray(colorArray, id * 3);
            meshRef.current.geometry.attributes.color.needsUpdate = true;
          }
          tempObject.updateMatrix();
          meshRef.current.setMatrixAt(id, tempObject.matrix);
        }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, 1000]}
      onPointerMove={(e) => (e.stopPropagation(), set(e.instanceId))}
      onPointerOut={(e) => set(undefined)}
    >
      <boxGeometry args={[0.6, 0.6, 0.6]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </boxGeometry>
      <meshBasicMaterial toneMapped={false} vertexColors />
    </instancedMesh>
  );
}
