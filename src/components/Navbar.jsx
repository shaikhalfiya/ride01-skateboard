import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ShoppingBag } from 'lucide-react';
import { playClick, playHover, toggleSound, isSoundEnabled } from '../utils/sound';

export default function Navbar({ onOpenShop }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const state = toggleSound();
    setSoundOn(state);
    if (state) playClick();
  };

  const scrollTo = (id) => {
    playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          transition: 'all 0.4s ease',
          backgroundColor: scrolled ? 'rgba(8, 8, 8, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          padding: scrolled ? '16px 0' : '28px 0',
        }}
      >
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Name */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={playHover}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
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
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--accent-red)',
              }}
            >
              /01
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: 'var(--text-secondary)',
                marginLeft: '8px',
                padding: '2px 6px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'inline-block',
              }}
            >
              ED.01
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '36px',
            }}
            className="desktop-nav"
          >
            {[
              { label: 'HOME', id: 'hero' },
              { label: 'COLLECTION', id: 'experience' },
              { label: 'SPECS', id: 'details' },
              { label: 'ABOUT', id: 'statement' },
              { label: 'CONTACT', id: 'cta' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={playHover}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  color: 'var(--text-secondary)',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                  padding: '4px 0',
                }}
                className="nav-link-hover"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions: Audio Toggle + Minimal Shop Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundOn ? 'Mute Audio' : 'Enable Audio'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                color: soundOn ? 'var(--accent-red)' : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={playHover}
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Shop Button */}
            <button
              onClick={() => {
                playClick();
                if (onOpenShop) onOpenShop();
              }}
              onMouseEnter={playHover}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: '#F5F5F5',
                color: '#080808',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="shop-nav-btn"
            >
              <ShoppingBag size={14} />
              <span>SHOP</span>
              <span
                style={{
                  backgroundColor: 'var(--accent-red)',
                  color: '#FFFFFF',
                  fontSize: '0.65rem',
                  padding: '1px 5px',
                  borderRadius: '2px',
                  marginLeft: '2px',
                }}
              >
                $280
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                color: '#F5F5F5',
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            backgroundColor: '#080808',
            padding: '100px 32px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {[
              { label: 'HOME', id: 'hero' },
              { label: 'COLLECTION', id: 'experience' },
              { label: 'DETAILS & SPECS', id: 'details' },
              { label: 'BRAND STATEMENT', id: 'statement' },
              { label: 'ORDER & CONTACT', id: 'cta' },
            ].map((item, idx) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.id)}
                style={{
                  textAlign: 'left',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: '#F5F5F5',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-red)', fontFamily: 'var(--font-body)' }}>
                  0{idx + 1}
                </span>
                {item.label}
              </button>
            ))}
          </div>

          <div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenShop) onOpenShop();
              }}
              className="btn-primary"
              style={{ width: '100%', marginBottom: '16px' }}
            >
              SHOP LIMITED EDITION — $280
            </button>
            <div style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.15em' }}>
              STRICTLY LIMITED TO 500 PIECES
            </div>
          </div>
        </div>
      )}

      <style>{`
        .nav-link-hover:hover {
          color: #F5F5F5 !important;
        }
        .shop-nav-btn:hover {
          background-color: var(--accent-red) !important;
          color: #FFFFFF !important;
          transform: translateY(-2px);
          box-shadow: 0 0 20px var(--accent-red-glow);
        }
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
