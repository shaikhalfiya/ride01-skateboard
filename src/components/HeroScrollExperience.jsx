import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ChevronRight, Shield, Zap, Compass, RotateCw } from 'lucide-react';
import { playClick, playHover } from '../utils/sound';
import { TOTAL_FRAMES } from '../utils/frameLoader';

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollExperience({ images, isReady, onOpenShop }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(1);
  const [activeStage, setActiveStage] = useState(0); // 0: Hero, 1: Stage 1, 2: Stage 2, 3: Stage 3

  // Hero section elements
  const heroContentRef = useRef(null);
  const stage1Ref = useRef(null);
  const stage2Ref = useRef(null);
  const stage3Ref = useRef(null);
  const hudRef = useRef(null);

  // Canvas drawing logic
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas || !images || images.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[frameIdx];
    if (!img || !img.complete) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Set internal resolution
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Deep studio background (#050505)
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, w, h);

    // Aspect ratio contain logic (1280 x 720)
    const imgRatio = 1280 / 720;
    const canvasRatio = w / h;

    let drawW, drawH, drawX, drawY;

    if (canvasRatio < imgRatio) {
      // Taller / Mobile: fill height, center horizontally
      drawH = h;
      drawW = h * imgRatio;
      drawX = (w - drawW) / 2;
      drawY = 0;
    } else {
      // Wider / Desktop: fill width, center vertically
      drawW = w;
      drawH = w / imgRatio;
      drawX = 0;
      drawY = (h - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, [images]);

  // Initial draw and resize handler
  useEffect(() => {
    if (!isReady || !images || images.length === 0) return;

    drawFrame(0);

    const handleResize = () => {
      drawFrame(currentFrameDisplay - 1);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isReady, images, drawFrame, currentFrameDisplay]);

  // GSAP ScrollTrigger timeline setup
  useEffect(() => {
    if (!isReady || !images || images.length === 0 || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const frameObj = { frame: 0 };

      // Master ScrollTrigger timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=4500',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            // Update active stage indicator
            if (p < 0.16) {
              setActiveStage(0);
            } else if (p < 0.44) {
              setActiveStage(1);
            } else if (p < 0.72) {
              setActiveStage(2);
            } else {
              setActiveStage(3);
            }
          },
        },
      });

      // Frame scrubbing across the entire timeline
      masterTl.to(frameObj, {
        frame: TOTAL_FRAMES - 1,
        ease: 'none',
        duration: 1,
        onUpdate: () => {
          const idx = Math.min(Math.max(Math.round(frameObj.frame), 0), TOTAL_FRAMES - 1);
          setCurrentFrameDisplay(idx + 1);
          drawFrame(idx);
        },
      }, 0);

      // Hero Typography fades out
      masterTl.to(heroContentRef.current, {
        opacity: 0,
        y: -60,
        scale: 0.95,
        ease: 'power2.inOut',
        duration: 0.16,
      }, 0);

      // HUD overlay fades in after Hero
      masterTl.fromTo(hudRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.08, ease: 'none' },
        0.14
      );

      // STAGE 1: "ENGINEERED TO MOVE"
      masterTl.fromTo(stage1Ref.current,
        { opacity: 0, x: -50, filter: 'blur(8px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.10, ease: 'power2.out' },
        0.18
      );
      masterTl.to(stage1Ref.current,
        { opacity: 0, x: -30, filter: 'blur(6px)', duration: 0.08, ease: 'power2.in' },
        0.38
      );

      // STAGE 2: "EVERY DETAIL MATTERS"
      masterTl.fromTo(stage2Ref.current,
        { opacity: 0, x: 50, filter: 'blur(8px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.10, ease: 'power2.out' },
        0.46
      );
      masterTl.to(stage2Ref.current,
        { opacity: 0, x: 30, filter: 'blur(6px)', duration: 0.08, ease: 'power2.in' },
        0.66
      );

      // STAGE 3: "OWN YOUR MOVEMENT"
      masterTl.fromTo(stage3Ref.current,
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.10, ease: 'power2.out' },
        0.74
      );
      masterTl.to(stage3Ref.current,
        { opacity: 0, y: -30, filter: 'blur(6px)', duration: 0.08, ease: 'power2.in' },
        0.94
      );

      // Hero entrance animation on initial page load
      gsap.fromTo('.hero-anim-item',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isReady, images, drawFrame]);

  // CTA Click: Smooth scroll directly to Stage 1
  const handleExploreClick = () => {
    playClick();
    if (!containerRef.current) return;
    const trigger = ScrollTrigger.getById('heroTrigger') || ScrollTrigger.getAll()[0];
    if (trigger) {
      const targetScroll = trigger.start + (trigger.end - trigger.start) * 0.25;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    } else {
      window.scrollBy({ top: window.innerHeight * 1.2, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#050505',
      }}
    >
      {/* 1. Canvas Skateboard Renderer */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          zIndex: 1,
        }}
      />

      {/* Subtle Studio Glow Behind Canvas Center */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 39, 50, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 2. SECTION 1: HERO CONTENT OVERLAY */}
      <div
        ref={heroContentRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '120px 0 40px',
        }}
      >
        <div className="container-custom" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          
          {/* Top Hero Tag & Telemetry */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="hero-anim-item">
              <span className="tag-pill">
                <span className="tag-dot" />
                THE ART OF MOVEMENT
              </span>
            </div>

            <div className="hero-anim-item telemetry-badge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-secondary)' }}>
                SERIES // RIDE-01
              </span>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#F5F5F5' }}>
                LIMITED RUN // 500 UNITS
              </span>
            </div>
          </div>

          {/* Center-Left Main Heading */}
          <div style={{ maxWidth: '640px', marginTop: 'auto', marginBottom: 'auto' }}>
            <h1
              className="font-display hero-anim-item"
              style={{
                fontSize: 'clamp(2.8rem, 6.5vw, 6.2rem)',
                lineHeight: 0.95,
                color: '#F5F5F5',
                marginBottom: '24px',
                textTransform: 'uppercase',
                textShadow: '0 4px 24px rgba(0,0,0,0.8)',
              }}
            >
              BUILT TO<br />
              <span style={{ color: 'var(--accent-red)' }}>BREAK LIMITS.</span>
            </h1>

            <p
              className="hero-anim-item font-body"
              style={{
                fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '480px',
                marginBottom: '36px',
                fontWeight: 400,
              }}
            >
              Designed for movement. Made for those who never stand still.
            </p>

            <div className="hero-anim-item" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <button
                onClick={handleExploreClick}
                onMouseEnter={playHover}
                className="btn-primary"
              >
                <span>EXPLORE THE BOARD</span>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => {
                  playClick();
                  if (onOpenShop) onOpenShop();
                }}
                onMouseEnter={playHover}
                className="btn-secondary"
              >
                <span>ORDER $280</span>
              </button>
            </div>
          </div>

          {/* Bottom Hero Bar: Scroll Indicator & Specs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '20px',
            }}
          >
            <div
              className="hero-anim-item"
              style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
              onClick={handleExploreClick}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-red)',
                  animation: 'bounceSlow 2s infinite ease-in-out',
                }}
              >
                <ArrowDown size={14} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: '#F5F5F5', fontWeight: 600 }}>
                  SCROLL TO ROTATE
                </span>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--text-secondary)' }}>
                  INTERACTIVE 360° CINEMATIC
                </span>
              </div>
            </div>

            <div className="hero-anim-item hero-specs-strip" style={{ display: 'flex', gap: '32px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              <div>
                <span style={{ color: '#F5F5F5', display: 'block', fontWeight: 600 }}>32.5" × 8.25"</span>
                <span>DECK GEOMETRY</span>
              </div>
              <div>
                <span style={{ color: '#F5F5F5', display: 'block', fontWeight: 600 }}>7-PLY MAPLE</span>
                <span>GRADE-A HARDROCK</span>
              </div>
              <div>
                <span style={{ color: '#F5F5F5', display: 'block', fontWeight: 600 }}>TITANIUM</span>
                <span>149MM TRUCKS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECTION 2: SCROLL ANIMATION EXPERIENCE TEXT OVERLAYS */}
      
      {/* STAGE 1: ENGINEERED TO MOVE (Left Side Placement) */}
      <div
        ref={stage1Ref}
        style={{
          position: 'absolute',
          top: '50%',
          left: 'clamp(20px, 8vw, 120px)',
          transform: 'translateY(-50%)',
          maxWidth: '460px',
          zIndex: 10,
          pointerEvents: 'none',
          opacity: 0,
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <span className="tag-pill">
            <span className="tag-dot" />
            STAGE 01 // ROTATION
          </span>
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
            lineHeight: 1,
            color: '#F5F5F5',
            marginBottom: '18px',
            textTransform: 'uppercase',
          }}
        >
          ENGINEERED<br />
          <span style={{ color: 'var(--accent-red)' }}>TO MOVE.</span>
        </h2>

        <p
          className="font-body"
          style={{
            fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
            color: '#AAAAAA',
            lineHeight: 1.6,
            marginBottom: '24px',
          }}
        >
          Precision design meets everyday performance.
        </p>

        <div style={{
          padding: '16px 20px',
          backgroundColor: 'rgba(15, 15, 15, 0.75)',
          borderLeft: '2px solid var(--accent-red)',
          backdropFilter: 'blur(12px)',
          fontSize: '0.75rem',
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
        }}>
          <div style={{ color: '#F5F5F5', fontWeight: 600, letterSpacing: '0.12em', marginBottom: '4px' }}>
            DYNAMIC PROFILE
          </div>
          Continuous 360° rotation exposes every contour of our cold-pressed Canadian Hardrock maple deck.
        </div>
      </div>

      {/* STAGE 2: EVERY DETAIL MATTERS (Right Side Placement) */}
      <div
        ref={stage2Ref}
        style={{
          position: 'absolute',
          top: '50%',
          right: 'clamp(20px, 8vw, 120px)',
          transform: 'translateY(-50%)',
          maxWidth: '460px',
          zIndex: 10,
          pointerEvents: 'none',
          opacity: 0,
          textAlign: 'right',
        }}
      >
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <span className="tag-pill">
            <span className="tag-dot" />
            STAGE 02 // CRAFTSMANSHIP
          </span>
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
            lineHeight: 1,
            color: '#F5F5F5',
            marginBottom: '18px',
            textTransform: 'uppercase',
          }}
        >
          EVERY DETAIL<br />
          <span style={{ color: 'var(--accent-red)' }}>MATTERS.</span>
        </h2>

        <p
          className="font-body"
          style={{
            fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
            color: '#AAAAAA',
            lineHeight: 1.6,
            marginBottom: '24px',
          }}
        >
          Crafted with attention to every curve and component.
        </p>

        <div style={{
          padding: '16px 20px',
          backgroundColor: 'rgba(15, 15, 15, 0.75)',
          borderRight: '2px solid var(--accent-red)',
          backdropFilter: 'blur(12px)',
          fontSize: '0.75rem',
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
          textAlign: 'right',
        }}>
          <div style={{ color: '#F5F5F5', fontWeight: 600, letterSpacing: '0.12em', marginBottom: '4px' }}>
            AEROSPACE HARDWARE
          </div>
          Forged titanium trucks matched with laser-printed graphic transfer and sealed high-tolerance bearings.
        </div>
      </div>

      {/* STAGE 3: OWN YOUR MOVEMENT (Bottom / Left Placement) */}
      <div
        ref={stage3Ref}
        style={{
          position: 'absolute',
          bottom: 'clamp(40px, 10vh, 100px)',
          left: 'clamp(20px, 8vw, 120px)',
          maxWidth: '520px',
          zIndex: 10,
          pointerEvents: 'none',
          opacity: 0,
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <span className="tag-pill">
            <span className="tag-dot" />
            STAGE 03 // PERFORMANCE
          </span>
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
            lineHeight: 1,
            color: '#F5F5F5',
            marginBottom: '18px',
            textTransform: 'uppercase',
          }}
        >
          OWN YOUR<br />
          <span style={{ color: 'var(--accent-red)' }}>MOVEMENT.</span>
        </h2>

        <p
          className="font-body"
          style={{
            fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
            color: '#AAAAAA',
            lineHeight: 1.6,
            marginBottom: '20px',
          }}
        >
          A board designed to express your individuality.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            color: '#F5F5F5',
            padding: '8px 14px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            54MM 99A URETHANE
          </span>
          <span style={{
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            color: '#F5F5F5',
            padding: '8px 14px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            ABEC-9 CERAMIC
          </span>
          <span style={{
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            color: 'var(--accent-red)',
            padding: '8px 14px',
            background: 'rgba(217, 39, 50, 0.1)',
            border: '1px solid var(--accent-red)',
          }}>
            READY TO RIDE
          </span>
        </div>
      </div>

      {/* 4. HUD TELEMETRY & PROGRESS INDICATOR */}
      <div
        ref={hudRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 5,
        }}
      >
        {/* Top Right Live Telemetry */}
        <div
          style={{
            position: 'absolute',
            top: '100px',
            right: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '8px',
            fontFamily: 'var(--font-body)',
          }}
          className="hud-telemetry"
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 14px',
            background: 'rgba(10, 10, 10, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
          }}>
            <RotateCw size={12} color="var(--accent-red)" />
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: '#F5F5F5' }}>
              FRAME {String(currentFrameDisplay).padStart(3, '0')} / {String(TOTAL_FRAMES).padStart(3, '0')}
            </span>
          </div>

          <div style={{
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: 'var(--text-secondary)',
          }}>
            ROTATION: {Math.round(((currentFrameDisplay - 1) / (TOTAL_FRAMES - 1)) * 360)}°
          </div>
        </div>

        {/* Right Stage Pill Indicators */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '32px',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
          className="stage-pills"
        >
          {[
            { num: '01', title: 'MOVE' },
            { num: '02', title: 'DETAIL' },
            { num: '03', title: 'OWN' },
          ].map((s, idx) => {
            const isCurrent = activeStage === idx + 1;
            return (
              <div
                key={s.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  opacity: isCurrent ? 1 : 0.4,
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: isCurrent ? '20px' : '8px',
                    height: '2px',
                    backgroundColor: isCurrent ? 'var(--accent-red)' : '#777777',
                    transition: 'all 0.3s ease',
                  }}
                />
                <span style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  color: isCurrent ? '#F5F5F5' : '#777777',
                  fontWeight: isCurrent ? 700 : 400,
                }}>
                  {s.num} // {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @media (max-width: 768px) {
          .telemetry-badge {
            display: none !important;
          }
          .hero-specs-strip {
            display: none !important;
          }
          .stage-pills {
            display: none !important;
          }
          .hud-telemetry {
            top: 70px !important;
            right: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
