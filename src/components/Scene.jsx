import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Float } from '@react-three/drei'
import { Suspense } from 'react'

function Box() {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#6366f1" metalness={0.3} roughness={0.4} />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#0f172a' }}>
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7c3aed" />

          <Box />

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={10}
          />

          {/* Grid helper for reference */}
          <gridHelper args={[10, 10, '#1e293b', '#334155']} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
