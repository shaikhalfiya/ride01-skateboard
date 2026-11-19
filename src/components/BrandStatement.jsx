import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStatement() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const accentRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        '.brand-headline-line',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Oversized red accent 01 animation
      gsap.fromTo(
        accentRef.current,
        { scale: 0.85, opacity: 0, rotation: -4 },
        {
          scale: 1,
          opacity: 0.12,
          rotation: 0,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            scrub: 1,
          },
        }
      );

      // Editorial text fade-in
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="statement"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#080808',
        display: 'flex',
        alignItems: 'center',
        padding: '160px 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Oversized Red Accent Element (#D92732) in background */}
      <div
        ref={accentRef}
        style={{
          position: 'absolute',
          right: '-5vw',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(20rem, 42vw, 48rem)',
          fontWeight: 800,
          lineHeight: 0.8,
          color: 'var(--accent-red)',
          opacity: 0.1,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        01
      </div>

      {/* Red Geometric Stencil Accent Line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '20%',
          width: '4px',
          height: '140px',
          backgroundColor: 'var(--accent-red)',
          boxShadow: '0 0 20px var(--accent-red)',
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        
        {/* Editorial Subtitle Pill */}
        <div style={{ marginBottom: '32px' }}>
          <span className="tag-pill">
            <span className="tag-dot" />
            MANIFESTO // EDITION 01
          </span>
        </div>

        {/* Large Typography: FIND YOUR OWN DIRECTION. */}
        <div ref={headlineRef} style={{ marginBottom: '60px', overflow: 'hidden' }}>
          <h2
            className="font-display brand-headline-line"
            style={{
              fontSize: 'clamp(3.2rem, 9vw, 8.5rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              color: '#F5F5F5',
              textTransform: 'uppercase',
            }}
          >
            FIND YOUR
          </h2>

          <h2
            className="font-display brand-headline-line"
            style={{
              fontSize: 'clamp(3.2rem, 9vw, 8.5rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              color: 'var(--accent-red)',
              textTransform: 'uppercase',
              textShadow: '0 0 40px rgba(217, 39, 50, 0.3)',
            }}
          >
            OWN DIRECTION.
          </h2>
        </div>

        {/* Editorial Body Statement & Coordinates */}
        <div
          ref={textRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px',
            alignItems: 'flex-start',
            maxWidth: '1100px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '40px',
          }}
        >
          <div>
            <div style={{
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              color: 'var(--accent-red)',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: '12px',
            }}>
              // PHILOSOPHY OF MOVEMENT
            </div>
            <p
              style={{
                fontSize: '1.25rem',
                color: '#F5F5F5',
                lineHeight: 1.5,
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.02em',
              }}
            >
              We don’t follow terrain. We reshape it. Conceived in the underground, perfected in the studio.
            </p>
          </div>

          <div>
            <div style={{
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '12px',
            }}>
              // STREETWEAR CULT
            </div>
            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}
            >
              RIDE/01 strips away commercial noise. No frivolous graphics, no unnecessary bulk. Just cold-pressed Canadian Hardrock maple, forged aerospace titanium, and high-rebound urethane calibrated for true velocity.
            </p>
          </div>

          <div>
            <div style={{
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '12px',
            }}>
              // ORIGIN & ARCHIVE
            </div>
            <div style={{ fontSize: '0.85rem', color: '#F5F5F5', fontFamily: 'var(--font-body)', lineHeight: 1.8 }}>
              <div>TOKYO: 35.6762° N, 139.6503° E</div>
              <div>LOS ANGELES: 34.0522° N, 118.2437° W</div>
              <div style={{ color: 'var(--accent-red)', marginTop: '6px' }}>SERIAL BATCH: #001 — #500</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
