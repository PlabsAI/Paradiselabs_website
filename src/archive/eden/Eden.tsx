import React from 'react';
import styled from 'styled-components';
import Overview from './eden/Overview';
import { GlowDotsBackground } from '../components/GlowDotsBackground';

const EdenContainer = styled.div`
  padding-top: 80px; // Space for navigation
  position: relative;
  z-index: 0;
  background: transparent;
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
