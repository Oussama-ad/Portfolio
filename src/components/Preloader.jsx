import { useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'

// Pre-generate random snow values so they don't change on re-render
const SNOW = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: `${(i * 2.1 + Math.sin(i) * 30 + 50) % 100}%`,
  size: (i % 4) + 2,
  duration: `${(i % 3) + 2.5}s`,
  delay: `${(i % 5) * 0.4}s`,
  opacity: 0.15 + (i % 5) * 0.1,
}))

const TITLE_CHARS = 'WINTER IS COMING'.split('')

function Preloader({ onComplete }) {
  const overlayRef = useRef(null)
  const lineRef = useRef(null)
  const charsRef = useRef([])
  const barRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    gsap.set(charsRef.current, { y: 80, opacity: 0, rotateX: -90 })
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 })
    gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center center' })

    tl
      // 1. Horizontal line shoots in
      .to(lineRef.current, { scaleX: 1, duration: 0.6, ease: 'power4.inOut' })
      // 2. Subtitle fades up
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      // 3. Main title letters cascade in
      .to(charsRef.current, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.045,
      }, '-=0.1')
      // 4. Gold progress bar sweeps across
      .to(barRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.inOut',
      }, '-=0.2')
      // 5. Hold a beat
      .to({}, { duration: 0.4 })
      // 6. Whole overlay slides up and out
      .to(overlayRef.current, {
        yPercent: -105,
        duration: 1,
        ease: 'power4.inOut',
        onComplete,
      })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={overlayRef} className="preloader">
      {/* CSS Snow particles */}
      <div className="preloader-snow" aria-hidden="true">
        {SNOW.map((f) => (
          <span
            key={f.id}
            className="preloader-flake"
            style={{
              left: f.left,
              width: f.size,
              height: f.size,
              animationDuration: f.duration,
              animationDelay: f.delay,
              opacity: f.opacity,
            }}
          />
        ))}
      </div>

      {/* Center stage */}
      <div className="preloader-stage">
        {/* Thin horizontal separator */}
        <div ref={lineRef} className="preloader-line" />

        {/* Sub-label */}
        <p ref={subtitleRef} className="preloader-subtitle">
          Portfolio&nbsp;&bull;&nbsp;2026
        </p>

        {/* Main title — perspective for 3-D flip */}
        <div className="preloader-title" style={{ perspective: 600 }}>
          {TITLE_CHARS.map((char, i) => (
            <span
              key={i}
              ref={(el) => (charsRef.current[i] = el)}
              className={char === ' ' ? 'preloader-char preloader-space' : 'preloader-char'}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="preloader-bar-track">
          <div ref={barRef} className="preloader-bar" />
        </div>
      </div>
    </div>
  )
}

export default Preloader
