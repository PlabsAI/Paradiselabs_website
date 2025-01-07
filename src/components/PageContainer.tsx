import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  padding-top: 80px;
  background: rgba(5, 12, 20, 0.85);
  position: relative;
  z-index: 1;
  -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
          justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
<<<<<<< Updated upstream
=======
  transform-style: preserve-3d;
  will-change: transform;
  overflow: hidden;
  padding-bottom: 80px; /* Explicit space for footer */

  ${({ $path }) => $path === '/' ? `
    min-height: 100vh;
    align-items: center;
    justify-content: center;
  ` : `
    min-height: 100vh;
    justify-content: center;
  `}

  /* Ensure footer and other bottom elements can render */
  & > *:last-child {
    flex-shrink: 0;
    margin-top: auto;
  }
>>>>>>> Stashed changes
`;

export const PageContainer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <Container>{children}</Container>;
};
