import { useEffect, useRef } from 'react'

const FLAKE_COUNT = 160

function Snowfall() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    // Create snowflakes
    const flakes = Array.from({ length: FLAKE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 3 + 0.5,         // radius 0.5–3.5
      speed: Math.random() * 0.8 + 0.2,   // fall speed
      drift: (Math.random() - 0.5) * 0.4, // horizontal drift
      opacity: Math.random() * 0.5 + 0.15,
    }))

    let animId

    function draw() {
      ctx.clearRect(0, 0, W, H)

      for (const f of flakes) {
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`
        ctx.fill()

        // Move flake
        f.y += f.speed
        f.x += f.drift

        // Wrap around
        if (f.y > H + 5) { f.y = -5; f.x = Math.random() * W }
        if (f.x > W + 5) { f.x = -5 }
        if (f.x < -5)    { f.x = W + 5 }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export default Snowfall
