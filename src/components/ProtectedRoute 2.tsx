import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import { LoadingSpinner } from './LoadingSpinner';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #050C14;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Message = styled.div`
  text-align: center;
  
  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 2rem;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Container>
        <LoadingWrapper>
          <LoadingSpinner />
          <p>Verifying authentication...</p>
        </LoadingWrapper>
      </Container>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If authenticated but not admin, show error
  if (user.role !== 'admin') {
    return (
      <Container>
        <Message>
          <h2>Access Denied</h2>
          <p>You don't have permission to access this area.</p>
        </Message>
      </Container>
    );
  }

  return <>{children}</>;
};
