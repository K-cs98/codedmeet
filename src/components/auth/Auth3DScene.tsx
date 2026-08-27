'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Replace with your preferred GLTF/GLB character model path
function CharacterModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  // Subtle idle rotation or interaction setup
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -1.2, 0]} />;
}

export default function Auth3DScene() {
  return (
    <div className="w-full h-64 md:h-full bg-slate-950 flex items-center justify-center relative overflow-hidden rounded-l-2xl">
      <Canvas camera={{ position: [0, 1, 3], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} color="#ec4899" intensity={0.8} />
        
        <CharacterModel url="/models/character.glb" />
        
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}