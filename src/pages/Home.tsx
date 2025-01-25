import React, { useEffect, useRef } from 'react';
import { BlackHole } from '../components/BlackHole';
import Particles from '../components/Particles';
import { useLocation } from 'react-router-dom';

const Home: React.FC = () => {
  const location = useLocation();
  const mountKey = useRef(0);
  
  useEffect(() => {
    mountKey.current += 1;
  }, [location.pathname]);
  
  return (
    <>
      <Particles key={`particles-${mountKey.current}`} />
      <BlackHole />
    </>
  );
};

export default Home;