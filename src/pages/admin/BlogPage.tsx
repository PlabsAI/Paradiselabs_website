import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

export const BlogPage: React.FC = () => {
  return (
    <PageContainer>
      <Title>Blog Posts</Title>
      {/* Blog content will be added here */}
    </PageContainer>
  );
};
