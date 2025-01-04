import React from 'react';
import styled from 'styled-components';
import { BlackHole } from '../components/BlackHole';

import { useEffect } from 'react';

const HomeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Home: React.FC = () => {
  useEffect(() => {
    // Store the original overflow value
    const originalOverflow = document.body.style.overflow;
    
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling on unmount, restoring original value
    return () => {
      // Force a small delay to ensure cleanup happens after navigation
      setTimeout(() => {
        document.body.style.overflow = originalOverflow || 'auto';
        document.body.style.width = '100%';
        document.body.style.position = 'relative';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
      }, 0);
    };
  }, []);

  return (
    <HomeContainer>
      <BlackHole />
    </HomeContainer>
  );
};

export default Home;
