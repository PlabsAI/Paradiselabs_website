import { createGlobalStyle, DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    logoAnimation: '#d000ff',
    headerText: '#d0d4d7',
    gradientStart: '#2a0845',
    gradientEnd: '#6441A5',
    textPrimary: 'hsl(0, 0%, 100%)',
    textSecondary: 'hsl(0, 0%, 90%)',
    textTertiary: 'hsl(0, 0%, 70%)',
    neonPrimary: '#d000ff',
    neonSecondary: '#9000ff',
    glassBg: 'rgba(255, 255, 255, 0.03)',
    glassBorder: 'rgba(255, 255, 255, 0.05)',
    glassShine: 'rgba(255, 255, 255, 0.1)',
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace",
    display: "'Clash Display', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  fontSizes: {
    xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
    sm: 'clamp(0.875rem, 0.8rem + 0.25vw, 1rem)',
    base: 'clamp(1rem, 0.9rem + 0.25vw, 1.125rem)',
    md: 'clamp(1.125rem, 1rem + 0.25vw, 1.25rem)',
    lg: 'clamp(1.25rem, 1.1rem + 0.25vw, 1.5rem)',
    xl: 'clamp(1.5rem, 1.3rem + 0.25vw, 1.875rem)',
    '2xl': 'clamp(1.875rem, 1.6rem + 0.25vw, 2.25rem)',
    '3xl': 'clamp(2.25rem, 2rem + 0.25vw, 3rem)',
    '4xl': 'clamp(3rem, 2.5rem + 0.25vw, 4rem)',
    '5xl': 'clamp(4rem, 3rem + 0.25vw, 5rem)',
  },
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    none: 1,
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

const GlobalStyles = createGlobalStyle`
/* Firefox-specific optimizations to match Chrome exactly */
@-moz-document url-prefix() {
  /* Core animation performance optimizations */

  .early-access-badge,
  .waitlist-form button,
  .feature-card,
  .spiral-particle,
  .hero-section h1,
  .section h2,
  .gradient-text {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
    will-change: transform, opacity, filter;
    transform-style: preserve-3d;
    contain: paint layout;
    paint-order: normal;
  }

  /* Enhanced hover text animations */
  .hover-text {
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s ease;
    will-change: width, filter;
    contain: paint layout;
  }

  /* Enhanced gradient animations */
  .gradient-text,

  .hero-section h1 {
    background-clip: text;
    transform: translateZ(0);
    will-change: background-position, transform;
    contain: paint style;
    paint-order: normal;
    animation: gradientFlow 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  .section h2 {
    font-size: var(--text-3xl);
    margin-bottom: 2rem;
    font-weight: var(--font-extrabold);
    background-image: -moz-linear-gradient(45deg, #fff, #d000ff, #9000ff);
    color: transparent;
    text-align: center;
    letter-spacing: var(--tracking-tight);
    position: relative;
    z-index: 1;
    transform: translateZ(0);
    backface-visibility: hidden;
    will-change: transform;
  }

  .section h2::before {
    content: attr(data-text);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: transparent;
    -moz-text-stroke: 1px rgba(208, 0, 255, 0.1);
    z-index: -1;
    filter: url(#blur);
    letter-spacing: 8px;
    opacity: 0.5;
    pointer-events: none;
  }

  .section h2::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background-image: -moz-linear-gradient(90deg, transparent, rgba(208, 0, 255, 0.5), transparent);
    will-change: opacity, transform;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  @supports (-moz-appearance: none) {
    .section h2 {
      text-rendering: optimizeLegibility;
      font-smooth: always;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .section h2 {
      animation: glow 2s ease-in-out infinite alternate;
    }

    @keyframes glow {
      from { text-shadow: 0 0 5px rgba(208, 0, 255, 0.1); }
      to { text-shadow: 0 0 20px rgba(208, 0, 255, 0.3); }
    }
  }

  /* Enhanced composite layer handling */
  .button,
  .waitlist-form,
  .early-access-badge,
  .feature-card {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center center;
    background-size: 200% 200%;
    background-position: 0% 0%;
    will-change: transform, box-shadow, background-position, border-color;
  }

  .feature-card:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(208, 0, 255, 0.2);
    border-color: rgba(208, 0, 255, 0.4);
    background-position: 100% 100%;
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(208, 0, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
    pointer-events: none;
  }

  .feature-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                rgba(208, 0, 255, 0.1) 0%, 
                transparent 60%);
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity;
    pointer-events: none;
  }

  .feature-card:hover::before {
    transform: translateX(100%);
  }

  .feature-card:hover::after {
    opacity: 1;
  }

  .feature-card h3 {
    background: linear-gradient(45deg, #fff, #d000ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    position: relative;
  }

  .feature-card h3::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #d000ff, transparent);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .feature-card:hover h3::after {
    width: 100%;
  }










  /* Enhanced text rendering */
  body {
    text-rendering: optimizeLegibility;
    transform-style: preserve-3d;
    contain: paint style layout;
    paint-order: normal;
  }

















  /* Enhanced particle animations */
  .spiral-particle {
    filter: blur(0.5px);
    will-change: transform, opacity, filter;
    contain: paint layout;
    paint-order: normal;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Enhanced flexbox rendering */
  .features-grid,
  .content {
    display: flex;
    will-change: transform;
    contain: layout style;
  }

  /* Enhanced form animations */
  .waitlist-form {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                border-color 0.3s ease;
  }

  .waitlist-form input {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.3s ease;
    will-change: transform, box-shadow, background-color;
  }

  .waitlist-form button {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.3s ease,
                letter-spacing 0.3s ease;
    will-change: transform, box-shadow, letter-spacing;
  }

  /* Enhanced gradient flow */
  @keyframes gradientFlow {
    0% {
      background-position: 0% 50%;
      transform: translateZ(0);
      filter: hue-rotate(0deg);
    }
    50% {
      background-position: 100% 50%;
      transform: translateZ(0);
      filter: hue-rotate(10deg);
    }
    100% {
      background-position: 0% 50%;
      transform: translateZ(0);
      filter: hue-rotate(0deg);
    }
  }

  /* Enhanced floating animation */
  @keyframes float {
    0%, 100% { 
      transform: translateY(0) translateZ(0);
      filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.2));
    }
    50% { 
      transform: translateY(-10px) translateZ(0);
      filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.25));
    }
  }

  /* Enhanced pulse animation */
  @keyframes glowPulse {
    0%, 100% { 
      opacity: 0.3; 
      transform: scale(1) translateZ(0);
      filter: blur(2px) brightness(1);
    }
    50% { 
      opacity: 0.6; 
      transform: scale(1.5) translateZ(0);
      filter: blur(3px) brightness(1.2);
    }
  }

  /* Enhanced title reveal animation */
  @keyframes titleReveal {
    0% {
      opacity: 0;
      transform: translateY(20px) translateZ(0);
      filter: blur(4px);
    }
    50% {
      opacity: 0.5;
      transform: translateY(10px) translateZ(0);
      filter: blur(2px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) translateZ(0);
      filter: blur(0);
    }
  }

  /* Enhanced spiral animation */
  @keyframes spiralToCenter {
    0% {
      transform: translate(var(--start-x), var(--start-y)) rotate(0deg) scale(1) translateZ(0);
      opacity: 0;
      filter: blur(2px);
    }
    5% {
      opacity: 0.8;
      transform: translate(var(--start-x), var(--start-y)) rotate(-45deg) scale(0.98) translateZ(0);
      filter: blur(1px);
    }
    25% {
      transform: 
          translate(
              calc(var(--start-x) * 0.75 + var(--tangential-x)), 
              calc(var(--start-y) * 0.75 + var(--tangential-y))
          ) 
          rotate(-180deg) scale(0.9) translateZ(0);
      opacity: 0.8;
      filter: blur(0.8px);
    }
    50% {
      transform: 
          translate(
              calc(var(--start-x) * 0.5 + var(--tangential-x) * 1.5), 
              calc(var(--start-y) * 0.5 + var(--tangential-y) * 1.5)
          ) 
          rotate(-360deg) scale(0.8) translateZ(0);
      opacity: 0.7;
      filter: blur(0.6px);
    }
    75% {
      transform: 
          translate(
              calc(var(--start-x) * 0.25 + var(--tangential-x) * 1.25), 
              calc(var(--start-y) * 0.25 + var(--tangential-y) * 1.25)
          ) 
          rotate(-540deg) scale(0.6) translateZ(0);
      opacity: 0.5;
      filter: blur(0.4px);
    }
    100% {
      transform: 
          translate(
              calc(var(--tangential-x) * 0.5), 
              calc(var(--tangential-y) * 0.5)
          ) 
          rotate(-720deg) scale(0.2) translateZ(0);
      opacity: 0;
      filter: blur(0.2px);
    }
  }
}
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: #050C14;
    overflow-x: hidden;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: ${({ theme }) => theme.lineHeights.normal};
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  @keyframes hue-rotate {
    0% { 
      filter: hue-rotate(0deg);
      -webkit-filter: hue-rotate(0deg);
    }
    to { 
      filter: hue-rotate(360deg);
      -webkit-filter: hue-rotate(360deg);
    }
  }

  .header {
    padding: 0 20px;
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    background: rgba(69, 42, 69, 0.08);
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 10;
  }

  .header-logo {
    z-index: 2;
  }

  .logo-with-name {
    align-items: center;
    display: flex;
    text-decoration: none;
    color: inherit;
  }

  .logo-with-name-logo {
    height: 36px;
    margin-right: 12px;
    width: 36px;
  }

  .logo-with-name-name {
    font-feature-settings: "ss01" on, "cv10" on, "calt" off, "liga" off;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: ${({ theme }) => theme.lineHeights.normal};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  .header .container-lg {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 26px 0;
    position: relative;

    &:before {
      background: radial-gradient(62.87% 100% at 50% 100%, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0) 100%);
      bottom: 0;
      content: "";
      height: 1px;
      left: 0;
      position: absolute;
      width: 100%;
    }
  }

  .header-nav {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    display: flex;
    left: 50%;
    margin: 0 auto;
    padding: 10px 12px;
    position: absolute;
    transform: translate(-50%);
    list-style: none;
    gap: 2rem;
  }

  .header-nav li {
    margin: 0 12px;
  }

  .header-nav-link {
    color: hsla(0, 0%, 100%, 0.8);
    text-decoration: none;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    transition: all 0.3s ease;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: ${({ theme }) => theme.colors.logoAnimation};
      transition: width 0.3s ease;
    }

    &:hover {
      color: #fff;

      &::after {
        width: 100%;
      }
    }
  }

  .header-actions {
    align-items: center;
    display: flex;
    z-index: 2;
    margin-right: 2rem;
  }

  .button {
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.textPrimary};
    display: block;
    padding: 8px 16px;
    position: relative;
    width: max-content;
    font-feature-settings: "ss01" on, "cv10" on, "calt" off, "liga" off;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.tight};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    text-decoration: none;

    &:before,
    &:after,
    .button-border {
      border-radius: inherit;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: -1;
    }

    &:before,
    &:after {
      content: "";
      display: block;
      transition: 0.2s opacity cubic-bezier(0.6, 0.6, 0, 1);
    }

    &:after {
      opacity: 0;
    }

    &:hover {
      &:before {
        opacity: 0;
      }

      &:after {
        opacity: 1;
      }
    }
  }

  .section {
    min-height: 100vh;
    padding: 6rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #f4f0ff;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 50% 50%, rgba(208, 0, 255, 0.05) 0%, transparent 70%);
      pointer-events: none;
      animation: pulseGradient 3s ease-in-out infinite;
    }

    h2 {
      font-size: ${({ theme }) => theme.fontSizes['3xl']};
      margin-bottom: 2rem;
      font-weight: ${({ theme }) => theme.fontWeights.extrabold};
      background-image: linear-gradient(45deg, #fff, ${({ theme }) => theme.colors.neonPrimary}, ${({ theme }) => theme.colors.neonSecondary});
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-align: center;
      letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
      position: relative;
      text-shadow: 0 0 30px rgba(208, 0, 255, 0.3);
      z-index: 1;

      &::before {
        content: attr(data-text);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: transparent;
        -webkit-text-stroke: 1px rgba(208, 0, 255, 0.1);
        z-index: -1;
        filter: blur(8px);
        letter-spacing: 8px;
        opacity: 0.5;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 3px;
        background-image: linear-gradient(90deg, transparent, rgba(208, 0, 255, 0.5), transparent);
      }
    }

    p {
      font-size: ${({ theme }) => theme.fontSizes.md};
      max-width: 800px;
      margin: 0 auto;
      line-height: ${({ theme }) => theme.lineHeights.relaxed};
      color: ${({ theme }) => theme.colors.textSecondary};
      text-align: center;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }

  @keyframes pulseGradient {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  @-moz-document url-prefix() {
    .section h2 {
      text-rendering: optimizeLegibility;
      font-smooth: always;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .section h2 {
      animation: glow 2s ease-in-out infinite alternate;
    }

    @keyframes glow {
      from { text-shadow: 0 0 5px rgba(208, 0, 255, 0.1); }
      to { text-shadow: 0 0 20px rgba(208, 0, 255, 0.3); }
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 3rem auto;
    padding: 0 1rem;
    perspective: 1000px;
  }

  .feature-card {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );
    padding: 2rem;
    border-radius: 16px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-position 0.8s ease-out;
    position: relative;
    overflow: hidden;
    background-size: 200% 200%;
    background-position: 0% 0%;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent, rgba(208, 0, 255, 0.1), transparent);
      transform: translateX(-100%);
      transition: transform 0.6s ease;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                rgba(208, 0, 255, 0.1) 0%, 
                transparent 60%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    &:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.3),
        0 0 30px rgba(208, 0, 255, 0.2);
      border-color: rgba(208, 0, 255, 0.4);
      background-position: 100% 100%;

      &::before {
        transform: translateX(100%);
      }

      &::after {
        opacity: 1;
      }
    }

    h3 {
      font-size: ${({ theme }) => theme.fontSizes.xl};
      margin-bottom: 1.2rem;
      color: ${({ theme }) => theme.colors.textPrimary};
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      background: linear-gradient(45deg, #fff, ${({ theme }) => theme.colors.neonPrimary});
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 40px;
        height: 2px;
        background: linear-gradient(90deg, ${({ theme }) => theme.colors.neonPrimary}, transparent);
        transition: width 0.3s ease;
      }
    }

    &:hover h3::after {
      width: 100%;
    }

    p {
      font-size: ${({ theme }) => theme.fontSizes.sm};
      color: ${({ theme }) => theme.colors.textSecondary};
      text-align: left;
      line-height: ${({ theme }) => theme.lineHeights.relaxed};
      margin-top: 1rem;
    }
  }

  .animated-logo-button {
    margin: 0;
    height: auto;
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.extrabold};
    position: relative;
    text-decoration: none;
    display: inline-block;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .actual-text {
    display: inline-block;
    color: ${({ theme }) => theme.colors.headerText};
    font-family: inherit;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
    
    @keyframes shifting_glow {
    0% {
      filter: drop-shadow(0 0 23px ${({ theme }) => theme.colors.logoAnimation}) brightness(1);
    }
    50% {
      filter: drop-shadow(0 0 23px ${({ theme }) => theme.colors.logoAnimation}) brightness(1.3);
    }
    100% {
      filter: drop-shadow(0 0 23px ${({ theme }) => theme.colors.logoAnimation}) brightness(1);
    }
  }

  .hover-text {
    position: absolute;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.logoAnimation};
    width: 0;
    inset: 0;
    overflow: hidden;
    transition: width 0.5s ease;
    font-family: inherit;
  }

  .animated-logo-button:hover .hover-text {
    width: 100%;
    filter: drop-shadow(0 0 25px ${({ theme }) => theme.colors.logoAnimation});
    animation: shifting_glow 1.5s ease-in-out infinite alternate;
  }

  .hero-section {
    text-align: center;
    padding-top: 8rem;
    position: relative;

    h1 {
      font-size: ${({ theme }) => theme.fontSizes['4xl']};
      line-height: ${({ theme }) => theme.lineHeights.tight};
      margin-bottom: 1.5rem;
      background: linear-gradient(45deg, #fff, ${({ theme }) => theme.colors.neonPrimary}, ${({ theme }) => theme.colors.neonSecondary});
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
      font-weight: ${({ theme }) => theme.fontWeights.extrabold};
      letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
      animation: titleReveal 1s ease-out forwards,
               gradientFlow 8s linear infinite;
    }
  }

  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .waitlist-form {
    max-width: 600px;
    margin: 1rem auto;
    padding: 3.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 52px;
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(208, 0, 255, 0.2);
    transform: perspective(1000px) rotateX(0deg);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.5, 1);
    position: relative;
    overflow: hidden;
    z-index: 2;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                rgba(255, 0, 255, 0.05) 0%, 
                transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: perspective(1000px) rotateX(2deg) translateY(-8px);
      box-shadow: 
        0 35px 70px rgba(0, 0, 0, 0.3),
        0 0 50px rgba(208, 0, 255, 0.2);
      border-color: rgba(208, 0, 255, 0.4);

      &::before {
        opacity: 1;
      }
    }

    input {
      width: 100%;
      padding: 1.1rem;
      margin: 1rem 0;
      border: 2px solid rgba(208, 0, 255, 0.3);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.03);
      color: ${({ theme }) => theme.colors.textPrimary};
      font-size: ${({ theme }) => theme.fontSizes.sm};
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 3;

      &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.neonPrimary};
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 
          0 0 20px rgba(208, 0, 255, 0.2),
          inset 0 2px 4px rgba(0, 0, 0, 0.1);
        transform: translateY(-3px);
      }
    }

    button {
      width: 100%;
      padding: 1.4rem;
      margin-top: 2rem;
      background: linear-gradient(45deg, ${({ theme }) => theme.colors.neonPrimary}, ${({ theme }) => theme.colors.neonSecondary});
      background-size: 200% auto;
      border: none;
      border-radius: 16px;
      color: ${({ theme }) => theme.colors.textPrimary};
      font-size: ${({ theme }) => theme.fontSizes.md};
      font-weight: ${({ theme }) => theme.fontWeights.semibold};
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      text-transform: uppercase;
      letter-spacing: ${({ theme }) => theme.letterSpacing.wider};
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
                  transparent, 
                  rgba(255, 255, 255, 0.2), 
                  transparent);
        transition: 0.6s;
      }

      &:hover {
        transform: translateY(-3px);
        box-shadow: 
          0 20px 40px rgba(208, 0, 255, 0.4),
          0 0 30px rgba(208, 0, 255, 0.3);
        background-position: right center;
        letter-spacing: ${({ theme }) => theme.letterSpacing.widest};

        &::before {
          left: 100%;
        }
      }
    }
  }

  .early-access-badge {
    background: linear-gradient(45deg, 
                rgba(208, 0, 255, 0.15), 
                rgba(144, 0, 255, 0.15));
    color: ${({ theme }) => theme.colors.textPrimary};
    padding: 1rem 2rem;
    border-radius: 30px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin-bottom: 3rem;
    display: inline-block;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    animation: float 6s ease-in-out infinite;
    box-shadow: 
      0 15px 30px rgba(0, 0, 0, 0.2),
      0 0 20px rgba(208, 0, 255, 0.2);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at center, 
                rgba(255, 255, 255, 0.1) 0%, 
                transparent 70%);
      animation: rotate 10s linear infinite;
    }

    &::after {
      content: '';
      position: absolute;
      inset: -2px;
      background: linear-gradient(45deg, 
        rgba(208, 0, 255, 0.5),
        rgba(144, 0, 255, 0.5)
      );
      border-radius: inherit;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover::after {
      opacity: 0.2;
    }
  }

  .background-animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  }

  .glow-dot {
    position: absolute;
    width: 4px;
    height: 4px;
    background: ${({ theme }) => theme.colors.logoAnimation};
    border-radius: 50%;
    filter: blur(2px);
    animation: glowPulse 3s infinite;
  }

  .header-toggle {
    margin-left: 18px;
    padding: 5px;
    cursor: pointer;

    div {
      width: 20px;
      height: 1.5px;
      background-color: #fff;
      border-radius: 500px;
      transition: all 0.3s ease-in-out;

      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }

  .header-toggle-active {
    div:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    div:nth-child(2) {
      opacity: 0;
    }

    div:nth-child(3) {
      transform: rotate(-45deg) translate(4px, -5px);
    }
  }

  #root {
    min-height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .gradient-bg {
    position: absolute;
    inset: 0;
    height: 580px;
    background: #050C14;
    filter: blur(8px);
    -webkit-filter: blur(8px);
  }

  .content {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-black-hole {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-black-hole-stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    transform-style: preserve-3d;
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
      transform-style: preserve-3d;
    }
  }

  .spiral-particle {
    animation: spiralToCenter var(--animation-duration, 15s) cubic-bezier(0.4, 0, 0.2, 1) forwards;
    box-shadow: 
      0 0 4px rgba(255, 255, 255, 0.8),
      0 0 8px rgba(255, 255, 255, 0.4),
      0 0 12px rgba(255, 51, 51, 0.2);
    transform-origin: center center;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    perspective: 1000px;
    will-change: transform, opacity;
    contain: layout style paint;

    &[data-removing="true"] {
      animation: none !important;
      opacity: 0 !important;
      transition: opacity 0.01s linear;
    }
  }

  @keyframes spiralToCenter {
    0% {
      transform: translate3d(var(--start-x), var(--start-y), 0) rotate(0deg) scale(1);
      opacity: 0;
    }
    5% {
      opacity: 0.8;
      transform: translate3d(var(--start-x), var(--start-y), 0) rotate(-45deg) scale(0.98);
    }
    25% {
      transform: 
        translate3d(
          calc(var(--start-x) * 0.75 + var(--tangential-x)), 
          calc(var(--start-y) * 0.75 + var(--tangential-y)),
          0
        ) 
        rotate(-180deg) scale(0.9);
      opacity: 0.8;
    }
    50% {
      transform: 
        translate3d(
          calc(var(--start-x) * 0.5 + var(--tangential-x) * 1.5), 
          calc(var(--start-y) * 0.5 + var(--tangential-y) * 1.5),
          0
        ) 
        rotate(-360deg) scale(0.8);
      opacity: 0.7;
    }
    75% {
      transform: 
        translate3d(
          calc(var(--start-x) * 0.25 + var(--tangential-x) * 1.25), 
          calc(var(--start-y) * 0.25 + var(--tangential-y) * 1.25),
          0
        ) 
        rotate(-540deg) scale(0.6);
      opacity: 0.5;
    }
    100% {
      transform: 
        translate3d(
          calc(var(--tangential-x) * 0.5), 
          calc(var(--tangential-y) * 0.5),
          0
        ) 
        rotate(-720deg) scale(0.2);
      opacity: 0;
    }
  }
`;

export default GlobalStyles