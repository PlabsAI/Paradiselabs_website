import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  padding-top: 80px;
  background: rgba(5, 12, 20, 0.85);
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
`;

export const PageContainer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <Container>{children}</Container>;
};
