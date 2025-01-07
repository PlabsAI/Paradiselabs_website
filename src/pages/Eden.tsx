import React from 'react';
import styled from 'styled-components';
import Overview from './eden/Overview';
import { GlowDotsBackground } from '../components/GlowDotsBackground';

const EdenContainer = styled.div`
  padding-top: 80px; // Space for navigation
  position: relative;
  z-index: 1; // Increased to ensure content visibility
  background: transparent;
<<<<<<< Updated upstream
=======
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow: hidden; // Changed from overflow-x to full overflow
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

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2; // Increased to be above background
  width: 100%;
  flex-grow: 1; // Allow content to grow
  display: flex;
  flex-direction: column;
  align-items: stretch;
>>>>>>> Stashed changes
`;

const Eden: React.FC = () => {
  return (
    <>
      <GlowDotsBackground />
      <EdenContainer>
        <Overview />
      </EdenContainer>
    </>
  );
};

export default Eden;
