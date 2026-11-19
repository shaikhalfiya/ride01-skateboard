import React, { useState } from 'react';
import { Layers, Disc, Settings, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { playClick, playHover } from '../utils/sound';

export default function ProductDetails({ onOpenShop }) {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: '01',
      title: 'PREMIUM DECK',
      subtitle: 'A carefully designed deck built for stability and control.',
      icon: Layers,
      specs: [
        { label: 'MATERIAL', value: '7-Ply Canadian Hardrock Maple' },
        { label: 'DIMENSIONS', value: '32.5" Length × 8.25" Width' },
        { label: 'CONCAVE', value: 'Custom Medium Progressive' },
        { label: 'CONSTRUCTION', value: 'Cold-Pressed Epoxy Resin Glue' },
      ],
      description: 'Hand-selected North American maple veneers engineered for ultimate pop, torsional stiffness, and durability under extreme stress. Features high-resolution heat-transfer wolf graphic with UV scratch-resistant seal.',
    },
    {
      id: '02',
      title: 'PRECISION TRUCKS',
      subtitle: 'Reliable construction with a clean metallic finish.',
      icon: Settings,
      specs: [
        { label: 'WIDTH', value: '149mm Hanger (8.25" Axle)' },
        { label: 'BASEPLATE', value: 'Forged Aircraft Aluminum 6061-T6' },
        { label: 'KINGPIN', value: 'Hollow Grade-8 Titanium Alloy' },
        { label: 'GEOMETRY', value: '52° High-Response Turning Angle' },
      ],
      description: 'Manufactured with aerospace-grade forged titanium kingpins and raw industrial tumble finish. Delivers zero-slop turning dynamics and razor-sharp carve control on any urban surface.',
    },
    {
      id: '03',
      title: 'HIGH-PERFORMANCE WHEELS',
      subtitle: 'Smooth movement and dependable performance.',
      icon: Disc,
      specs: [
        { label: 'DIAMETER', value: '54mm Street/Park Profile' },
        { label: 'DUROMETER', value: '99A High-Rebound Urethane' },
        { label: 'BEARINGS', value: 'ABEC-9 Precision Ceramic' },
        { label: 'TREAD', value: 'Radial Micro-Groove Anti-Flatspot' },
      ],
      description: 'Custom formulated high-rebound urethane that resists flat-spots, paired with ABEC-9 ceramic ball bearings shielded with self-lubricating nylon retainers for perpetual roll velocity.',
    },
  ];

  return (
    <section
      id="details"
      style={{
        backgroundColor: '#080808',
        padding: '140px 0',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ marginBottom: '80px', maxWidth: '800px' }}>
          <div style={{ marginBottom: '16px' }}>
            <span className="tag-pill">
              <span className="tag-dot" />
              ENGINEERING & ARCHITECTURE
            </span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.6rem)',
              lineHeight: 1,
              color: '#F5F5F5',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            MORE THAN A<br />
            <span style={{ color: 'var(--accent-red)' }}>SKATEBOARD.</span>
          </h2>

          <p
            className="font-body"
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '560px',
            }}
          >
            Every curve, alloy, and bearing was selected with obsessive purpose. Designed for those who demand absolute mechanical synergy.
          </p>
        </div>

        {/* Feature Blocks - 3 Column Interactive Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '64px',
          }}
        >
          {features.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = activeTab === idx;
            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  playHover();
                  setActiveTab(idx);
                }}
                onClick={() => {
                  playClick();
                  setActiveTab(idx);
                }}
                style={{
                  backgroundColor: isHovered ? 'rgba(20, 20, 20, 0.95)' : 'rgba(14, 14, 14, 0.6)',
                  border: isHovered ? '1px solid var(--accent-red)' : '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  boxShadow: isHovered ? '0 12px 30px rgba(217, 39, 50, 0.15)' : 'none',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                {/* Accent Top Line Indicator */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: isHovered ? '100%' : '0%',
                    height: '2px',
                    backgroundColor: 'var(--accent-red)',
                    transition: 'width 0.35s ease',
                  }}
                />

                {/* Card Top: Number & Icon */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: isHovered ? 'var(--accent-red)' : 'var(--text-secondary)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {item.id}
                    </span>

                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: isHovered ? 'rgba(217, 39, 50, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isHovered ? 'var(--accent-red)' : '#AAAAAA',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.5rem',
                      letterSpacing: '0.04em',
                      color: '#F5F5F5',
                      marginBottom: '12px',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '28px',
                    }}
                  >
                    {item.subtitle}
                  </p>

                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: '#999999',
                      lineHeight: 1.6,
                      marginBottom: '28px',
                      paddingBottom: '24px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Specs list */}
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {item.specs.map((s) => (
                      <div
                        key={s.label}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '0.74rem',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        <span style={{ color: 'var(--text-secondary)', letterSpacing: '0.12em' }}>{s.label}</span>
                        <span style={{ color: '#F5F5F5', fontWeight: 600 }}>{s.value}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      color: isHovered ? 'var(--accent-red)' : 'var(--text-secondary)',
                    }}
                  >
                    <span>SPECIFIED COMPONENT</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Blueprint Footer Banner */}
        <div
          style={{
            backgroundColor: '#0E0E0E',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <CheckCircle2 color="var(--accent-red)" size={28} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#F5F5F5', textTransform: 'uppercase' }}>
                CERTIFIED STREET & PARK PERFORMANCE
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Every complete board is individually inspected and laser-engraved with its unique serial number.
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              playClick();
              if (onOpenShop) onOpenShop();
            }}
            onMouseEnter={playHover}
            className="btn-primary"
            style={{ padding: '12px 28px' }}
          >
            ORDER COMPLETE // $280
          </button>
        </div>
      </div>
    </section>
  );
}
