import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Check, Send } from 'lucide-react';
import { playClick, playHover } from '../utils/sound';

export default function FinalCTA({ onOpenShop }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    playClick();
    setSubscribed(true);
  };

  const scrollTo = (id) => {
    playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="cta"
      style={{
        backgroundColor: '#080808',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Upper CTA Section */}
      <div
        style={{
          padding: '160px 0 120px',
          position: 'relative',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Subtle Ambient Red Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '400px',
            background: 'radial-gradient(ellipse at center, rgba(217, 39, 50, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          
          <div style={{ display: 'inline-flex', marginBottom: '24px' }}>
            <span className="tag-pill">
              <span className="tag-dot" />
              WORLDWIDE EXPRESS DISPATCH
            </span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              lineHeight: 0.95,
              color: '#F5F5F5',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            READY TO<br />
            <span style={{ color: 'var(--accent-red)' }}>RIDE?</span>
          </h2>

          <p
            className="font-body"
            style={{
              fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 auto 48px',
            }}
          >
            Your next ride starts here. Limited to 500 sequentially numbered complete boards worldwide.
          </p>

          {/* Allocation Progress Bar */}
          <div
            style={{
              maxWidth: '380px',
              margin: '0 auto 48px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '16px 20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', letterSpacing: '0.15em', marginBottom: '10px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>BATCH 01 AVAILABILITY</span>
              <span style={{ color: '#F5F5F5', fontWeight: 700 }}>412 / 500 CLAIMED</span>
            </div>
            <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.1)', position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: '82.4%',
                  backgroundColor: 'var(--accent-red)',
                  boxShadow: '0 0 10px var(--accent-red)',
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                playClick();
                if (onOpenShop) onOpenShop();
              }}
              onMouseEnter={playHover}
              className="btn-primary"
              style={{ padding: '18px 44px', fontSize: '0.9rem' }}
            >
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => {
                playClick();
                scrollTo('details');
              }}
              onMouseEnter={playHover}
              className="btn-secondary"
              style={{ padding: '18px 36px', fontSize: '0.9rem' }}
            >
              <span>VIEW HARDWARE SPECS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer style={{ padding: '80px 0 50px', backgroundColor: '#050505' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '48px',
              paddingBottom: '60px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Col 1: Brand & Bio */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: '#F5F5F5',
                  }}
                >
                  RIDE
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: 'var(--accent-red)',
                  }}
                >
                  /01
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '280px' }}>
                High-performance streetwear skateboards engineered for the boundary-breakers. Designed in Tokyo & Los Angeles.
              </p>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: '#F5F5F5', fontWeight: 700, marginBottom: '20px' }}>
                NAVIGATION
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'HOME', id: 'hero' },
                  { label: '3D EXPERIENCE', id: 'hero' },
                  { label: 'TECHNICAL SPECS', id: 'details' },
                  { label: 'BRAND MANIFESTO', id: 'statement' },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      onMouseEnter={playHover}
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-secondary)',
                        transition: 'color 0.2s ease',
                      }}
                      className="footer-link-hover"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Social & Archive */}
            <div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: '#F5F5F5', fontWeight: 700, marginBottom: '20px' }}>
                COMMUNITY & ARCHIVE
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['INSTAGRAM // @RIDE01', 'X // @RIDE01_LABS', 'YOUTUBE // CINEMATIC', 'DISCORD // UNDERGROUND'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        playClick();
                      }}
                      onMouseEnter={playHover}
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                      className="footer-link-hover"
                    >
                      <span>{item}</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Newsletter */}
            <div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: '#F5F5F5', fontWeight: 700, marginBottom: '20px' }}>
                PRIVATE ARCHIVE ACCESS
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                Subscribe for private drop notifications and engineering releases.
              </p>

              {subscribed ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(217, 39, 50, 0.1)',
                  border: '1px solid var(--accent-red)',
                  fontSize: '0.8rem',
                  color: '#F5F5F5',
                }}>
                  <Check size={16} color="var(--accent-red)" />
                  <span>Subscribed to RIDE/01 Archive.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex' }}>
                  <input
                    type="email"
                    placeholder="ENTER EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      padding: '12px 16px',
                      fontSize: '0.8rem',
                      color: '#F5F5F5',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: 'var(--accent-red)',
                      border: '1px solid var(--accent-red)',
                      padding: '0 16px',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div
            style={{
              paddingTop: '32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              fontSize: '0.74rem',
              color: 'var(--text-secondary)',
            }}
          >
            <div>
              © 2026 RIDE/01 INC. ALL RIGHTS RESERVED.
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                PRIVACY POLICY
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                TERMS OF SERVICE
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                CERTIFIED ORIGINAL
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .footer-link-hover:hover {
          color: #F5F5F5 !important;
        }
      `}</style>
    </section>
  );
}
