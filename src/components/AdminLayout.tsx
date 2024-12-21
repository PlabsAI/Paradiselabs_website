import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.5rem;
  font-weight: 600;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid rgba(208, 0, 255, 0.3);
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(208, 0, 255, 0.1);
    border-color: #d000ff;
  }
`;

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: #050C14;
`;

const Sidebar = styled.aside`
  width: 250px;
  background: rgba(255, 255, 255, 0.03);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const NavSection = styled.div`
  margin-bottom: 2rem;
`;

const NavTitle = styled.h2`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 0.5rem;
`;

const NavLink = styled.button<{ isActive?: boolean }>`
  width: 100%;
  text-align: left;
  background: ${props => props.isActive ? 'rgba(208, 0, 255, 0.1)' : 'transparent'};
  border: none;
  color: ${props => props.isActive ? '#d000ff' : props.theme.colors.textPrimary};
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(208, 0, 255, 0.1);
    color: #d000ff;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <LayoutContainer>
      <Sidebar>
        <NavSection>
          <NavTitle>General</NavTitle>
          <NavList>
            <NavItem>
              <NavLink 
                isActive={location.pathname === '/admin/dashboard'}
                onClick={() => navigate('/admin/dashboard')}
              >
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                isActive={location.pathname === '/admin/waitlist'}
                onClick={() => navigate('/admin/waitlist')}
              >
                Waitlist
              </NavLink>
            </NavItem>
          </NavList>
        </NavSection>

        <NavSection>
          <NavTitle>Settings</NavTitle>
          <NavList>
            <NavItem>
              <NavLink>Account</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Site Settings</NavLink>
            </NavItem>
          </NavList>
        </NavSection>
      </Sidebar>

      <MainContent>
        <Header>
          <Title>Welcome back, {user?.email}</Title>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </Header>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};
