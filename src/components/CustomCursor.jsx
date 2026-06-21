import { useEffect, useRef, useState } from 'react'

function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    const onDown = () => setClicking(true)
    const onUp   = () => setClicking(false)

    const onEnterLink = (e) => {
      if (e.target.closest('a, button, [role="button"], .cert-item')) {
        setHovering(true)
      }
    }
    const onLeaveLink = () => setHovering(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseover', onEnterLink)
    window.addEventListener('mouseout', onLeaveLink)

    let raf
    function lerp(a, b, t) { return a + (b - a) * t }

    function animate() {
      // Dot snaps instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      // Ring follows with easing
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseover', onEnterLink)
      window.removeEventListener('mouseout', onLeaveLink)
    }
  }, [])

  return (
    <>
      {/* Outer ring — follows with lag */}
      <div
        ref={ringRef}
        className={`cursor-ring${hovering ? ' cursor-ring--hover' : ''}${clicking ? ' cursor-ring--click' : ''}`}
      />
      {/* Inner dot — snaps to mouse */}
      <div
        ref={dotRef}
        className={`cursor-dot${clicking ? ' cursor-dot--click' : ''}`}
      />
    </>
  )
}

export default CustomCursor
