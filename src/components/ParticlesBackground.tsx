import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: -o-radial-gradient(bottom, ellipse, #110917 0%, #0B0C1E 100%);
  background: radial-gradient(ellipse at bottom, #110917 0%, #0B0C1E 100%);
`;

const StarsContainer = styled.div`
  position: absolute;
  inset: 0;
  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
  -webkit-perspective: 1000px;
          perspective: 1000px;
  overflow: visible;

  div {
    position: absolute;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 50%;
    opacity: 0;
    will-change: transform, opacity;
    -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
  }
`;

export const ParticlesBackground: React.FC = () => {
  useEffect(() => {
    const starsContainer = document.querySelector('.particles-stars');
    if (!starsContainer) return;

    const CONFIG = {
      SPAWN_INTERVAL: 200,
      INITIAL_PARTICLES: 40,
      SPAWN_BATCH_SIZE: 2,
      TARGET_PARTICLE_COUNT: 80,
      MIN_SPAWN_RADIUS: 300,
      MAX_SPAWN_RADIUS: 500,
      MIN_SIZE: 2,
      MAX_SIZE: 5,
      MIN_DURATION: 12,
      MAX_DURATION: 18,
      CHECK_INTERVAL: 100,
      MIN_TANGENTIAL_SPEED: 50,
      MAX_TANGENTIAL_SPEED: 150,
      PARTICLE_COLORS: ['#DE8479', '#F4D8C4'],
    };

    const getScrollOffset = () => ({
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    });

    const createStar = () => {
      const star = document.createElement('div');
      const now = Date.now();
      
      star.dataset.createdAt = now.toString();
      star.dataset.lastChecked = now.toString();
      
      // Generate random position in a circle
      const angle = Math.random() * Math.PI * 2;
      const radius = CONFIG.MIN_SPAWN_RADIUS + 
        Math.random() * (CONFIG.MAX_SPAWN_RADIUS - CONFIG.MIN_SPAWN_RADIUS);
      const left = window.innerWidth / 2 + Math.cos(angle) * radius;
      const top = window.innerHeight / 2 + Math.sin(angle) * radius;
      
      const dx = left - window.innerWidth / 2;
      const dy = top - window.innerHeight / 2;

      // Calculate initial tangential velocity
      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
      const tangentialSpeed = CONFIG.MIN_TANGENTIAL_SPEED + 
        Math.random() * (CONFIG.MAX_TANGENTIAL_SPEED - CONFIG.MIN_TANGENTIAL_SPEED);
      
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
      
      const distanceRatio = distanceFromCenter / CONFIG.MAX_SPAWN_RADIUS;
      const duration = CONFIG.MIN_DURATION + 
        (distanceRatio * (CONFIG.MAX_DURATION - CONFIG.MIN_DURATION));
      star.style.setProperty('--animation-duration', `${duration}s`);
      
      const colorIndex = Math.floor(Math.random() * CONFIG.PARTICLE_COLORS.length);
      star.style.backgroundColor = CONFIG.PARTICLE_COLORS[colorIndex];
      
      const size = CONFIG.MIN_SIZE + 
        Math.pow(Math.random(), 2) * (CONFIG.MAX_SIZE - CONFIG.MIN_SIZE);
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      star.addEventListener('animationend', () => {
        if (star.isConnected && !star.dataset.removing) {
          removeParticle(star);
        }
      });
      
      return star;
    };

    const removeParticle = (particle: HTMLElement) => {
      if (particle.dataset.removing === 'true') return;
      
      particle.dataset.removing = 'true';
      if (particle.isConnected) {
        particle.remove();
      }

      const newStar = createStar();
      starsContainer.appendChild(newStar);
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

    return () => {
      clearInterval(spawnInterval);
    };
  }, []);

  return (
    <Container>
      <StarsContainer className="particles-stars" />
    </Container>
  );
};
