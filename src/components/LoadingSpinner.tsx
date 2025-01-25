import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(208, 0, 255, 0.1);
  border-radius: 50%;
  border-top-color: #d000ff;
  animation: ${spin} 1s ease-in-out infinite;
`;

export const LoadingSpinner: React.FC = () => {
  return <SpinnerContainer />;
};
