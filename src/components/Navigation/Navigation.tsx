import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  z-index: 1000;
  background: rgba(5, 12, 20, 0.8);
  -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
          align-items: center;
`;

const NavList = styled.ul`
  list-style: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)`
 color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  -webkit-transition: color 0.3s ease;
  -o-transition: color 0.3s ease;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 4px;

  &:hover {
    color: #d000ff;
  }
`;

const LogoContainer = styled(Link)`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
          align-items: center;
  gap: 1rem;
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 32px;
  width: auto;
  -webkit-filter: brightness(1.2);
          filter: brightness(1.2); 
  -o-object-fit: contain; 
     object-fit: contain;
  display: block;
`;

const LogoText = styled.span`
 font-size: 1.5rem;
  font-weight: 700;
  background: -o-linear-gradient(45deg, #fff, #d000ff, #9000ff);
  background: linear-gradient(45deg, #fff, #d000ff, #9000ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  -webkit-animation: gradientFlow 8s linear infinite;
          animation: gradientFlow 8s linear infinite;
`;

const SubNav = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background: rgba(5, 12, 20, 0.95);
  -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  list-style: none;
  min-width: 200px;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  -webkit-transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  -ms-transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
          transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  -webkit-box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const SubNavItem = styled.li`
  padding: 0.5rem;
`;

const SubNavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  display: block;
  padding: 0.5rem;
  border-radius: 4px;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(208, 0, 255, 0.1);
    color: #d000ff;
  }
`;

export const Navigation: React.FC = () => {
  const [isEdenOpen, setIsEdenOpen] = useState(false);

  return (
    <Nav>
      <NavContainer>
        <LogoContainer to="/">
          <LogoImage src="/assets/images/logo.svg" alt="ParadiseLabs" />
          <LogoText>ParadiseLabs</LogoText>
        </LogoContainer>
        <NavList>
          <NavItem 
            onMouseEnter={() => setIsEdenOpen(true)}
            onMouseLeave={() => setIsEdenOpen(false)}
          >
            <NavLink to="/eden">Eden</NavLink>
            <SubNav $isOpen={isEdenOpen}>
              <SubNavItem>
                <SubNavLink to="/eden#overview" onClick={(e) => {
              e.preventDefault();
              document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
            }}>Overview</SubNavLink>
              </SubNavItem>
              <SubNavItem>
                <SubNavLink to="/eden#architecture" onClick={(e) => {
              e.preventDefault();
              document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
            }}>Architecture</SubNavLink>
              </SubNavItem>
              <SubNavItem>
                <SubNavLink to="/eden#technical-overview" onClick={(e) => {
              e.preventDefault();
              document.getElementById('technical-overview')?.scrollIntoView({ behavior: 'smooth' });
            }}>Core</SubNavLink>
              </SubNavItem>
              <SubNavItem>
                <SubNavLink to="/eden#features" onClick={(e) => {
              e.preventDefault();
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}>Features</SubNavLink>
              </SubNavItem>
              <SubNavItem>
                <SubNavLink to="/eden#laws" onClick={(e) => {
              e.preventDefault();
              document.getElementById('laws')?.scrollIntoView({ behavior: 'smooth' });
            }}>Laws</SubNavLink>
              </SubNavItem>
            </SubNav>
          </NavItem>
          <NavItem>
            <NavLink to="/glue">GLUE</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/projects">Projects</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/blog">Blog</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/about">About</NavLink>
          </NavItem>
        </NavList>
      </NavContainer>
    </Nav>
  );
};
