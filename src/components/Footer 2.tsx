import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  text-align: center;
`;

const FooterContent = styled.div`
display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
          justify-content: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.875rem;
`;

const Logo = styled.img`
height: 16px;
  width: auto;
  opacity: 0.4;
  -webkit-filter: brightness(1.2);
          filter: brightness(1.2);
  -o-object-fit: contain;
     object-fit: contain;
  display: block;
  margin: 0;
`;

const CompanyName = styled.span`
  color: inherit;
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo src="/assets/images/logo.svg" alt="ParadiseLabs" />
        <CompanyName>ParadiseLabs</CompanyName>
        <span>© 2024. All rights reserved.</span>
      </FooterContent>
    </FooterContainer>
  );
};
