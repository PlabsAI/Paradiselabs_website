import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  padding-top: 80px;
  position: relative;
  z-index: 1;
  color: #fff;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const PageContainer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <Container>{children}</Container>;
};
