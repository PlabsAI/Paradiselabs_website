import React, { createContext, useContext, useState, useEffect } from 'react';

interface ParticleContextType {
  isInitialized: boolean;
  setIsInitialized: (value: boolean) => void;
}

const ParticleContext = createContext<ParticleContextType>({
  isInitialized: false,
  setIsInitialized: () => {}
});

export const ParticleProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  return (
    <ParticleContext.Provider value={{ isInitialized, setIsInitialized }}>
      {children}
    </ParticleContext.Provider>
  );
};

export const useParticleContext = () => useContext(ParticleContext);
