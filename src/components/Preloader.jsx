import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ progress, isLoaded, onFinish }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        width: `${progress}%`,
        duration: 0.2,
        ease: 'power1.out',
      });
    }
  }, [progress]);

  useEffect(() => {
    if (isLoaded) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onFinish) onFinish();
        },
      });

      tl.to(contentRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: 'power3.inOut',
        delay: 0.3,
      })
      .to(containerRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.6,
        ease: 'power2.inOut',
      });
    }
  }, [isLoaded, onFinish]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#080808',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        ref={contentRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '360px',
          width: '100%',
        }}
      >
        {/* Brand logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: '#F5F5F5',
          }}>
            RIDE
          </span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            fontWeight: 800,
            color: 'var(--accent-red)',
          }}>
            /01
          </span>
        </div>

        {/* Progress bar container */}
        <div style={{
          width: '100%',
          height: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '16px',
        }}>
          <div
            ref={barRef}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: '0%',
              backgroundColor: 'var(--accent-red)',
              boxShadow: '0 0 12px var(--accent-red)',
            }}
          />
        </div>

        {/* Metadata row */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
        }}>
          <span>INITIALIZING 3D ENGINE</span>
          <span style={{ color: '#F5F5F5', fontWeight: 600 }}>{progress}%</span>
        </div>

        {/* Subtext */}
        <div style={{
          marginTop: '28px',
          fontSize: '0.68rem',
          letterSpacing: '0.2em',
          color: '#555555',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}>
          50 SEQUENTIAL FRAMES // 4K RENDER
        </div>
      </div>
    </div>
  );
}
