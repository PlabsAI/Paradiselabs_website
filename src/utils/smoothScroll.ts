import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    let isScrolling = false;
    let velocity = 0;
    let lastTime = 0;
    const friction = 0.92;
    const minVelocity = 0.1;
    const maxVelocity = 50;
    const sensitivity = 0.3;
    const frameRate = 1000 / 60;
    const naturalScrollThreshold = 1.5;

    const handleWheel = (e: WheelEvent) => {
      const now = performance.now();
      const deltaTime = now - lastTime;
      
      if (deltaTime > frameRate) {
        if (!isScrolling) {
          isScrolling = true;
          requestAnimationFrame(smoothScroll);
        }

        // Calculate velocity based on time delta
        const deltaVelocity = (e.deltaY * sensitivity) * (deltaTime / frameRate);
        
        // Apply natural scrolling threshold
        if (Math.abs(deltaVelocity) > naturalScrollThreshold) {
          velocity += deltaVelocity;
          velocity = Math.min(Math.max(velocity, -maxVelocity), maxVelocity);
          e.preventDefault();
        }
        
        lastTime = now;
      }
    };

    const smoothScroll = (timestamp: number) => {
      if (Math.abs(velocity) > minVelocity) {
        window.scrollBy({
          top: velocity,
          behavior: 'instant'
        });
        
        const deltaTime = timestamp - lastTime;
        velocity *= Math.pow
import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    let isScrolling = false;
    let velocity = 0;
    let lastTime = 0;
    const friction = 0.94;
    const minVelocity = 0.2;
    const maxVelocity = 80;
    const sensitivity = 0.35;
    const frameRate = 1000 / 60;

    const handleWheel = (e: WheelEvent) => {
      const now = performance.now();
      const deltaTime = now - lastTime;
      
      if (deltaTime > frameRate) {
        if (!isScrolling) {
          isScrolling = true;
          requestAnimationFrame(smoothScroll);
        }
        
        velocity += (e.deltaY * sensitivity) * (deltaTime / frameRate);
        velocity = Math.min(Math.max(velocity, -maxVelocity), maxVelocity);
        lastTime = now;
        e.preventDefault();
      }
    };

    const smoothScroll = (timestamp: number) => {
      if (Math.abs(velocity) > minVelocity) {
        window.scrollBy({
          top: velocity,
          behavior: 'instant'
        });
        
        const deltaTime = timestamp - lastTime;
        velocity *= Math.pow(friction, deltaTime / frameRate);
        
        requestAnimationFrame(smoothScroll);
      } else {
        isScrolling = false;
        velocity = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return null;
};

export default useSmoothScroll;
import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    let isScrolling = false;
    let velocity = 0;
    let lastTime = 0;
    const friction = 0.94; // Adjusted for smoother deceleration
    const minVelocity = 0.2; // Lower threshold for smoother stop
    const maxVelocity = 80; // Increased maximum velocity
    const sensitivity = 0.35; // Adjusted sensitivity
    const frameRate = 1000 / 60; // Target 60fps

    const handleWheel = (e: WheelEvent) => {
      const now = performance.now();
      const deltaTime = now - lastTime;
      
      if (deltaTime > frameRate) {
        if (!isScrolling) {
          isScrolling = true;
          requestAnimationFrame(smoothScroll);
        }
        
        // Calculate velocity based on time delta
        velocity += (e.deltaY * sensitivity) * (deltaTime / frameRate);
        velocity = Math.min(Math.max(velocity, -maxVelocity), maxVelocity);
        lastTime = now;
        e.preventDefault();
      }
    };

    const smoothScroll = (timestamp: number) => {
      if (Math.abs(velocity) > minVelocity) {
        window.scrollBy({
          top: velocity,
          behavior: 'instant'
        });
        
        // Apply friction based on frame time
        const deltaTime = timestamp - lastTime;
        velocity *= Math.pow(friction, deltaTime / frameRate);
        
        requestAnimationFrame(smoothScroll);
      } else {
        isScrolling = false;
        velocity = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return null;
};

export default useSmoothScroll;
import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    let isScrolling = false;
    let velocity = 0;
    const friction = 0.96;
    const minVelocity = 0.5;
    const maxVelocity = 50;
    const sensitivity = 0.4;

    const handleWheel = (e: WheelEvent) => {
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScroll);
      }
      
      velocity += e.deltaY * sensitivity;
      velocity = Math.min(Math.max(velocity, -maxVelocity), maxVelocity);
      e.preventDefault();
    };

    const smoothScroll = () => {
      if (Math.abs(velocity) > minVelocity) {
        window.scrollBy({
          top: velocity,
          behavior: 'instant'
        });
        velocity *= friction;
        requestAnimationFrame(smoothScroll);
      } else {
        isScrolling = false;
        velocity = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
};

export default useSmoothScroll;
import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;
import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    let isScrolling = false;
    let velocity = 0;
    const friction = 0.96; // Increased friction for smoother stop
    const minVelocity = 0.5; // Increased minimum velocity
    const maxVelocity = 50; // Added maximum velocity
    const sensitivity = 0.4; // Adjusted sensitivity

    const handleWheel = (e: WheelEvent) => {
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScroll);
      }
      
      // Add the wheel delta to velocity with sensitivity adjustment
      velocity += e.deltaY * sensitivity;
      velocity = Math.min(Math.max(velocity, -maxVelocity), maxVelocity);
      e.preventDefault();
    };

    const smoothScroll = () => {
      if (Math.abs(velocity) > minVelocity) {
        window.scrollBy({
          top: velocity,
          behavior: 'instant'
        });
        velocity *= friction;
        requestAnimationFrame(smoothScroll);
      } else {
        isScrolling = false;
        velocity = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
};

export default useSmoothScroll;
import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;
import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    let velocity = 0;
    const friction = 0.92;
    const minVelocity = 0.1;

    const handleWheel = (e: WheelEvent) => {
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScroll);
      }
      
      // Add the wheel delta to velocity
      velocity += e.deltaY * 0.3;
      e.preventDefault();
    };

    const smoothScroll = () => {
      if (Math.abs(velocity) > minVelocity) {
        window.scrollBy(0, velocity);
        velocity *= friction;
        requestAnimationFrame(smoothScroll);
      } else {
        isScrolling = false;
        velocity = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
};

export default useSmoothScroll;
