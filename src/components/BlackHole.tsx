import React from 'react';
import styled from 'styled-components';
import { Loader } from './Loader';

const BlackHoleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
          justify-content: center;
`;

const CompanyTitle = styled.h1`
  position: absolute;
  top: 20%;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
          transform: translateX(-50%);
  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 800;
  z-index: 2;
  margin: 0;
  background: -o-linear-gradient(45deg, #fff, #d000ff, #9000ff);
  background: linear-gradient(45deg, #fff, #d000ff, #9000ff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: gradientFlow 8s linear infinite;
          animation: gradientFlow 8s linear infinite;
  text-shadow: 0 0 30px rgba(208, 0, 255, 0.3);
  letter-spacing: -0.025em;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &::before {
    content: attr(data-text);
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
    color: transparent;
    -webkit-text-stroke: 1px rgba(208, 0, 255, 0.1);
    z-index: -1;
    -webkit-filter: blur(8px);
            filter: blur(8px);
    letter-spacing: 8px;
    opacity: 0.5;
  }
`;

export const BlackHole: React.FC = () => {
  return (
    <BlackHoleContainer>
      <CompanyTitle data-text="ParadiseLabs">ParadiseLabs</CompanyTitle>
      <Loader />
    </BlackHoleContainer>
  );
};
