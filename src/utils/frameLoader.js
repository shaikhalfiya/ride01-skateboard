export const TOTAL_FRAMES = 50;

export const getFrameUrl = (index) => {
  const frameNumber = String(index + 1).padStart(3, '0');
  return `/frames/ezgif-frame-${frameNumber}.jpg`;
};

/**
 * Preloads all sequential skateboard frames into memory.
 * @param {Function} onProgress - Callback with percentage (0 to 100)
 * @returns {Promise<HTMLImageElement[]>}
 */
export const preloadFrames = (onProgress) => {
  return new Promise((resolve) => {
    const images = new Array(TOTAL_FRAMES);
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const url = getFrameUrl(i);

      img.src = url;

      const handleImageLoad = () => {
        images[i] = img;
        loadedCount++;
        if (onProgress) {
          const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
          onProgress(progress);
        }
        if (loadedCount === TOTAL_FRAMES) {
          resolve(images);
        }
      };

      const handleImageError = () => {
        // Fallback: still store img reference and increment to avoid blocking
        console.warn(`Failed to load frame ${url}`);
        images[i] = img;
        loadedCount++;
        if (onProgress) {
          const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
          onProgress(progress);
        }
        if (loadedCount === TOTAL_FRAMES) {
          resolve(images);
        }
      };

      if (img.complete) {
        handleImageLoad();
      } else {
        img.onload = handleImageLoad;
        img.onerror = handleImageError;
      }
    }
  });
};
