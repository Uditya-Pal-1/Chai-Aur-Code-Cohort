import { useEffect, useRef } from 'react'

export default function ThreeHeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let disposed = false
    let animationFrame = 0
    let resizeObserver: ResizeObserver | undefined
    let disposeScene = () => {}

    void import('three')
      .then(({
        ACESFilmicToneMapping,
        AmbientLight,
        BoxGeometry,
        EdgesGeometry,
        Group,
        LineBasicMaterial,
        LineSegments,
        Mesh,
        MeshStandardMaterial,
        PerspectiveCamera,
        PointLight,
        Scene,
        SRGBColorSpace,
        Timer,
        WebGLRenderer,
      }) => {
        if (disposed) return

        const scene = new Scene()
        const camera = new PerspectiveCamera(34, 1, 0.1, 100)
        camera.position.set(0, 0, 7.5)

        const renderer = new WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        renderer.outputColorSpace = SRGBColorSpace
        renderer.toneMapping = ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.15

        scene.add(new AmbientLight(0xffffff, 1.8))
        const orangeLight = new PointLight(0xff7626, 55, 12)
        orangeLight.position.set(2.5, 2.5, 4)
        scene.add(orangeLight)

        const model = new Group()
        model.rotation.set(-0.48, 0.02, 0.38)
        scene.add(model)

        const layers = [
          { y: -0.48, color: 0x111111 },
          { y: -0.12, color: 0x151515 },
          { y: 0.24, color: 0x1b1b1b },
        ]

        layers.forEach(({ y, color }, index) => {
          const geometry = new BoxGeometry(3.15 - index * 0.08, 0.2, 2.25 - index * 0.08)
          const material = new MeshStandardMaterial({
            color,
            metalness: 0.28,
            roughness: 0.42,
          })
          const slab = new Mesh(geometry, material)
          slab.position.y = y
          model.add(slab)

          const outline = new LineSegments(
            new EdgesGeometry(geometry),
            new LineBasicMaterial({
              color: 0xff8a3d,
              toneMapped: false,
              transparent: true,
              opacity: index === layers.length - 1 ? 0.9 : 0.58,
            }),
          )
          outline.position.copy(slab.position)
          model.add(outline)
        })

        const resize = () => {
          const width = canvas.clientWidth
          const height = canvas.clientHeight
          if (!width || !height) return
          renderer.setSize(width, height, false)
          camera.aspect = width / height
          camera.position.z = width < 500 ? 8.5 : 7.5
          camera.updateProjectionMatrix()
          renderer.render(scene, camera)
        }

        resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(canvas)
        resize()

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const timer = new Timer()
        timer.connect(document)
        const animate = (timestamp: number) => {
          animationFrame = window.requestAnimationFrame(animate)
          timer.update(timestamp)
          const time = timer.getElapsed()
          model.rotation.y = Math.sin(time * 0.22) * 0.055
          model.rotation.z = 0.38 + Math.sin(time * 0.18) * 0.018
          model.position.y = Math.sin(time * 0.35) * 0.035
          renderer.render(scene, camera)
        }

        if (!reduceMotion) {
          animationFrame = window.requestAnimationFrame(animate)
        }

        disposeScene = () => {
          timer.dispose()
          scene.traverse((object) => {
            if (object instanceof Mesh || object instanceof LineSegments) {
              object.geometry.dispose()
              const materials = Array.isArray(object.material) ? object.material : [object.material]
              materials.forEach((material) => material.dispose())
            }
          })
          renderer.dispose()
        }
      })
      .catch((error: unknown) => {
        console.error('Unable to initialize the AtellixUI Three.js hero scene.', error)
      })

    return () => {
      disposed = true
      window.cancelAnimationFrame(animationFrame)
      resizeObserver?.disconnect()
      disposeScene()
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
}
