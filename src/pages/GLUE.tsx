import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { GlowDotsBackground } from '../components/GlowDotsBackground';
import { PageContainer } from '../components/PageContainer';
import LocomotiveScroll from 'locomotive-scroll';
import '../components/locomotive-scroll.css';

const GLUEContainer = styled.main`
  position: relative;
  z-index: 2;
  background: transparent;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const GLUE: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize locomotive scroll
    const locomotiveScroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      lerp: 0.05,
      multiplier: 0.7,
      class: 'is-inview',
      reloadOnContextChange: true,
      smartphone: {
        smooth: true,
        multiplier: 0.7,
        lerp: 0.05
      },
      tablet: {
        smooth: true,
        multiplier: 0.7,
        lerp: 0.05
      }
    });

    // Store the instance on the container element for navigation access
    (containerRef.current as any).__locomotive = locomotiveScroll;

    // Add scroll class to html
    document.documentElement.classList.add('has-scroll-smooth');

    // Cleanup
    return () => {
      locomotiveScroll.destroy();
      document.documentElement.classList.remove('has-scroll-smooth');
      if (containerRef.current) {
        delete (containerRef.current as any).__locomotive;
      }
    };
  }, []);

  return (
    <PageContainer>
      <GLUEContainer ref={containerRef} data-scroll-container>
        <BackgroundWrapper>
          <GlowDotsBackground />
        </BackgroundWrapper>
      </GLUEContainer>
    </PageContainer>
  );
};

export default GLUE;
