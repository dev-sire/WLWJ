"use client"
import { useEffect, useRef } from "react"
import { motion, Variants } from "framer-motion"
import { ArrowRight, Shield } from "lucide-react"
import * as THREE from "three"

const BlackHoleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer
    animationId?: number
  }>({})

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const scene = new THREE.Scene()

    const sizes = { width: window.innerWidth, height: window.innerHeight }

    const cameraGroup = new THREE.Group()
    scene.add(cameraGroup)

    const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 500)
    camera.position.set(0, 0, 8)
    cameraGroup.add(camera)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    })
    renderer.setClearColor('#000000', 1)
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    renderer.setSize(sizes.width, sizes.height)
    sceneRef.current.renderer = renderer

    // White circular stars
    const starsCount = 4000
    const starsPositions = new Float32Array(starsCount * 3)
    const starsSizes = new Float32Array(starsCount)

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3
      const radius = 200 + Math.random() * 300
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      starsPositions[i3] = Math.sin(phi) * Math.cos(theta) * radius
      starsPositions[i3 + 1] = Math.sin(phi) * Math.sin(theta) * radius
      starsPositions[i3 + 2] = Math.cos(phi) * radius

      starsSizes[i] = 2 + Math.random() * 4
    }

    const starsGeometry = new THREE.BufferGeometry()
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3))
    starsGeometry.setAttribute('aSize', new THREE.BufferAttribute(starsSizes, 1))

    const starsMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float aSize;
        
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aSize * (300.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          // Perfect circle
          if (dist > 0.5) discard;
          
          // Smooth edges
          float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
          
          gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.7);
        }
      `
    })

    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Accretion disk
    const diskGeometry = new THREE.CylinderGeometry(2.0, 8, 0, 32, 12, true)
    const diskMaterial = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        void main() {
          float dist = length(vPosition.xz);
          float normalizedDist = (dist - 2.5) / (9.0 - 2.5);
          
          float angle = atan(vPosition.z, vPosition.x);
          float rotation = angle + uTime * 0.4 + normalizedDist * 4.0;
          
          // Enhanced bands with turbulence
          float bands = sin(rotation * 20.0 + uTime * 1.5) * 0.5 + 0.5;
          bands = pow(bands, 1.5);
          
          // Multi-layered noise for turbulence
          vec2 noiseCoord = vec2(rotation * 3.0, normalizedDist * 8.0 + uTime * 0.3);
          float n1 = noise(noiseCoord);
          float n2 = noise(noiseCoord * 2.0 + uTime * 0.1);
          float n = mix(n1, n2, 0.5);
          
          // Pure white gradient
          vec3 innerColor = vec3(1.0, 1.0, 1.0);
          vec3 midColor = vec3(0.85, 0.85, 0.85);
          vec3 outerColor = vec3(0.6, 0.6, 0.6);
          
          vec3 color;
          if (normalizedDist < 0.5) {
            color = mix(innerColor, midColor, normalizedDist * 2.0);
          } else {
            color = mix(midColor, outerColor, (normalizedDist - 0.5) * 2.0);
          }
          
          // Add bright spots
          float brightSpots = pow(n, 3.0) * bands;
          color += vec3(brightSpots * 0.5);
          
          float alpha = (1.0 - normalizedDist) * bands * (n * 0.7 + 0.3);
          alpha *= smoothstep(0.0, 0.15, normalizedDist) * smoothstep(1.0, 0.75, normalizedDist);
          
          gl_FragColor = vec4(color, alpha * 2.0);
        }
      `
    })

    const disk = new THREE.Mesh(diskGeometry, diskMaterial)
    scene.add(disk)

    // Event horizon - pitch black with sharp white edge
    const horizonGeometry = new THREE.SphereGeometry(2.0, 100, 100)
    const horizonMaterial = new THREE.ShaderMaterial({
      transparent: false,
      side: THREE.FrontSide,
      uniforms: {
        uTime: { value: 0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vViewPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vViewPosition;
        
        void main() {
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 64.0);
          
          // Pure pitch black center
          vec3 darkCore = vec3(0.0, 0.0, 0.0);
          
          // Sharp bright white edge
          float pulse = sin(uTime * 1.0) * 0.1 + 1.0;
          vec3 glowColor = vec3(1.0, 1.0, 1.0);
          
          // Sharp transition - makes edge very defined
          float edgeSharpness = smoothstep(0.0, 0.005, fresnel);
          
          vec3 finalColor = mix(darkCore, glowColor * 3.0 * pulse, edgeSharpness);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    })

    const horizon = new THREE.Mesh(horizonGeometry, horizonMaterial)
    scene.add(horizon)

    // Particle jets
    const jetCount = 800
    const jetPositions = new Float32Array(jetCount * 3)
    const jetSizes = new Float32Array(jetCount)

    for (let i = 0; i < jetCount; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const spread = Math.random() * 0.3
      const height = Math.random() * 25 + 3
      
      const isTop = Math.random() > 0.5
      const yDirection = isTop ? 1 : -1
      
      jetPositions[i3 + 0] = Math.cos(theta) * spread
      jetPositions[i3 + 1] = height * yDirection
      jetPositions[i3 + 2] = Math.sin(theta) * spread
      
      jetSizes[i] = 3 + Math.random() * 8
    }

    const jetGeometry = new THREE.BufferGeometry()
    jetGeometry.setAttribute('position', new THREE.BufferAttribute(jetPositions, 3))
    jetGeometry.setAttribute('aSize', new THREE.BufferAttribute(jetSizes, 1))

    const jetMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float aSize;
        
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aSize * (300.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.7);
        }
      `
    })

    const jets = new THREE.Points(jetGeometry, jetMaterial)
    scene.add(jets)

    // Resize handler
    const handleResize = () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
      renderer.setSize(sizes.width, sizes.height)
    }

    window.addEventListener('resize', handleResize)

    // Animation
    const clock = new THREE.Clock()

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()

      diskMaterial.uniforms.uTime.value = elapsedTime
      horizonMaterial.uniforms.uTime.value = elapsedTime

      // Complex 3D rotation of the accretion disk
      const rotationSpeed = 0.5
      
      // Orbital camera movement (no mouse influence)
      const pitchAmplitude = 0.8
      cameraGroup.rotation.x = Math.sin(elapsedTime * rotationSpeed) * pitchAmplitude
      cameraGroup.rotation.y = Math.sin(elapsedTime * rotationSpeed * 0.7) * 0.3

      // Rotate disk in multiple axes
      disk.rotation.x = Math.sin(elapsedTime * 0.1) * 0.3
      disk.rotation.y = elapsedTime * 0.08
      disk.rotation.z = Math.cos(elapsedTime * 0.12) * 0.2
      
      // Animate jet particles
      const jetPos = jetGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < jetCount; i++) {
        const i3 = i * 3
        const originalY = jetPositions[i3 + 1]
        const speed = 0.05 + Math.random() * 0.02
        jetPos[i3 + 1] = originalY + Math.sin(elapsedTime * speed + i) * 0.5
      }
      jetGeometry.attributes.position.needsUpdate = true

      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      sceneRef.current.animationId = requestAnimationFrame(tick)
    }

    tick()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }
      renderer.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
      diskGeometry.dispose()
      diskMaterial.dispose()
      horizonGeometry.dispose()
      horizonMaterial.dispose()
      jetGeometry.dispose()
      jetMaterial.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-2 w-full h-full" />
}

export default function HeroSection() {
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15 + 0.3,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  }

  return (
    <section className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <BlackHoleBackground />

      {/* Enhanced overlay for foreground visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/70 z-10" />
      
      {/* Additional center vignette for text readability */}
      <div className="absolute inset-0 z-10" 
           style={{
             background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.5) 80%)'
           }} 
      />

      {/* Content */}
      <div className="relative z-20 text-center p-6">
        <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-4">
          <span className="font-mono text-xs tracking-[0.3em] text-gray-400 uppercase drop-shadow-lg">
            // WLWJ CONTROL ONLINE
          </span>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/20 mb-6 backdrop-blur-md shadow-2xl"
        >
          <Shield className="h-4 w-4 text-gray-200" />
          <span className="text-sm font-medium text-gray-200">Student-led Cybersecurity Excellence</span>
        </motion.div>

        <motion.h1
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400"
          style={{
            textShadow: '0 0 60px rgba(255,255,255,0.4), 0 0 120px rgba(255,255,255,0.2)'
          }}
        >
          WLWJ
        </motion.h1>

        <motion.p
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10 font-light tracking-wide drop-shadow-lg"
        >
          Forging Cyber Warriors Through Space-Grade Challenges
        </motion.p>

        <motion.div
          custom={4}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            className="bg-white text-black font-semibold hover:bg-gray-200 transition-colors duration-200 px-8 py-3 rounded-md text-base flex items-center gap-2 shadow-2xl hover:shadow-white/20"
          >
            View Events
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            className="border border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-md text-base bg-black/30 backdrop-blur-sm transition-colors duration-200 shadow-xl"
          >
            Contact Us
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-black/20 shadow-lg"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          />
        </motion.div>
      </div>
    </section>
  )
}