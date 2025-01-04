import React from 'react';
import styled from 'styled-components';
import { Loader } from './Loader';

const BlackHoleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: -4rem; /* Offset the footer height */
`;

const CompanyTitle = styled.h1`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 800;
  z-index: 2;
  margin: 0;
  background: linear-gradient(45deg, #fff, #d000ff, #9000ff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientFlow 8s linear infinite;
  text-shadow: 0 0 30px rgba(208, 0, 255, 0.3);
  letter-spacing: -0.025em;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

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
`;

export const BlackHole: React.FC = () => {
  return (
    <BlackHoleContainer>
      <CompanyTitle data-text="ParadiseLabs">ParadiseLabs</CompanyTitle>
      <Loader />
    </BlackHoleContainer>
  );
};
