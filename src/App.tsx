import React, { useEffect } from 'react'
import { Loader } from './components/Loader'

const App: React.FC = () => {
  useEffect(() => {
    const starsContainer = document.querySelector('.hero-black-hole-stars');
    const topPhotonRing = document.querySelector('.upper-photon-ring');
    const bottomPhotonRing = document.querySelector('.lower-photon-ring');
    if (!starsContainer || !topPhotonRing || !bottomPhotonRing) return;

    const CONFIG = {
      // Spawn Settings
      SPAWN_INTERVAL: 200,
      INITIAL_PARTICLES: 40,
      SPAWN_BATCH_SIZE: 2,
      TARGET_PARTICLE_COUNT: 80,
      MIN_SPAWN_RADIUS: 300,
      MAX_SPAWN_RADIUS: 500,
      
      // Particle Appearance
      MIN_SIZE: 2,
      MAX_SIZE: 5,
      
      // Animation Timings
      MIN_DURATION: 12,
      MAX_DURATION: 18,
      
      // Touch Detection
      CHECK_INTERVAL: 100,

      // Spiral Motion
      MIN_TANGENTIAL_SPEED: 50,
      MAX_TANGENTIAL_SPEED: 150,
      
      PARTICLE_COLORS: [
        '#6B21A8', '#9333EA', '#A855F7', '#C084FC', '#D8B4FE', '#F3E8FF'
      ],

    };

    const createStar = () => {
      const star = document.createElement('div');
      const now = Date.now();
      
      star.dataset.createdAt = now.toString();
      star.dataset.lastChecked = now.toString();
      
      const blackHoleCenter = getPhotonRingsCenter();
      const centerX = blackHoleCenter.x;
      const centerY = blackHoleCenter.y;
      
      // Generate random position in a circle around the center
      const angle = Math.random() * Math.PI * 2;
      const radius = CONFIG.MIN_SPAWN_RADIUS + 
        Math.random() * (CONFIG.MAX_SPAWN_RADIUS - CONFIG.MIN_SPAWN_RADIUS);
      const left = centerX + Math.cos(angle) * radius;
      const top = centerY + Math.sin(angle) * radius;
      
      const dx = left - centerX;
      const dy = top - centerY;

      // Calculate initial tangential velocity
      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
      const tangentialSpeed = CONFIG.MIN_TANGENTIAL_SPEED + 
        Math.random() * (CONFIG.MAX_TANGENTIAL_SPEED - CONFIG.MIN_TANGENTIAL_SPEED);
      
      // Calculate unit vector perpendicular to radius for tangential motion
      const tangentialAngle = angle + Math.PI / 2;
      const tangentialX = Math.cos(tangentialAngle) * tangentialSpeed * (distanceFromCenter / CONFIG.MAX_SPAWN_RADIUS);
      const tangentialY = Math.sin(tangentialAngle) * tangentialSpeed * (distanceFromCenter / CONFIG.MAX_SPAWN_RADIUS);
      
      star.style.left = `${left}px`;
      star.style.top = `${top}px`;
      star.style.setProperty('--start-x', `${dx}px`);
      star.style.setProperty('--start-y', `${dy}px`);
      star.style.setProperty('--tangential-x', `${tangentialX}px`);
      star.style.setProperty('--tangential-y', `${tangentialY}px`);
      
      star.className = 'spiral-particle';
      
      // Duration based on distance from center
      const distanceRatio = distanceFromCenter / CONFIG.MAX_SPAWN_RADIUS;
      const duration = CONFIG.MIN_DURATION + 
        (distanceRatio * (CONFIG.MAX_DURATION - CONFIG.MIN_DURATION));
      star.style.setProperty('--animation-duration', `${duration}s`);
      
      // Random color with more whites
      const colorIndex = Math.floor(Math.random() * CONFIG.PARTICLE_COLORS.length);
      star.style.backgroundColor = CONFIG.PARTICLE_COLORS[colorIndex];
      
      // Random size, smaller particles more common
      const size = CONFIG.MIN_SIZE + 
        Math.pow(Math.random(), 2) * (CONFIG.MAX_SIZE - CONFIG.MIN_SIZE);
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      // Add animation end listener to respawn particle
      star.addEventListener('animationend', () => {
        if (star.isConnected && !star.dataset.removing) {
          removeParticle(star);
        }
      });
      
      return star;
    };

    const getPhotonRingsCenter = () => {
      const topRect = topPhotonRing.getBoundingClientRect();
      const bottomRect = bottomPhotonRing.getBoundingClientRect();
      
      return {
        x: (topRect.left + topRect.right) / 2,
        y: (topRect.top + bottomRect.bottom) / 2,
        width: Math.max(topRect.width, bottomRect.width),
        height: bottomRect.bottom - topRect.top
      };
    };

    const checkCollisionWithPhotonRings = (particleRect: DOMRect): boolean => {
      const topRingRect = topPhotonRing.getBoundingClientRect();
      const bottomRingRect = bottomPhotonRing.getBoundingClientRect();
      
      const particleCenter = {
        x: particleRect.left + particleRect.width / 2,
        y: particleRect.top + particleRect.height / 2
      };
      
      // Improved collision detection with margin
      const margin = 5;
      const inTopRing = (
        particleCenter.x >= topRingRect.left - margin &&
        particleCenter.x <= topRingRect.right + margin &&
        particleCenter.y >= topRingRect.top - margin &&
        particleCenter.y <= topRingRect.bottom + margin
      );
      
      const inBottomRing = (
        particleCenter.x >= bottomRingRect.left - margin &&
        particleCenter.x <= bottomRingRect.right + margin &&
        particleCenter.y >= bottomRingRect.top - margin &&
        particleCenter.y <= bottomRingRect.bottom + margin
      );
      
      return inTopRing || inBottomRing;
    };

    const removeParticle = (particle: HTMLElement) => {
      if (particle.dataset.removing === 'true') return;
      
      // Mark as removing and remove immediately
      particle.dataset.removing = 'true';
      if (particle.isConnected) {
        particle.remove();
      }

      // Immediately spawn a new particle to maintain count
      const newStar = createStar();
      starsContainer.appendChild(newStar);
    };

    const checkParticleTouch = (particle: HTMLElement) => {
      const now = Date.now();
      const lastChecked = parseInt(particle.dataset.lastChecked || '0');
      
      if (now - lastChecked < CONFIG.CHECK_INTERVAL) return;
      particle.dataset.lastChecked = now.toString();
      
      if (particle.dataset.removing === 'true') return;
      
      const particleRect = particle.getBoundingClientRect();
      
      if (checkCollisionWithPhotonRings(particleRect)) {
        removeParticle(particle);
      }
    };

    const manageParticles = () => {
      const currentCount = starsContainer.children.length;
      const neededParticles = CONFIG.TARGET_PARTICLE_COUNT - currentCount;
      
      if (neededParticles > 0) {
        const batchSize = Math.min(CONFIG.SPAWN_BATCH_SIZE, neededParticles);
        for (let i = 0; i < batchSize; i++) {
          const star = createStar();
          starsContainer.appendChild(star);
        }
      }
    };

    const checkTouches = () => {
      const particles = Array.from(starsContainer.children) as HTMLElement[];
      particles.forEach(checkParticleTouch);
    };

    // Initialize system
    starsContainer.innerHTML = '';
    
    // Create initial particles in batches
    const createInitialBatch = (index: number) => {
      const batchSize = 10;
      const start = index * batchSize;
      const end = Math.min(start + batchSize, CONFIG.INITIAL_PARTICLES);
      
      for (let i = start; i < end; i++) {
        const star = createStar();
        starsContainer.appendChild(star);
      }
      
      if (end < CONFIG.INITIAL_PARTICLES) {
        setTimeout(() => createInitialBatch(index + 1), 100);
      }
    };
    
    createInitialBatch(0);

    const spawnInterval = setInterval(manageParticles, CONFIG.SPAWN_INTERVAL);
    const touchCheckInterval = setInterval(checkTouches, CONFIG.CHECK_INTERVAL);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(touchCheckInterval);
    };
  }, []);

  return (
    <>
      <div className="gradient-bg"></div>
      <div className="content">
        <div className="hero-black-hole">
          <div className="hero-black-hole-stars"></div>
          <Loader />
        </div>
      </div>
    </>
  )
}

export default App
