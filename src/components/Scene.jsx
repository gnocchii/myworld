import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'

function Scene() {
  return (
    <div style={{ width: '100%', height: '100vh', background: 'linear-gradient(to bottom, #f0f4f8, #e1e8ed)' }}>
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <pointLight position={[-10, -10, -5]} intensity={0.3} color="#a8c5d1" />

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={10}
          />

          {/* Grid helper for reference */}
          <gridHelper args={[10, 10, '#d4dfe6', '#e8eef2']} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
