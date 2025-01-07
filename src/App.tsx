import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Navigation } from './components/Navigation/Navigation';
import { ParticlesBackground } from './components/ParticlesBackground';
import { GlowDotsBackground } from './components/GlowDotsBackground';
import { useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Home, Eden, GLUE, Projects, Blog, About } from './pages';
import { Login, Dashboard, WaitlistPage } from './pages/admin';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './components/AdminLayout';

const AppContainer = styled.div`
  min-height: 100vh;
<<<<<<< Updated upstream
  padding-bottom: 4rem; // Space for footer
=======
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden; /* Prevent horizontal scrollbar issues */
`;

const ContentWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full viewport height */
  width: 100%;
  
  &[data-scroll-container] {
    position: relative;
    overflow: visible;
  }
>>>>>>> Stashed changes
`;

const BackgroundSelector = () => {
  const location = useLocation();
  return location.pathname === '/' ? <ParticlesBackground /> : <GlowDotsBackground />;
};

<<<<<<< Updated upstream
const MainLayout = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <>
    <Navigation />
    <BackgroundSelector />
    {children}
    <Footer />
  </>
);
=======
const MainLayout = React.memo(({ children }: { children: React.ReactNode }): JSX.Element => {
  React.useEffect(() => {
    console.group('🌟 MAIN LAYOUT LIFECYCLE 🌟');
    console.warn('MOUNTED');
    console.trace('Layout Mount Trace');
    console.groupEnd();

    return () => {
      console.group('🌟 MAIN LAYOUT LIFECYCLE 🌟');
      console.warn('UNMOUNTED');
      console.trace('Layout Unmount Trace');
      console.groupEnd();
    };
  }, []);

  return (
    <>
      <Navigation />
      <ContentWrapper>
        <BackgroundSelector />
        {children}
        <Footer />
      </ContentWrapper>
    </>
  );
});

MainLayout.displayName = 'MainLayout';
>>>>>>> Stashed changes

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin">
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="login" element={<Login />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="waitlist"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <WaitlistPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Main Routes */}
          <Route path="/">
            <Route
              index
              element={
                <AppContainer>
                  <MainLayout>
                    <Home />
                  </MainLayout>
                </AppContainer>
              }
            />
            <Route
              path="eden/*"
              element={
                <AppContainer>
                  <MainLayout>
                    <Eden />
                  </MainLayout>
                </AppContainer>
              }
            />
            <Route
              path="glue"
              element={
                <AppContainer>
                  <MainLayout>
                    <GLUE />
                  </MainLayout>
                </AppContainer>
              }
            />
            <Route
              path="projects"
              element={
                <AppContainer>
                  <MainLayout>
                    <Projects />
                  </MainLayout>
                </AppContainer>
              }
            />
            <Route
              path="blog"
              element={
                <AppContainer>
                  <MainLayout>
                    <Blog />
                  </MainLayout>
                </AppContainer>
              }
            />
            <Route
              path="about"
              element={
                <AppContainer>
                  <MainLayout>
                    <About />
                  </MainLayout>
                </AppContainer>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App
