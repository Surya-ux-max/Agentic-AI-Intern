import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'

function CatBody({ position = [0, 0, 0], color = '#FF3CAC', bellyColor = '#fff', innerEarColor = '#FFDE03', eyeColor = '#00F5D4', scale = 1 }) {
  const bodyRef = useRef()
  const tailRef = useRef()
  const earLRef = useRef()
  const earRRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (bodyRef.current) {
      bodyRef.current.rotation.y = Math.sin(t * 0.5) * 0.18
      bodyRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.1
    }
    if (tailRef.current) tailRef.current.rotation.z = Math.sin(t * 1.5) * 0.7 + 0.4
    if (earLRef.current) earLRef.current.rotation.z = Math.sin(t * 2) * 0.12
    if (earRRef.current) earRRef.current.rotation.z = -Math.sin(t * 2) * 0.12
  })

  return (
    <group ref={bodyRef} position={position} scale={scale}>
      {/* Body */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Snout */}
      <mesh position={[0, 0.75, 0.35]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={bellyColor} roughness={0.5} />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 0.81, 0.47]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.15, 0.93, 0.37]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0.15, 0.93, 0.37]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={1.2} />
      </mesh>
      {/* Pupils */}
      <mesh position={[-0.15, 0.93, 0.43]}>
        <sphereGeometry args={[0.032, 8, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.15, 0.93, 0.43]}>
        <sphereGeometry args={[0.032, 8, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Left Ear outer */}
      <mesh ref={earLRef} position={[-0.26, 1.22, 0]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.13, 0.28, 3]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      {/* Left Ear inner */}
      <mesh position={[-0.26, 1.22, 0.02]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.07, 0.2, 3]} />
        <meshStandardMaterial color={innerEarColor} roughness={0.4} />
      </mesh>
      {/* Right Ear outer */}
      <mesh ref={earRRef} position={[0.26, 1.22, 0]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.13, 0.28, 3]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      {/* Right Ear inner */}
      <mesh position={[0.26, 1.22, 0.02]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.07, 0.2, 3]} />
        <meshStandardMaterial color={innerEarColor} roughness={0.4} />
      </mesh>
      {/* Front Legs */}
      <mesh position={[-0.22, -0.46, 0.2]}>
        <capsuleGeometry args={[0.1, 0.36, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>
      <mesh position={[0.22, -0.46, 0.2]}>
        <capsuleGeometry args={[0.1, 0.36, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>
      {/* Paws */}
      <mesh position={[-0.22, -0.7, 0.22]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color={bellyColor} roughness={0.5} />
      </mesh>
      <mesh position={[0.22, -0.7, 0.22]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color={bellyColor} roughness={0.5} />
      </mesh>
      {/* Tail */}
      <group ref={tailRef} position={[-0.1, -0.1, -0.5]}>
        <mesh rotation={[0.5, 0, 0.3]}>
          <torusGeometry args={[0.36, 0.07, 8, 20, Math.PI * 1.2]} />
          <meshStandardMaterial color={color} roughness={0.35} />
        </mesh>
      </group>
      {/* Belly */}
      <mesh position={[0, -0.05, 0.5]}>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshStandardMaterial color={bellyColor} roughness={0.5} />
      </mesh>
    </group>
  )
}

function FloatingOrb({ position, color, size = 0.15, speed = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    ref.current.position.y = position[1] + Math.sin(t) * 0.3
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.2
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <MeshDistortMaterial color={color} distort={0.45} speed={2} transparent opacity={0.85} />
    </mesh>
  )
}

function FloatingPaw({ position, color = '#FF6B00' }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.1 + position[0]) * 0.15
  })
  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      {[-0.11, 0, 0.11].map((x, i) => (
        <mesh key={i} position={[x, 0.16, 0.07]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color={color} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

function Stars() {
  const points = useMemo(() => {
    const pos = []
    for (let i = 0; i < 160; i++) {
      pos.push(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 24
      )
    }
    return new Float32Array(pos)
  }, [])
  const ref = useRef()
  useFrame((state) => { ref.current.rotation.y = state.clock.elapsedTime * 0.018 })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.07} transparent opacity={0.9} />
    </points>
  )
}

export default function Cat3D({ height = '560px' }) {
  return (
    <div style={{ height, width: '100%' }}>
      <Canvas camera={{ position: [0, 0.5, 5.5], fov: 52 }} shadows>
        {/* Strong white ambient + vivid coloured point lights */}
        <ambientLight intensity={1.2} />
        <pointLight position={[5, 5, 5]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-5, 4, -2]} intensity={1.8} color="#FF3CAC" />
        <pointLight position={[0, -3, 4]} intensity={1.5} color="#00F5D4" />
        <spotLight position={[0, 10, 0]} angle={0.4} intensity={2} castShadow />

        <Stars />

        {/* Main centre cat — hot magenta, white belly, yellow inner ear, mint eyes */}
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
          <CatBody
            position={[0, -0.2, 0]}
            color="#FF3CAC"
            bellyColor="#ffffff"
            innerEarColor="#FFDE03"
            eyeColor="#00F5D4"
            scale={1.2}
          />
        </Float>

        {/* Left small cat — electric yellow, white belly, magenta inner ear, orange eyes */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.9}>
          <CatBody
            position={[-3.2, -0.6, -1.5]}
            color="#FFDE03"
            bellyColor="#ffffff"
            innerEarColor="#FF3CAC"
            eyeColor="#FF6B00"
            scale={0.65}
          />
        </Float>

        {/* Right small cat — neon mint, white belly, orange inner ear, magenta eyes */}
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.7}>
          <CatBody
            position={[3.2, -0.5, -1.5]}
            color="#00F5D4"
            bellyColor="#ffffff"
            innerEarColor="#FF6B00"
            eyeColor="#FF3CAC"
            scale={0.6}
          />
        </Float>

        <FloatingPaw position={[-1.8, 1.4, 0.2]} color="#FFDE03" />
        <FloatingPaw position={[1.8, 1.0, 0.6]} color="#FF6B00" />
        <FloatingPaw position={[0.4, 2.0, -0.4]} color="#FF3CAC" />

        <FloatingOrb position={[-2.2, 1.2, 1]} color="#FF3CAC" size={0.2} speed={1.3} />
        <FloatingOrb position={[2.4, 0.6, 0.6]} color="#FFDE03" size={0.16} speed={0.9} />
        <FloatingOrb position={[0.2, 2.2, -0.8]} color="#00F5D4" size={0.22} speed={1.1} />
        <FloatingOrb position={[-1.2, -1.2, 1.2]} color="#FF6B00" size={0.14} speed={1.5} />
      </Canvas>
    </div>
  )
}
