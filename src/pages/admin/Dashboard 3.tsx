import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const PageContainer = styled.div``;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.button`
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  
  h3 {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 1.5rem;
    font-weight: 600;
  }

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(208, 0, 255, 0.4);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(208, 0, 255, 0.2);
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

export const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);
  const [waitlistStats, setWaitlistStats] = useState({ total: 0, lastWeek: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const statsResponse = await fetch('http://localhost:3001/api/waitlist/stats');
        const statsData = await statsResponse.json();
        
        if (statsData.success) {
          setWaitlistStats(statsData.data);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsDashboardLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading || isDashboardLoading) {
    return (
      <PageContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <LoadingWrapper>
            <LoadingSpinner />
            <p>Loading dashboard...</p>
          </LoadingWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
        <StatsGrid>
          <StatCard onClick={() => navigate('/admin/waitlist')}>
            <h3>Total Waitlist</h3>
            <p>{waitlistStats.total}</p>
          </StatCard>
          <StatCard onClick={() => navigate('/admin/waitlist')}>
            <h3>Last 7 Days</h3>
            <p>{waitlistStats.lastWeek}</p>
          </StatCard>
        </StatsGrid>
    </PageContainer>
  );
};
