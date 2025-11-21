import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'

function Scene() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas gl={{ alpha: true }} style={{ background: 'transparent' }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <pointLight position={[-10, -10, -5]} intensity={0.3} color="#a8c5d1" />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />

          {/* Grid helper for reference */}
          <gridHelper args={[10, 10, '#d4dfe6', '#e8eef2']} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
