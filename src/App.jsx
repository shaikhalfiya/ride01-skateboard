import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroScrollExperience from './components/HeroScrollExperience';
import ProductDetails from './components/ProductDetails';
import BrandStatement from './components/BrandStatement';
import FinalCTA from './components/FinalCTA';
import ShopModal from './components/ShopModal';
import { preloadFrames } from './utils/frameLoader';

export default function App() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [frames, setFrames] = useState([]);
  const [preloaderGone, setPreloaderGone] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  useEffect(() => {
    preloadFrames((progress) => {
      setLoadProgress(progress);
    }).then((loadedImages) => {
      setFrames(loadedImages);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh', color: '#F5F5F5', position: 'relative' }}>
      {/* Noise Grain Overlay for cinematic analog texture */}
      <div className="noise-overlay" />

      {/* 1. Preloader */}
      {!preloaderGone && (
        <Preloader
          progress={loadProgress}
          isLoaded={isLoaded}
          onFinish={() => setPreloaderGone(true)}
        />
      )}

      {/* 2. Global Navbar */}
      <Navbar onOpenShop={() => setShopOpen(true)} />

      <main>
        {/* 3. Section 1 (Hero) & Section 2 (Pinned Scroll Animation Experience) */}
        <HeroScrollExperience
          images={frames}
          isReady={isLoaded}
          onOpenShop={() => setShopOpen(true)}
        />

        {/* 4. Section 3: Product Details */}
        <ProductDetails onOpenShop={() => setShopOpen(true)} />

        {/* 5. Section 4: Brand Statement */}
        <BrandStatement />

        {/* 6. Section 5: Final CTA & Minimal Footer */}
        <FinalCTA onOpenShop={() => setShopOpen(true)} />
      </main>

      {/* 7. Shop / Customizer Modal */}
      <ShopModal isOpen={shopOpen} onClose={() => setShopOpen(false)} />
    </div>
  );
}
