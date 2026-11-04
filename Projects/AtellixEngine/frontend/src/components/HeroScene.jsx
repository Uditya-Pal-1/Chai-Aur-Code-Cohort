import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const OrbitingShapes = () => {
  const group = useRef(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={group}>
      <mesh position={[1.5, 0.8, -1.4]} rotation={[0.4, 0.5, 0.2]}>
        <torusGeometry args={[1.45, 0.012, 8, 100]} />
        <meshBasicMaterial color="#fa6b35" transparent opacity={0.42} />
      </mesh>
      <mesh position={[-2.3, 1.05, -0.5]} rotation={[0.3, 0.6, 0.2]}>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshStandardMaterial
          color="#ff7942"
          metalness={0.5}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[2.5, -1.1, 0.1]} rotation={[0.5, 0.2, 0]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color="#ffae86"
          metalness={0.65}
          roughness={0.22}
        />
      </mesh>
    </group>
  );
};

const HeroScene = () => (
  <div className="hero-scene" aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={1.1} />
      <pointLight position={[3, 4, 4]} intensity={22} color="#ff8753" />
      <OrbitingShapes />
    </Canvas>
  </div>
);

export default HeroScene;
