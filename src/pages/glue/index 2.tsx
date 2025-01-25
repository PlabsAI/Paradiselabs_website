import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { PageContainer } from '../../components/PageContainer';
import { GlowDotsBackground } from '../../components/GlowDotsBackground';

const fadeUpIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glowPulse = keyframes`
  0%, 100% { text-shadow: 0 0 50px rgba(208, 0, 255, 0.3); }
  50% { text-shadow: 0 0 80px rgba(208, 0, 255, 0.5); }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const StyledGlueContainer = styled(PageContainer)`
  padding: 0;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
  scroll-snap-type: y proximity;
  height: 100vh;
  overflow-y: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(208, 0, 255, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(208, 0, 255, 0.5);
    }
  }

  > * {
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
`;

const StyledSection = styled.section<{ $inView?: boolean; $noSnap?: boolean }>`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  scroll-snap-align: ${props => props.$noSnap ? 'none' : 'start'};
  scroll-snap-stop: always;
  scroll-margin-top: 0;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(5, 12, 20, 0.15);
    z-index: 1;
  }

  > * {
    opacity: ${props => props.$inView ? 1 : 0};
    transform: translateY(${props => props.$inView ? '0' : '30px'});
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
`;

const StyledContentWrapper = styled.div`
  width: 100%;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rem 1.5rem;
`;

const StyledHeroSection = styled(StyledSection)`
  &::before {
    background: transparent;
  }
`;

const StyledGradientTitle = styled.h1`
  font-size: clamp(4rem, 15vw, 8rem);
  font-weight: 900;
  line-height: 1;
  text-align: center;
  background: linear-gradient(45deg, #fff, ${({ theme }) => theme.colors.neonPrimary}, ${({ theme }) => theme.colors.neonSecondary});
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  animation: 
    ${glowPulse} 3s ease-in-out infinite,
    gradientFlow 8s linear infinite;
  letter-spacing: -2px;
`;

const StyledSubtitle = styled.p`
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  text-align: center;
  opacity: 0.9;
`;

const StyledFeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  width: 100%;
  max-width: 1400px;
  padding: 4rem 0;
  perspective: 1000px;
`;

const StyledFeatureCard = styled.div<{ $delay: number }>`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 3rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  animation: ${fadeUpIn} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: ${props => props.$delay}ms;
  opacity: 0;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(208, 0, 255, 0.1) 0%,
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: rotate(45deg);
    transition: 0.5s;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-10px) rotateX(5deg);
    border-color: rgba(208, 0, 255, 0.3);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 50px rgba(208, 0, 255, 0.2);

    &::before {
      opacity: 1;
    }

    &::after {
      left: 100%;
      opacity: 0.3;
    }
  }

  h3 {
    font-size: 1.75rem;
    font-weight: 700;
    background: linear-gradient(45deg, #fff, ${({ theme }) => theme.colors.neonPrimary});
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -0.5rem;
      width: 2rem;
      height: 2px;
      background: linear-gradient(90deg, ${({ theme }) => theme.colors.neonPrimary}, transparent);
      transition: width 0.3s ease;
    }
  }

  &:hover h3::after {
    width: 100%;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.8;
    font-size: 1.1rem;
  }
`;

const StyledCodeSection = styled(StyledSection)`
  background: rgba(5, 12, 20, 0.3);
  text-align: left;
  position: relative;
  overflow: visible;
  scroll-snap-align: none;
  min-height: 150vh;
  padding-top: 25vh;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to bottom, transparent, rgba(5, 12, 20, 0.95));
    pointer-events: none;
  }
`;

const StyledCodeWrapper = styled.div<{ $scrollProgress?: number }>`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  transform-style: preserve-3d;
  perspective: 2000px;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, rgba(5, 12, 20, 0.95), transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, rgba(5, 12, 20, 0.95), transparent);
  }
`;

const StyledCodeBlock = styled.div<{ $scrollProgress?: number }>`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  padding: 0;
  width: 100%;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transform: ${props => {
    const progress = props.$scrollProgress || 0;
    const startAngle = 30;
    const rotateX = startAngle - progress * startAngle;
    const scale = 0.85 + progress * 0.15;
    const translateY = 30 - progress * 30;
    return `
      perspective(1500px)
      rotateX(${rotateX}deg)
      scale(${scale})
      translateY(${translateY}px)
    `;
  }};
  transition: transform 0.1s ease-out;
  transform-origin: center top;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 48px;
    background: rgba(255, 255, 255, 0.02);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
  }

  pre {
    margin: 0;
    padding: 4rem 2rem 2rem;
    overflow-x: auto;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100px;
      background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2));
      pointer-events: none;
    }
    
    code {
      font-family: ${({ theme }) => theme.fonts.mono};
      color: #e0e0e0;
      font-size: 1rem;
      line-height: 1.6;
    }
  }
`;

const StyledWaitlistSection = styled(StyledSection)`
  text-align: center;
  background: rgba(5, 12, 20, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(208, 0, 255, 0.1), transparent 70%);
    z-index: 1;
  }
`;

const StyledWaitlistForm = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -20px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 24px;
    z-index: -1;
    transform: scale(1.05);
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
    transform: scale(1);
  }

  input {
    width: 100%;
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    color: white;
    font-size: 1.1rem;
    backdrop-filter: blur(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.neonPrimary};
      box-shadow: 0 0 30px rgba(208, 0, 255, 0.15);
      transform: translateY(-2px);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  button {
    width: 100%;
    padding: 1.5rem;
    border-radius: 16px;
    border: none;
    background: linear-gradient(45deg, ${({ theme }) => theme.colors.neonPrimary}, ${({ theme }) => theme.colors.neonSecondary});
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: 0.5s;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.3),
        0 0 50px rgba(208, 0, 255, 0.3);

      &::before {
        left: 100%;
      }
    }
  }
`;

const StyledSectionTitle = styled.h2<{ $inView?: boolean }>`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  background: linear-gradient(45deg, #fff, ${({ theme }) => theme.colors.neonPrimary});
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.2;
  opacity: ${props => props.$inView ? 1 : 0};
  transform: translateY(${props => props.$inView ? '0' : '30px'});
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
`;

const GLUE: React.FC = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [codeRef, codeInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [waitlistRef, waitlistInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!codeBlockRef.current) return;
      
      const rect = codeBlockRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - (rect.top / viewportHeight)));
      setScrollProgress(progress);
    };

    const handleWheel = (e: WheelEvent) => {
      const sections = document.querySelectorAll('section');
      const currentSection = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > 0;
      });

      if (currentSection) {
        // Only allow scrolling up if we're past the code section
        if (e.deltaY < 0) {
          const prevSection = currentSection.previousElementSibling;
          if (prevSection) {
            e.preventDefault();
            prevSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          // Only allow scrolling down if we haven't reached the code section yet
          const isCodeSection = currentSection.classList.contains('code-section');
          if (!isCodeSection) {
            const nextSection = currentSection.nextElementSibling;
            if (nextSection) {
              e.preventDefault();
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle waitlist submission
  };

  return (
    <>
      <GlowDotsBackground />
      <StyledGlueContainer ref={containerRef}>
        <StyledHeroSection ref={heroRef} $inView={heroInView}>
          <StyledContentWrapper>
            <StyledGradientTitle>GLUE</StyledGradientTitle>
            <StyledSubtitle>
              Seamlessly connect and integrate AI systems with unprecedented efficiency
            </StyledSubtitle>
          </StyledContentWrapper>
        </StyledHeroSection>

        <StyledSection ref={featuresRef} $inView={featuresInView}>
          <StyledContentWrapper>
            <StyledSectionTitle $inView={featuresInView}>Why GLUE?</StyledSectionTitle>
            <StyledFeatureGrid>
              <StyledFeatureCard $delay={0}>
                <h3>Seamless Integration</h3>
                <p>Connect multiple AI systems with minimal configuration and zero friction. Built for developers, by developers.</p>
              </StyledFeatureCard>
              <StyledFeatureCard $delay={200}>
                <h3>Real-time Processing</h3>
                <p>Process data across systems with negligible latency and maximum reliability. Scale with confidence.</p>
              </StyledFeatureCard>
              <StyledFeatureCard $delay={400}>
                <h3>Smart Routing</h3>
                <p>Intelligent routing ensures optimal data flow between connected systems. Automatic load balancing included.</p>
              </StyledFeatureCard>
            </StyledFeatureGrid>
          </StyledContentWrapper>
        </StyledSection>

        <StyledCodeSection ref={codeRef} $inView={codeInView} $noSnap className="code-section">
          <StyledContentWrapper>
            <StyledSectionTitle $inView={codeInView}>Simple Integration</StyledSectionTitle>
            <StyledCodeWrapper>
              <StyledCodeBlock ref={codeBlockRef} $scrollProgress={scrollProgress}>
                <pre>
                  <code>{`
import { Glue } from '@paradiselabs/glue';

// Initialize GLUE
const glue = new Glue({
  apiKey: 'your-api-key',
});

// Connect AI systems
await glue.connect([
  'system1',
  'system2'
]);

// Start communication
const result = await glue.process({
  input: 'Your input here',
  flow: 'system1 -> system2'
});
                  `}</code>
                </pre>
              </StyledCodeBlock>
            </StyledCodeWrapper>
          </StyledContentWrapper>
        </StyledCodeSection>

        <StyledWaitlistSection ref={waitlistRef} $inView={waitlistInView}>
          <StyledContentWrapper>
            <StyledSectionTitle $inView={waitlistInView}>Join the Waitlist</StyledSectionTitle>
            <StyledSubtitle>Be among the first to experience GLUE</StyledSubtitle>
            <StyledWaitlistForm onSubmit={handleSubmit}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Join Waitlist</button>
            </StyledWaitlistForm>
          </StyledContentWrapper>
        </StyledWaitlistSection>
      </StyledGlueContainer>
    </>
  );
};

export default GLUE;
