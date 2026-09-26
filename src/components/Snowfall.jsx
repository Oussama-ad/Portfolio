import { useEffect, useRef } from 'react'

function Snowfall() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    let mouseX = W / 2
    let mouseY = H / 2
    let mouseInfluenceX = 0

    const onMouseMove = (e) => {
      const dx = (e.clientX - mouseX) * 0.05
      mouseInfluenceX += dx
      // Clamp influence
      mouseInfluenceX = Math.max(-1.5, Math.min(1.5, mouseInfluenceX))
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Generate multi-depth flakes
    // Layer 0: background mist (small, slow, soft)
    // Layer 1: midground snow (classic flakes)
    // Layer 2: foreground snow (larger, soft blur, faster)
    const flakeCount = Math.min(180, Math.floor((W * H) / 9000))
    const flakes = Array.from({ length: flakeCount }, () => {
      const layer = Math.random() < 0.18 ? 2 : Math.random() < 0.65 ? 1 : 0
      return {
        layer,
        x: Math.random() * W,
        y: Math.random() * H,
        r: layer === 2 ? Math.random() * 2.8 + 2.4 : layer === 1 ? Math.random() * 1.8 + 1.2 : Math.random() * 1 + 0.5,
        speed: layer === 2 ? Math.random() * 1.4 + 1.2 : layer === 1 ? Math.random() * 0.9 + 0.6 : Math.random() * 0.5 + 0.25,
        baseDrift: (Math.random() - 0.45) * 0.6,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
        opacity: layer === 2 ? Math.random() * 0.4 + 0.4 : layer === 1 ? Math.random() * 0.5 + 0.3 : Math.random() * 0.3 + 0.15,
        sparkle: Math.random() < 0.15,
      }
    })

    let animId
    let time = 0

    function draw() {
      time += 0.01
      ctx.clearRect(0, 0, W, H)

      // Decay mouse influence smoothly
      mouseInfluenceX *= 0.96

      for (const f of flakes) {
        f.swing += f.swingSpeed
        const horizontalMovement = Math.sin(f.swing) * 0.7 + f.baseDrift + mouseInfluenceX * (f.layer === 2 ? 1.5 : 0.8)

        f.y += f.speed
        f.x += horizontalMovement

        // Wrap around borders
        if (f.y > H + 10) {
          f.y = -10
          f.x = Math.random() * W
        }
        if (f.x > W + 10) {
          f.x = -10
        } else if (f.x < -10) {
          f.x = W + 10
        }

        // Draw flake
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)

        if (f.layer === 2) {
          // Soft frosty glow for foreground flakes
          const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 1.5)
          grad.addColorStop(0, `rgba(224, 242, 254, ${f.opacity})`)
          grad.addColorStop(1, 'rgba(186, 230, 253, 0)')
          ctx.fillStyle = grad
        } else if (f.sparkle) {
          const sparkAlpha = f.opacity * (0.6 + 0.4 * Math.sin(time * 6 + f.x))
          ctx.fillStyle = `rgba(240, 249, 255, ${sparkAlpha})`
        } else {
          ctx.fillStyle = `rgba(224, 242, 254, ${f.opacity})`
        }

        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="snowfall-canvas"
      aria-hidden="true"
    />
  )
}

export default Snowfall
