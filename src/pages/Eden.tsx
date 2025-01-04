import React from 'react';
import styled from 'styled-components';
import Overview from './eden/Overview';
import { GlowDotsBackground } from '../components/GlowDotsBackground';
import { PageContainer } from '../components/PageContainer';

const EdenContainer = styled.div`
  width: 100%;
  position: relative;
  z-index: 0;
  background: transparent;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
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
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-x: hidden;
`;

const Eden: React.FC = () => {
  return (
    <PageContainer>
      <EdenContainer>
        <BackgroundWrapper>
          <GlowDotsBackground />
        </BackgroundWrapper>
        <ContentWrapper>
          <Overview />
        </ContentWrapper>
      </EdenContainer>
    </PageContainer>
  );
};

export default Eden;
