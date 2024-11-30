/**
 * Loader.tsx
 * A scientifically-inspired black hole visualization component that creates a stunning visual
 * representation of a black hole with its key physical features:
 * - Event horizon (central black disk)
 * - Photon rings (upper and lower light-bending effects)
 * - Accretion disk (matter spiraling into the black hole)
 * - Horizon lines (gravitational lensing effects)
 * 
 * Technical Features:
 * - High-performance animations using CSS transforms and hardware acceleration
 * - Responsive design using vmax units for consistent scaling
 * - Memoized component to prevent unnecessary re-renders
 * - Error boundary protection for graceful failure handling
 * - Customizable properties for size and colors
 * - Optimized gradients and animations for smooth rendering
 * 
 * Visual Effects:
 * - Pulsing glow animations simulating energy fluctuations
 * - Rotating disk patterns mimicking matter flow
 * - Multi-layered shadows for depth perception
 * - Sepia filter for visual consistency
 * - Complex gradient patterns for realistic light distortion
 */

import React, { memo } from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * Component Props Interface
 * Defines customizable properties for the black hole visualization
 */
interface LoaderProps {
  size?: number;          // Base size multiplier for scaling the entire visualization
  primaryColor?: string;  // Primary color for light effects and rings
  glowColor?: string;     // Color for the glow/energy effects
  spaceColor?: string;    // Background space color
}

/**
 * Internal Style Props Interface
 * Used by styled-components for dynamic styling
 */
interface StyleProps {
  readonly size: number;
  readonly colors: {
    light: string;    // Primary light color
    glow: string;     // Glow effect color
    space: string;    // Space background color
  };
  readonly isVisible: boolean;
}

// Animation keyframes
const breatheEffect = keyframes`
  0% { 
    transform: scale(1) rotate(-5deg);
    filter: sepia(0.5) brightness(1.1);
  }
  50% { 
    transform: scale(0.80) rotate(-5deg);
    filter: sepia(0.8) brightness(0.85);
  }
  100% { 
    transform: scale(1) rotate(-5deg);
    filter: sepia(0.5) brightness(1.1);
  }
`;

const glowPulse = keyframes`
  0% { filter: brightness(1.3) blur(3px); }
  50% { filter: brightness(1) blur(1px); }
  100% { filter: brightness(1.3) blur(3px); }
`;

const diskFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

/**
 * Error Boundary Component
 * Provides graceful fallback if the visualization fails to render
 */
class LoaderErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Error rendering black hole visualization</div>;
    }
    return this.props.children;
  }
}

/**
 * Main Loader Component
 * Memoized for performance optimization
 * Renders the complete black hole visualization with all its elements
 */
export const Loader: React.FC<LoaderProps> = memo(({
  size = 0.5,
  primaryColor = '#ffffff',
  glowColor = '#f1edb6',
  spaceColor = '#020C10'
}) => {
  return (
    <LoaderErrorBoundary>
      <BlackHoleContainer
        size={size}
        colors={{
          light: primaryColor,
          glow: glowColor,
          space: spaceColor
        }}
        isVisible={true}
      >
        <div className="black-hole">
          <div className="lower-photon-ring" />
          <div className="event-horizon" />
          <div className="horizon-lines" />
          <div className="accretion-disk" />
          <div className="upper-photon-ring" />
        </div>
      </BlackHoleContainer>
    </LoaderErrorBoundary>
  );
});

Loader.displayName = 'Loader';

/**
 * Styled Container Component
 * Houses all the visual elements with complex CSS styling
 */
const BlackHoleContainer = styled.div<StyleProps>`
  // Dynamic CSS Variables for flexible styling
  --light: ${props => props.colors.light};
  --glow: ${props => props.colors.glow};
  --space: ${props => props.colors.space};
  --size-multiplier: ${props => props.size};
  --visibility: ${props => props.isVisible ? 1 : 0};

  // Container optimization with hardware acceleration
  width: 100vw;
  height: 100vh;
  background: var(--space);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;

  // Global performance optimizations
  *, *:before, *:after { 
    box-sizing: border-box;
    position: absolute;
    will-change: transform, filter, opacity;
    backface-visibility: hidden;
    transition: opacity 0.5s ease-out;
  }

  // Main black hole container with 3D effects
  .black-hole {
    width: calc(90vmax * var(--size-multiplier));
    height: calc(60vmax * var(--size-multiplier));
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transform-origin: center center;
    filter: sepia(0.5);
    animation: ${breatheEffect} 10s ease-in-out infinite;
    transform-style: preserve-3d;

    > div {
      position: absolute;
      opacity: var(--visibility);
    }
  }

  // Lower photon ring - simulates light bending below the black hole
  .lower-photon-ring {
    opacity: var(--visibility);
    width: calc(18vmax * var(--size-multiplier));
    height: calc(10vmax * var(--size-multiplier));
    border-radius: calc(1vmax * var(--size-multiplier)) calc(1vmax * var(--size-multiplier)) 
                  calc(20vmax * var(--size-multiplier)) calc(20vmax * var(--size-multiplier));
    top: calc(28.5vmax * var(--size-multiplier));
    border: 2px solid var(--light);
    border-top: 0;
    background: var(--space);
    margin-left: calc(0.75vmax * var(--size-multiplier));
    box-shadow: 
      0 0 5px 2px var(--space),
      0px 0px 5px 2px var(--glow),
      0px -3px 10px -3px var(--glow) inset;
  }

  // Event horizon - the point of no return
  .event-horizon {
    opacity: var(--visibility);
    width: calc(22vmax * var(--size-multiplier));
    height: calc(22vmax * var(--size-multiplier));
    border-radius: 100%;
    top: calc(19vmax * var(--size-multiplier));
    border: calc(2vmax * var(--size-multiplier)) solid var(--light);
    box-shadow: 
      0 0px 15px 3px var(--glow),
      0 0px 5px 2px var(--glow) inset;
    animation: ${glowPulse} 4s ease-in-out infinite;

    // Side flares for dimensional effect
    &:before, &:after {
      content: "";
      left: calc(-5.365vmax * var(--size-multiplier));
      top: calc(3.85vmax * var(--size-multiplier));
      width: calc(3.5vmax * var(--size-multiplier));
      height: calc(4.5vmax * var(--size-multiplier));
      border-radius: 0px 0px 34px 10px;
      transform: rotate(23deg);
      box-shadow: calc(16px * var(--size-multiplier)) calc(2px * var(--size-multiplier)) 0px 1px var(--light);
    }

    &:after {
      left: calc(19.885vmax * var(--size-multiplier));
      transform: rotateY(180deg) rotateZ(23deg);
    }
  }

  // Horizon lines - gravitational lensing visualization
  .horizon-lines {
    opacity: var(--visibility);
    width: calc(22vmax * var(--size-multiplier));
    height: calc(22vmax * var(--size-multiplier));
    border-radius: 100%;
    background: 
      linear-gradient(90deg,
        transparent 0%,
        var(--glow) 20%,
        var(--light) 50%,
        var(--glow) 80%,
        transparent 100%
      ),
      radial-gradient(
        circle at 50% 50%,
        transparent, transparent calc(9.25vmax * var(--size-multiplier)), 
        var(--glow) calc(9.5vmax * var(--size-multiplier)), var(--glow) calc(9.55vmax * var(--size-multiplier)), 
        var(--light) calc(9.55vmax * var(--size-multiplier)), var(--light) calc(9.95vmax * var(--size-multiplier)),
        var(--glow) calc(9.95vmax * var(--size-multiplier)), var(--glow) calc(10.05vmax * var(--size-multiplier)),
        var(--light) calc(10.05vmax * var(--size-multiplier)), var(--light) calc(10.35vmax * var(--size-multiplier)),
        var(--glow) calc(10.35vmax * var(--size-multiplier)), var(--glow) calc(10.42vmax * var(--size-multiplier)),
        var(--light) calc(10.42vmax * var(--size-multiplier)), var(--light) calc(10.75vmax * var(--size-multiplier)),
        var(--glow) calc(10.75vmax * var(--size-multiplier)), var(--glow) calc(10.79vmax * var(--size-multiplier)),
        var(--light) calc(10.79vmax * var(--size-multiplier)), var(--light) calc(10.95vmax * var(--size-multiplier)),
        red calc(22vmax * var(--size-multiplier))
      );
    background-size: 200% 0%, 100% 100%;
    animation: ${diskFlow} 8s linear infinite;
  }

  // Accretion disk - matter spiraling into the black hole
  .accretion-disk {
    opacity: var(--visibility);
    width: calc(54vmax * var(--size-multiplier));
    height: calc(6vmax * var(--size-multiplier));
    border-radius: 100%;
    top: calc(28.5vmax * var(--size-multiplier));
    background: 
      linear-gradient(90deg,
        transparent 0%,
        var(--glow) 20%,
        var(--light) 50%,
        var(--glow) 80%,
        transparent 100%
      ),
      radial-gradient(
        ellipse at 49.5% 40%, 
        transparent, transparent calc(11.15vmax * var(--size-multiplier)), 
        var(--light) calc(11.15vmax * var(--size-multiplier)), var(--space) calc(11.15vmax * var(--size-multiplier)), 
        var(--glow) calc(11.2vmax * var(--size-multiplier)), var(--light) calc(11.2vmax * var(--size-multiplier)), 
        var(--light) calc(12.5vmax * var(--size-multiplier)), var(--space) calc(12.5vmax * var(--size-multiplier)), 
        var(--glow) calc(12.65vmax * var(--size-multiplier)), var(--light) calc(12.65vmax * var(--size-multiplier)),
        var(--light) calc(13.5vmax * var(--size-multiplier)), var(--space) calc(13.5vmax * var(--size-multiplier)), 
        var(--glow) calc(13.55vmax * var(--size-multiplier)), var(--light) calc(13.55vmax * var(--size-multiplier)),
        var(--light) calc(14.45vmax * var(--size-multiplier)), var(--space) calc(14.45vmax * var(--size-multiplier)), 
        var(--glow) calc(14.55vmax * var(--size-multiplier)), var(--light) calc(14.55vmax * var(--size-multiplier)), 
        var(--light) calc(15.5vmax * var(--size-multiplier)), var(--space) calc(15.5vmax * var(--size-multiplier)), 
        var(--glow) calc(15.65vmax * var(--size-multiplier)), var(--light) calc(15.65vmax * var(--size-multiplier)),
        var(--light) calc(16.5vmax * var(--size-multiplier)), var(--space) calc(16.5vmax * var(--size-multiplier)), 
        var(--glow) calc(16.65vmax * var(--size-multiplier)), var(--light) calc(16.65vmax * var(--size-multiplier)),
        var(--light) calc(17.6vmax * var(--size-multiplier)), var(--space) calc(17.6vmax * var(--size-multiplier)),
        var(--glow) calc(17.65vmax * var(--size-multiplier)), var(--light) calc(17.65vmax * var(--size-multiplier)),
        var(--light) calc(18.25vmax * var(--size-multiplier)), var(--space) calc(18.25vmax * var(--size-multiplier)),
        var(--glow) calc(18.35vmax * var(--size-multiplier)), var(--light) calc(18.35vmax * var(--size-multiplier)),
        var(--light) calc(19.15vmax * var(--size-multiplier)), var(--space) calc(19.15vmax * var(--size-multiplier)),
        var(--glow) calc(19.35vmax * var(--size-multiplier)), var(--light) calc(19.35vmax * var(--size-multiplier))
      );
    background-size: 120% 100%, 100% 100%;
    animation: ${diskFlow} 8s linear infinite;
    box-shadow: 
      0 0 3px 0 var(--light),
      0 0px 15px 3px var(--glow),
      0 15px 10px 10px var(--space);
  }

  // Upper photon ring - simulates light bending above the black hole
  .upper-photon-ring {
    opacity: var(--visibility);
    width: calc(17vmax * var(--size-multiplier));
    height: calc(9vmax * var(--size-multiplier));
    border-radius: calc(20vmax * var(--size-multiplier)) calc(20vmax * var(--size-multiplier)) 
                  calc(1vmax * var(--size-multiplier)) calc(1vmax * var(--size-multiplier));
    background: var(--space);
    top: calc(21.5vmax * var(--size-multiplier));
    box-shadow: 
      0 5px 0px 2px var(--space),
      -3px 5px 0px 2px var(--space),
      4px 5px 0px 2px var(--space),
      -2px 3px 3px 0px var(--glow);
    animation: ${glowPulse} 3s ease-in-out infinite;

    // Shadow element
    &:before {
      content: "";
      width: calc(18vmax * var(--size-multiplier));
      height: calc(3vmax * var(--size-multiplier));
      background: var(--space);
      left: calc(-0.5vmax * var(--size-multiplier));
      border-radius: 100%;
      bottom: calc(-7.6vmax * var(--size-multiplier));
      box-shadow: 0 0 1px 1px var(--space);
      position: relative;
      display: block;
    }

    // Ring element
    &:after {
      content: "";
      opacity: 0.75;
      width: calc(17vmax * var(--size-multiplier));
      height: calc(17vmax * var(--size-multiplier));
      border: 2px solid var(--light);
      border-radius: 100%;
      border-bottom-color: transparent;
      border-left-color: transparent;
      transform: rotate(-46deg);
      left: calc(0.25vmax * var(--size-multiplier));
      top: calc(1.25vmax * var(--size-multiplier));
      box-shadow: 
        -5px 5px 5px -4px var(--glow) inset,
        2px -2px 4px -2px var(--glow);
    }
  }
`;
