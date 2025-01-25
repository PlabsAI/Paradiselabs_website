import React, { useEffect } from 'react';
import { Loader } from './Loader';
import styled from 'styled-components';

const CompanyTitle = styled.h1`
  position: absolute;
  top: 20%;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
          transform: translateX(-50%);
  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 800;
  z-index: 2;
  margin: 0;
  background: -o-linear-gradient(45deg, #fff, #d000ff, #9000ff);
  background: linear-gradient(45deg, #fff, #d000ff, #9000ff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: gradientFlow 8s linear infinite;
          animation: gradientFlow 8s linear infinite;
  text-shadow: 0 0 30px rgba(208, 0, 255, 0.3);
  letter-spacing: -0.025em;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &::before {
    content: attr(data-text);
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
    color: transparent;
    -webkit-text-stroke: 1px rgba(208, 0, 255, 0.1);
    z-index: -1;
    -webkit-filter: blur(8px);
            filter: blur(8px);
    letter-spacing: 8px;
    opacity: 0.5;
  }
`;

export const BlackHoleView: React.FC = () => {
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
          '#DE8479', '#F4D8C4'
      ],
    };

    const getScrollOffset = () => ({
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    });

    const getPhotonRingsCenter = () => {
      const containerRect = starsContainer.getBoundingClientRect();
      const topRect = topPhotonRing.getBoundingClientRect();
      const bottomRect = bottomPhotonRing.getBoundingClientRect();
      const scroll = getScrollOffset();
      
      return {
        x: ((topRect.left + topRect.right) / 2) - containerRect.left + scroll.x,
        y: ((topRect.top + bottomRect.bottom) / 2) - containerRect.top + scroll.y,
        width: Math.max(topRect.width, bottomRect.width),
        height: bottomRect.bottom - topRect.top
      };
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

    const checkCollisionWithPhotonRings = (particleRect: DOMRect): boolean => {
      const containerRect = starsContainer.getBoundingClientRect();
      const topRingRect = topPhotonRing.getBoundingClientRect();
      const bottomRingRect = bottomPhotonRing.getBoundingClientRect();
      const scroll = getScrollOffset();
      
      const particleCenter = {
        x: (particleRect.left - containerRect.left + scroll.x) + particleRect.width / 2,
        y: (particleRect.top - containerRect.top + scroll.y) + particleRect.height / 2
      };
      
      // Convert ring positions to be relative to container
      const topRingRelative = {
        left: topRingRect.left - containerRect.left + scroll.x,
        right: topRingRect.right - containerRect.left + scroll.x,
        top: topRingRect.top - containerRect.top + scroll.y,
        bottom: topRingRect.bottom - containerRect.top + scroll.y
      };
      
      const bottomRingRelative = {
        left: bottomRingRect.left - containerRect.left + scroll.x,
        right: bottomRingRect.right - containerRect.left + scroll.x,
        top: bottomRingRect.top - containerRect.top + scroll.y,
        bottom: bottomRingRect.bottom - containerRect.top + scroll.y
      };
      
      // Improved collision detection with margin
      const margin = 5;
      const inTopRing = (
        particleCenter.x >= topRingRelative.left - margin &&
        particleCenter.x <= topRingRelative.right + margin &&
        particleCenter.y >= topRingRelative.top - margin &&
        particleCenter.y <= topRingRelative.bottom + margin
      );
      
      const inBottomRing = (
        particleCenter.x >= bottomRingRelative.left - margin &&
        particleCenter.x <= bottomRingRelative.right + margin &&
        particleCenter.y >= bottomRingRelative.top - margin &&
        particleCenter.y <= bottomRingRelative.bottom + margin
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
          <CompanyTitle data-text="ParadiseLabs">ParadiseLabs</CompanyTitle>
          <div className="hero-black-hole-stars"></div>
          <Loader />
        </div>
      </div>
    </>
  );
};
