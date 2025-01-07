import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 1rem;
<<<<<<< Updated upstream
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  text-align: center;
=======
  position: absolute; // Changed from fixed to absolute
  bottom: 0;
  left: 0;
  z-index: 9999; // Highest z-index to ensure visibility
  text-align: center;
  background: linear-gradient(to top, rgba(5, 12, 20, 0.95), rgba(5, 12, 20, 0));
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  pointer-events: none;
  
  * {
    pointer-events: auto;
  }

  // Ensure footer is always visible and responsive
  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  // Force visibility
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
>>>>>>> Stashed changes
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
  const location = useLocation();

  useEffect(() => {
    console.error('🦶 FOOTER LIFECYCLE 🦶');
    console.error(`[FOOTER] Current Route: ${location.pathname}`);
    console.error(`[FOOTER] Mounted at: ${new Date().toLocaleTimeString()}`);
    
    // Log parent container details
    const parentContainer = document.querySelector('[data-footer-container]');
    if (parentContainer) {
      console.error(`[FOOTER] Parent Container Found: ${parentContainer.tagName}`);
      console.error(`[FOOTER] Parent Container Visibility: ${window.getComputedStyle(parentContainer).visibility}`);
      console.error(`[FOOTER] Parent Container Display: ${window.getComputedStyle(parentContainer).display}`);
    } else {
      console.error('[FOOTER] NO PARENT CONTAINER FOUND');
    }

    return () => {
      console.error(`[FOOTER] Unmounted from: ${location.pathname}`);
    };
  }, [location.pathname]);

  return (
<<<<<<< Updated upstream
    <FooterContainer>
=======
    <FooterContainer data-footer-container>
>>>>>>> Stashed changes
      <FooterContent>
        <Logo src="/assets/images/logo.svg" alt="ParadiseLabs" />
        <CompanyName>ParadiseLabs</CompanyName>
        <span>© 2024. All rights reserved.</span>
      </FooterContent>
    </FooterContainer>
  );
};
