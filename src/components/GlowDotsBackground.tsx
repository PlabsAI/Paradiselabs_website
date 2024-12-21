import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;

const DotsContainer = styled.div`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  perspective: 1000px;
`;

export const GlowDotsBackground: React.FC = () => {
  useEffect(() => {
    const container = document.querySelector('.glow-dots-container');
    if (!container) return;

    const CONFIG = {
      DOT_COUNT: 50,
      MIN_RADIUS: 2,
      MAX_RADIUS: 6,
      MIN_DURATION: 3,
      MAX_DURATION: 8,
      SPAWN_INTERVAL: 200,
      COLORS: ['#d000ff', '#9000ff', '#f1edb6'],
    };

    const createDot = () => {
      const dot = document.createElement('div');
      dot.className = 'glow-dot';
      
      // Random position
      dot.style.left = `${Math.random() * 100}vw`;
      dot.style.top = `${Math.random() * 100}vh`;
      
      // Random size
      const size = CONFIG.MIN_RADIUS + Math.random() * (CONFIG.MAX_RADIUS - CONFIG.MIN_RADIUS);
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      
      // Random color
      const colorIndex = Math.floor(Math.random() * CONFIG.COLORS.length);
      dot.style.backgroundColor = CONFIG.COLORS[colorIndex];
      
      // Random animation duration
      const duration = CONFIG.MIN_DURATION + Math.random() * (CONFIG.MAX_DURATION - CONFIG.MIN_DURATION);
      dot.style.animation = `glowPulse ${duration}s infinite`;
      
      // Random animation delay
      dot.style.animationDelay = `${Math.random() * -CONFIG.MAX_DURATION}s`;

      return dot;
    };

    // Initialize dots
    for (let i = 0; i < CONFIG.DOT_COUNT; i++) {
      const dot = createDot();
      container.appendChild(dot);
    }

    // Spawn new dots periodically
    const spawnInterval = setInterval(() => {
      const dots = container.children;
      if (dots.length < CONFIG.DOT_COUNT) {
        const dot = createDot();
        container.appendChild(dot);
      }
    }, CONFIG.SPAWN_INTERVAL);

    return () => {
      clearInterval(spawnInterval);
      container.innerHTML = '';
    };
  }, []);

  return (
    <Container>
      <DotsContainer className="glow-dots-container" />
    </Container>
  );
};
