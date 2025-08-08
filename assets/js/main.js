import React, { Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  PerspectiveCamera,
  Text,
  Float,
  Stars
} from '@react-three/drei';
import * as THREE from 'three';

// 3D Scene Component
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Environment */}
      <Stars radius={300} depth={60} count={1000} factor={7} />
      <Environment preset="night" />
      
      {/* 3D Elements */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <meshStandardMaterial color="#61dafb" />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <Text
          position={[0, -2, 0]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          Brett A McCall
        </Text>
      </Float>
    </>
  );
}

// Main React App Component
function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Hide loading indicator once React has mounted
    const loadingEl = document.getElementById('loading');
    if (loadingEl) {
      loadingEl.style.display = 'none';
    }
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* 3D Background Canvas */}
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
        camera={{ position: [0, 0, 5], fov: 75 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#000000'));
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      {/* Interactive UI Overlay */}
      {isLoaded && (
        <div style={{
          position: 'relative',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          {/* Navigation */}
          <nav style={{
            position: 'fixed',
            top: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '2rem',
            pointerEvents: 'all'
          }}>
            <a 
              href="/" 
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
                backdropFilter: 'blur(10px)'
              }}
            >
              Home
            </a>
            <a 
              href="/about" 
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
                backdropFilter: 'blur(10px)'
              }}
            >
              About
            </a>
            <a 
              href="/projects" 
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
                backdropFilter: 'blur(10px)'
              }}
            >
              Projects
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

// Initialize React App
document.addEventListener('DOMContentLoaded', () => {
  const threeCanvas = document.getElementById('three-canvas');
  
  if (threeCanvas) {
    const root = createRoot(threeCanvas);
    root.render(<App />);
  }
});