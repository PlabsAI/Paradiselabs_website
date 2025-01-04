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
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px); /* Account for navigation */
  
  &[data-scroll-container] {
    position: relative;
    overflow: visible;
  }
`;

const BackgroundSelector = () => {
  const location = useLocation();
  return location.pathname === '/' ? <ParticlesBackground /> : <GlowDotsBackground />;
};

const MainLayout = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <>
    <Navigation />
    <ContentWrapper>
      <BackgroundSelector />
      {children}
    </ContentWrapper>
    <Footer />
  </>
);

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
