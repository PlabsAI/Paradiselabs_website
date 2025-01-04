import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 1rem;
  position: relative;
  z-index: 100;
  text-align: center;
  margin-top: auto;
  background: linear-gradient(to top, rgba(5, 12, 20, 0.95), rgba(5, 12, 20, 0));
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  
  &[data-scroll-section] {
    min-height: auto;
    padding: 1rem;
    margin-top: auto;
    position: sticky;
    bottom: 0;
  }
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.875rem;
`;

const Logo = styled.img`
  height: 16px;
  width: auto;
  opacity: 0.4;
  filter: brightness(1.2);
  object-fit: contain;
  display: block;
  margin: 0;
`;

const CompanyName = styled.span`
  color: inherit;
`;

const Copyright = styled.span`
  color: inherit;
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer data-scroll-section>
      <FooterContent>
        <Logo src="/assets/images/logo.svg" alt="ParadiseLabs" />
        <CompanyName>ParadiseLabs</CompanyName>
        <Copyright>© 2024. All rights reserved.</Copyright>
      </FooterContent>
    </FooterContainer>
  );
};
