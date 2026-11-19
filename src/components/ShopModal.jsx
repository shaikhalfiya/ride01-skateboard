import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { playClick, playHover } from '../utils/sound';

export default function ShopModal({ isOpen, onClose }) {
  const [size, setSize] = useState('8.25"');
  const [finish, setFinish] = useState('Raw Industrial');
  const [added, setAdded] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    playClick();
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 2200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(16px)',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#0E0E0E',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)',
          position: 'relative',
          padding: '36px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            color: 'var(--text-secondary)',
            transition: 'color 0.2s',
          }}
        >
          <X size={22} />
        </button>

        {/* Modal Title */}
        <div style={{ marginBottom: '24px' }}>
          <span className="tag-pill" style={{ marginBottom: '12px' }}>
            <span className="tag-dot" />
            OFFICIAL BATCH // #001
          </span>
          <h3
            className="font-display"
            style={{
              fontSize: '1.8rem',
              color: '#F5F5F5',
              textTransform: 'uppercase',
              lineHeight: 1.1,
            }}
          >
            RIDE/01 COMPLETE
          </h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '8px' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-red)', fontFamily: 'var(--font-display)' }}>
              $280 USD
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              TAX INCLUDED // FREE EXPRESS SHIPPING
            </span>
          </div>
        </div>

        {/* Product Specs Configurator */}
        <div style={{ marginBottom: '28px' }}>
          {/* Deck Size Selector */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: '#F5F5F5', fontWeight: 600, marginBottom: '10px' }}>
              DECK WIDTH
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {['8.0"', '8.25"', '8.5"'].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    playClick();
                    setSize(val);
                  }}
                  onMouseEnter={playHover}
                  style={{
                    padding: '12px 0',
                    textAlign: 'center',
                    border: size === val ? '1px solid var(--accent-red)' : '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: size === val ? 'rgba(217, 39, 50, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                    color: size === val ? '#FFFFFF' : 'var(--text-secondary)',
                    fontWeight: size === val ? 700 : 400,
                    fontSize: '0.85rem',
                    transition: 'all 0.2s',
                  }}
                >
                  {val} {val === '8.25"' && <span style={{ fontSize: '0.65rem', display: 'block', color: 'var(--accent-red)' }}>STANDARD</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Trucks Finish */}
          <div>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: '#F5F5F5', fontWeight: 600, marginBottom: '10px' }}>
              TITANIUM HARDWARE FINISH
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {['Raw Industrial', 'Matte Obsidian'].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    playClick();
                    setFinish(val);
                  }}
                  onMouseEnter={playHover}
                  style={{
                    padding: '12px 14px',
                    textAlign: 'center',
                    border: finish === val ? '1px solid var(--accent-red)' : '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: finish === val ? 'rgba(217, 39, 50, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                    color: finish === val ? '#FFFFFF' : 'var(--text-secondary)',
                    fontWeight: finish === val ? 700 : 400,
                    fontSize: '0.82rem',
                    transition: 'all 0.2s',
                  }}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          padding: '14px 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '28px',
          fontSize: '0.68rem',
          color: 'var(--text-secondary)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Truck size={14} color="var(--accent-red)" />
            <span>DHL EXPRESS</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} color="var(--accent-red)" />
            <span>LIFETIME POP</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={14} color="var(--accent-red)" />
            <span>30-DAY RETURN</span>
          </div>
        </div>

        {/* Checkout Button */}
        {added ? (
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--accent-red)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '0.12em',
            }}
          >
            <Check size={20} />
            <span>ORDER CONFIRMED // ALLOCATED</span>
          </div>
        ) : (
          <button
            onClick={handleCheckout}
            onMouseEnter={playHover}
            className="btn-primary"
            style={{ width: '100%', padding: '18px', fontSize: '0.9rem' }}
          >
            <ShoppingBag size={18} />
            <span>PROCEED TO SECURE CHECKOUT</span>
          </button>
        )}
      </div>
    </div>
  );
}
