import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ParticlesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

interface ScriptStatus {
  jquery: boolean;
  pixi: boolean;
  particles: boolean;
}

declare global {
  interface Window {
    PIXI: any;
    particleSystem?: any;
    jQuery: any;
    $: any;
    pixiApplication?: any;
    isParticlesInitialized?: boolean;
    particlesCleanupInProgress?: boolean;
    particlesInitializationAttempts?: number;
    requestAnimationFrame: (callback: FrameRequestCallback) => number;
    cancelAnimationFrame: (handle: number) => void;
  }
}

const MAX_INITIALIZATION_ATTEMPTS = 3;
const SCRIPT_TIMEOUT = 5000;
const CLEANUP_TIMEOUT = 1000;

const Particles: React.FC = () => {
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);
  const [scriptStatus, setScriptStatus] = useState<ScriptStatus>({
    jquery: false,
    pixi: false,
    particles: false,
  });
  const [error, setError] = useState<string | null>(null);
  const initializationAttemptsRef = useRef(0);
  const cleanupTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCleaningUpRef = useRef(false);
  const isInitializingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateScriptStatus = useCallback((script: keyof ScriptStatus, status: boolean) => {
    setScriptStatus(prev => ({
      ...prev,
      [script]: status,
    }));
  }, []);

  const cleanupScripts = useCallback(async (): Promise<void> => {
    if (isCleaningUpRef.current) {
      console.log('Cleanup already in progress, skipping...');
      return;
    }

    isCleaningUpRef.current = true;
    console.log('Starting cleanup process...');

    return new Promise((resolve) => {
      try {
        // Cancel any pending animation frames
        if (animationFrameRef.current !== null) {
          window.cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }

        // Clear existing timeouts
        if (cleanupTimeoutRef.current) clearTimeout(cleanupTimeoutRef.current);
        if (initTimeoutRef.current) clearTimeout(initTimeoutRef.current);

        // Clean up PIXI application and WebGL context
        if (window.pixiApplication) {
          try {
            window.pixiApplication.destroy(true, {
              children: true,
              texture: true,
              baseTexture: true,
              context: true // Important for WebGL cleanup
            });
            window.pixiApplication = null;
          } catch (e) {
            console.error('Error destroying PIXI application:', e);
          }
        }

        // Clean up WebGL contexts from all canvases
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
          try {
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
              gl.getExtension('WEBGL_lose_context')?.loseContext();
            }
            canvas.parentNode?.removeChild(canvas);
          } catch (e) {
            console.error('Error cleaning up canvas:', e);
          }
        });

        // Remove all script tags first
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
          if (
            script.src.includes('jquery') ||
            script.src.includes('pixi') ||
            script.src.includes('particles.js')
          ) {
            script.parentNode?.removeChild(script);
          }
        });

        // Clean up global scope
        const globals = [
            'PIXI',
            'particleSystem',
            'jQuery',
            '$',
            'pixiApplication',          
            'initializeNodes', 
            'ParticleNetwork',
            'CanvasRenderer',
            'ParticleSystem'
          ];

        globals.forEach(key => {
          try {
            // @ts-ignore
            if (window[key]) {
              // @ts-ignore
              delete window[key];
            }
          } catch (e) {
            console.error(`Error cleaning up ${key}:`, e);
          }
        });

        // Clear the container
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // Reset state
        setIsInitialized(false);
        setScriptStatus({
          jquery: false,
          pixi: false,
          particles: false,
        });
        setError(null);
        initializationAttemptsRef.current = 0;

        // Final cleanup after a short delay
        cleanupTimeoutRef.current = setTimeout(() => {
          isCleaningUpRef.current = false;
          resolve();
        }, CLEANUP_TIMEOUT);

      } catch (e) {
        console.error('Error during cleanup:', e);
        isCleaningUpRef.current = false;
        resolve();
      }
    });
  }, []);

  const loadScript = useCallback((
    src: string,
    type: keyof ScriptStatus
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (document.querySelector(`script[src="${src}"]`)) {
        updateScriptStatus(type, true);
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;

      const timeoutId = setTimeout(() => {
        reject(new Error(`Script load timeout: ${src}`));
      }, SCRIPT_TIMEOUT);

      script.onload = () => {
        clearTimeout(timeoutId);
        updateScriptStatus(type, true);
        resolve();
      };

      script.onerror = () => {
        clearTimeout(timeoutId);
        reject(new Error(`Script load error: ${src}`));
      };

      document.body.appendChild(script);
    });
  }, [updateScriptStatus]);

  const initializeParticles = useCallback(async () => {
    if (isInitializingRef.current) {
      return;
    }

    isInitializingRef.current = true;

    try {
      // Ensure thorough cleanup first
      await cleanupScripts();
      
      // Small delay to ensure cleanup is complete
      await new Promise(resolve => setTimeout(resolve, 100));

      await loadScript('https://code.jquery.com/jquery-3.6.0.min.js', 'jquery');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.5.1/pixi.min.js', 'pixi');
      await loadScript('src/components/CompanyTitleParticles.js', 'particles');

      setIsInitialized(true);
      isInitializingRef.current = false;
    } catch (error) {
      console.error('Initialization error:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
      isInitializingRef.current = false;

      if (initializationAttemptsRef.current < MAX_INITIALIZATION_ATTEMPTS) {
        initializationAttemptsRef.current++;
        setTimeout(initializeParticles, 1000);
      } else {
        setError('Failed to initialize after multiple attempts');
      }
    }
  }, [loadScript, cleanupScripts]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (location.pathname === '/' && mounted) {
        await initializeParticles();
      }
    };

    init();

    return () => {
      mounted = false;
      cleanupScripts();
    };
  }, [location.pathname, initializeParticles, cleanupScripts]);

  if (location.pathname !== '/') return null;

  return (
    <ParticlesContainer ref={containerRef} id="particles-container" />
  );
};

export default Particles;