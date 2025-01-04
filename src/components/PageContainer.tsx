import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ $path: string }>`
  width: 100%;
  min-height: 100vh;
  padding-top: 80px;
  background: rgba(5, 12, 20, 0.85);
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  transform-style: preserve-3d;
  will-change: transform;
  overflow-x: hidden;

  ${({ $path }) => $path === '/' ? `
    min-height: 100vh;
    align-items: center;
    justify-content: space-between;
  ` : `
    min-height: 100vh;
    justify-content: flex-start;
  `}

  & > *:not(:last-child) {
    flex: 1;
  }

  & > *:last-child {
    margin-top: auto;
  }
`;

export const PageContainer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const path = window.location.pathname;
  return <Container $path={path}>{children}</Container>;
};
