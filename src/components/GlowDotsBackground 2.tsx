import React from 'react';
import styled, { keyframes } from 'styled-components';

// Helper function to generate multiple box shadows
const generateBoxShadows = (n: number): string => {
  const shadows: string[] = [];
  for (let i = 0; i < n; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    shadows.push(`${x}px ${y}px #FFF`);
  }
  return shadows.join(', ');
};

// Generate static shadows
const shadowsSmall = generateBoxShadows(700);
const shadowsMedium = generateBoxShadows(200);
const shadowsBig = generateBoxShadows(100);

// Animations
const animStar = keyframes`
  from {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
  }
  to {
    -webkit-transform: translateY(-2000px);
            transform: translateY(-2000px);
  }}
`;

// Styled components
const Container = styled.div`
  height: 100%;
  background: -o-radial-gradient(bottom, ellipse, #1F102B 0%, #0B0C1E 100%);
  background: radial-gradient(ellipse at bottom, #1F102B 0%, #0B0C1E 100%);
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

const Stars1 = styled.div`
  width: 1px;
  height: 1px;
  background: transparent;
  -webkit-box-shadow: ${shadowsSmall};
          box-shadow: ${shadowsSmall};
  -webkit-animation: ${animStar} 50s linear infinite;
          animation: ${animStar} 50s linear infinite;

  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    -webkit-box-shadow: ${shadowsSmall};
            box-shadow: ${shadowsSmall};
  }
`;

const Stars2 = styled.div`
  width: 2px;
  height: 2px;
  background: transparent;
  -webkit-box-shadow: ${shadowsMedium};
          box-shadow: ${shadowsMedium};
  -webkit-animation: ${animStar} 100s linear infinite;
          animation: ${animStar} 100s linear infinite;

  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 2px;
    height: 2px;
    background: transparent;
    -webkit-box-shadow: ${shadowsMedium};
            box-shadow: ${shadowsMedium};
  }
`;

const Stars3 = styled.div`
  width: 3px;
  height: 3px;
  background: transparent;
  -webkit-box-shadow: ${shadowsBig};
          box-shadow: ${shadowsBig};
  -webkit-animation: ${animStar} 150s linear infinite;
          animation: ${animStar} 150s linear infinite;

  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 3px;
    height: 3px;
    background: transparent;
    -webkit-box-shadow: ${shadowsBig};
            box-shadow: ${shadowsBig};
  }
`;

const GlowDotsBackgroundComponent = (): React.ReactElement => {
  return (
    <Container>
      <Stars1 id="stars" />
      <Stars2 id="stars2" />
      <Stars3 id="stars3" />
    </Container>
  );
};

const GlowDotsBackground = React.memo(GlowDotsBackgroundComponent);
GlowDotsBackground.displayName = 'GlowDotsBackground';

export { GlowDotsBackground };
export default GlowDotsBackground;
