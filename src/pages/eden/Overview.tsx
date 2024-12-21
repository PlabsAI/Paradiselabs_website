import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import LocomotiveScroll from 'locomotive-scroll';
import '../../components/locomotive-scroll.css';
import Workflow from '../../components/Workflow';

const SuccessMessage = styled.div`
  color: #4caf50;
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.2);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: #f44336;
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.2);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: center;
`;

const OverviewContainer = styled.main`
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.textPrimary};
  position: relative;
  z-index: 2;
  background: transparent;
  pointer-events: auto;
`;

const Section = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #f4f0ff;
  position: relative;
  overflow: hidden;

  h2 {
    font-size: clamp(2.25rem, 2rem + 0.25vw, 3rem);
    margin-bottom: 2rem;
    font-weight: 800;
    background-image: linear-gradient(45deg, #fff, #d000ff, #9000ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-align: center;
    letter-spacing: -0.025em;
    position: relative;
    text-shadow: 0 0 30px rgba(208, 0, 255, 0.3);
    z-index: 1;
  }

  p {
    font-size: clamp(1.125rem, 1rem + 0.25vw, 1.25rem);
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.625;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 1rem;
`;

const FeatureCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  padding: 2rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(208, 0, 255, 0.2);
    border-color: rgba(208, 0, 255, 0.4);
  }

  h3 {
    font-size: clamp(1.5rem, 1.3rem + 0.25vw, 1.875rem);
    margin-bottom: 1.2rem;
    background: linear-gradient(45deg, #fff, #d000ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
  }

  p {
    font-size: clamp(0.875rem, 0.8rem + 0.25vw, 1rem);
    text-align: left;
  }
`;

const WaitlistForm = styled.form`
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
  z-index: 10;

  &:hover {
    transform: perspective(1000px) rotateX(2deg) translateY(-8px);
    box-shadow: 
      0 35px 70px rgba(0, 0, 0, 0.3),
      0 0 50px rgba(208, 0, 255, 0.2);
    border-color: rgba(208, 0, 255, 0.4);
  }

  input {
    width: 100%;
    padding: 1.1rem;
    margin: 1rem 0;
    border: 2px solid rgba(208, 0, 255, 0.3);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.03);
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: clamp(0.875rem, 0.8rem + 0.25vw, 1rem);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 11;

    &:focus {
      outline: none;
      border-color: #d000ff;
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
    background: linear-gradient(45deg, #d000ff, #9000ff);
    background-size: 200% auto;
    border: none;
    border-radius: 16px;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: clamp(1.125rem, 1rem + 0.25vw, 1.25rem);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    text-transform: uppercase;
    letter-spacing: 0.1em;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 
        0 20px 40px rgba(208, 0, 255, 0.4),
        0 0 30px rgba(208, 0, 255, 0.3);
      background-position: right center;
      letter-spacing: 0.15em;
    }
  }
`;

const Overview: React.FC<{}> = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const [scroller, setScroller] = useState<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Browser detection
    const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

    // Get scroll options based on browser
    const getScrollOptions = () => {
      const baseOptions = {
        el: containerRef.current!,
        smooth: true,
        multiplier: 1,
        lerp: 0.1,
        getDirection: true,
        getSpeed: true,
        class: 'is-inview',
        initPosition: { x: 0, y: 0 },
        reloadOnContextChange: true,
        touchMultiplier: 2,
        smoothMobile: true,
        smartphone: {
          smooth: true,
          multiplier: 1,
          lerp: 0.1
        },
        tablet: {
          smooth: true,
          multiplier: 1,
          lerp: 0.1
        }
      };

      if (isFirefox) {
        return {
          ...baseOptions,
          multiplier: 0.45,
          lerp: 0.08,
          firefoxMultiplier: 35,
          smoothMobile: true,
          smartphone: {
            smooth: true,
            multiplier: 0.45,
            lerp: 0.08
          },
          tablet: {
            smooth: true,
            multiplier: 0.45,
            lerp: 0.08
          }
        };
      }

      return baseOptions;
    };

    // Initialize locomotive scroll
    const locomotiveScroll = new LocomotiveScroll(getScrollOptions());
    setScroller(locomotiveScroll);

    // Add scroll class to html
    document.documentElement.classList.add('has-scroll-smooth');

    // Cleanup
    return () => {
      locomotiveScroll.destroy();
      document.documentElement.classList.remove('has-scroll-smooth');
      setScroller(null);
    };
  }, []);

  // Update scroll on content change
  useEffect(() => {
    if (scroller) {
      scroller.update();
    }
  }, [scroller, isSubmitting, submitSuccess, submitError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;

    try {
      const response = await fetch('http://localhost:3001/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, role }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      setSubmitSuccess(true);
      form.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to join waitlist');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OverviewContainer ref={containerRef} data-scroll-container>
      <Section id="overview" data-scroll-section>
        <span className="early-access-badge" data-scroll data-scroll-speed="2" data-scroll-fade>
          🚀 Coming Soon - Join the Waitlist
        </span>
        <h2 data-scroll data-scroll-speed="2" data-scroll-rotate>
          The Future of AI-Powered<br/>Web Development
        </h2>
        <p data-scroll data-scroll-speed="1" data-scroll-fade>
          Be among the first to experience Paradiselabs - the revolutionary AI-driven web development framework. 
          Sign up now for early access and exclusive updates.
        </p>
        <WaitlistForm onSubmit={handleSubmit} data-scroll data-scroll-speed="2" data-scroll-scale>
          <input 
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            disabled={isSubmitting}
          />
          <input 
            type="text"
            name="role"
            placeholder="Your role (e.g., Developer, Business Owner)"
            required
            disabled={isSubmitting}
          />
          {submitError && (
            <ErrorMessage>{submitError}</ErrorMessage>
          )}
          {submitSuccess && (
            <SuccessMessage>Thanks for joining the waitlist! We'll keep you updated on our launch.</SuccessMessage>
          )}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
          </button>
        </WaitlistForm>
      </Section>

      <Section id="technical-overview" data-scroll-section>
        <h2 data-scroll data-scroll-speed="2" data-scroll-blur>Technical Overview</h2>
        <p data-scroll data-scroll-speed="3" data-scroll-fade>
          Paradiselabs is a sophisticated web development framework powered by a multi-agent AI system, built on Next.js 13+ with TypeScript. 
          It leverages multiple AI models including O1, Claude, Vertex AI, Gemini, and Perplexity to create intelligent, autonomous web development workflows.
        </p>
        <div data-scroll data-scroll-speed="3" data-scroll-fade>
          <Workflow />
        </div>
      </Section>

      <Section id="architecture" data-scroll-section>
        <h2 data-scroll data-scroll-speed="2" data-scroll-blur>Core Architecture</h2>
        <FeaturesGrid data-scroll data-scroll-speed="2" data-scroll-fade>
          <FeatureCard data-scroll data-scroll-scale>
            <h3>Frontend Stack</h3>
            <p>Next.js 13+ with App Router, TypeScript, and Tailwind CSS</p>
          </FeatureCard>
          <FeatureCard data-scroll data-scroll-scale>
            <h3>AI Agent System</h3>
            <p>Specialized AI agents for different aspects of development</p>
          </FeatureCard>
          <FeatureCard data-scroll data-scroll-scale>
            <h3>State Management</h3>
            <p>Context-based state handling with real-time updates</p>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      <Section id="laws" data-scroll-section>
        <h2 data-scroll data-scroll-speed="2" data-scroll-blur>The Five Core Laws</h2>
        <FeaturesGrid data-scroll data-scroll-speed="2" data-scroll-fade>
          <FeatureCard data-scroll data-scroll-scale>
            <h3>Revenue Generation</h3>
            <p>Automated monetization strategy implementation</p>
          </FeatureCard>
          <FeatureCard data-scroll data-scroll-scale>
            <h3>Design Excellence</h3>
            <p>Component-based architecture with modern UI/UX patterns</p>
          </FeatureCard>
          <FeatureCard data-scroll data-scroll-scale>
            <h3>SEO Optimization</h3>
            <p>Automated meta-data and schema markup implementation</p>
          </FeatureCard>
          <FeatureCard data-scroll data-scroll-scale>
            <h3>User Engagement</h3>
            <p>Interactive elements and content personalization</p>
          </FeatureCard>
          <FeatureCard data-scroll data-scroll-scale>
            <h3>Analytics Integration</h3>
            <p>Comprehensive data collection and monitoring</p>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      <Section id="features" data-scroll-section>
        <h2 data-scroll data-scroll-speed="2" data-scroll-blur>Technical Features</h2>
        <FeaturesGrid data-scroll data-scroll-speed="2" data-scroll-fade>
          <FeatureCard data-scroll data-scroll-scale>
            <h3>Adjustable AI Autonomy</h3>
            <p>Fine-grained control over AI decision-making</p>
          </FeatureCard>
          <FeatureCard data-scroll data-scroll-scale>
            <h3>Development Interface</h3>
            <p>Live preview environment with real-time code generation</p>
          </FeatureCard>
          <FeatureCard data-scroll data-scroll-scale>
            <h3>Component System</h3>
            <p>Reusable UI components with theme-aware styling</p>
          </FeatureCard>
        </FeaturesGrid>
      </Section>
    </OverviewContainer>
  );
};

export default Overview;
