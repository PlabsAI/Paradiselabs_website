import styled, { createGlobalStyle } from 'styled-components';

export const GlobalWorkflowStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap");

  :root {
    --neon-primary: #d000ff;
    --neon-accent: #9000ff;
    --node-bg: rgba(0, 0, 0, 0.85);
    --node-border: rgba(255, 255, 255, 0.08);
    --text-color: #ffffff;
    --node-shadow: 0 8px 32px rgba(208, 0, 255, 0.15);
    --hover-shadow: 0 12px 40px rgba(200, 0, 255, 0.3);
    --line-gradient: linear-gradient(90deg, var(--neon-primary), var(--neon-accent));
    --line-width: 2px;
  }
`;

export const WorkflowContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  height: 600px;
  padding: 2rem;
  overflow: visible;

  @media (max-width: 1200px) {
    -webkit-transform: scale(0.8);
        -ms-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: center center;
        -ms-transform-origin: center center;
            transform-origin: center center;
  }

  @media (max-width: 768px) {
    -webkit-transform: scale(0.6);
        -ms-transform: scale(0.6);
            transform: scale(0.6);
    -webkit-transform-origin: center center;
        -ms-transform-origin: center center;
            transform-origin: center center;
  }
`;

export const WorkflowGrid = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: -ms-grid;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const BaseNode = styled.div`
 padding: 1.5rem;
  background: var(--node-bg);
  border: 1px solid var(--node-border);
  border-radius: 16px;
  color: var(--text-color);
  font-weight: 500;
  text-align: center;
  width: 200px;
  position: relative;
  -webkit-box-shadow: var(--node-shadow);
          box-shadow: var(--node-shadow);
  -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
  -webkit-transition: -webkit-transform 0.2s ease, -webkit-box-shadow 0.2s ease;
  transition: -webkit-transform 0.2s ease, -webkit-box-shadow 0.2s ease;
  -o-transition: transform 0.2s ease, box-shadow 0.2s ease;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  transition: transform 0.2s ease, box-shadow 0.2s ease, -webkit-transform 0.2s ease, -webkit-box-shadow 0.2s ease;
  z-index: 2;

  &:hover {
    -webkit-box-shadow: var(--hover-shadow);
            box-shadow: var(--hover-shadow);
  }

  @media (max-width: 1200px) {
    width: 180px;
    padding: 1.25rem;
  }

  @media (max-width: 768px) {
    width: 160px;
    padding: 1rem;
  }
`;

export const UserNode = styled(BaseNode)`
  -ms-grid-column: 2;
  grid-column: 2;
  -ms-grid-row: 1;
  grid-row: 1;
  -ms-grid-column-align: center;
      justify-self: center;
  -ms-grid-row-align: center;
      align-self: center;

  &::after {
    content: '';
    position: absolute;
    width: var(--line-width);
    height: 100%;
    background: var(--line-gradient);
    left: 50%;
    bottom: -101%;
    -webkit-filter: drop-shadow(0 0 3px var(--neon-primary));
            filter: drop-shadow(0 0 3px var(--neon-primary));
    z-index: 1;
    pointer-events: none;
  }
`;

export const InterfaceNode = styled(BaseNode)`
  -ms-grid-column: 2;
  grid-column: 2;
  -ms-grid-row: 2;
  grid-row: 2;
  -ms-grid-column-align: center;
      justify-self: center;
  -ms-grid-row-align: center;
      align-self: center;
  background: -o-linear-gradient(315deg, rgba(208, 0, 255, 0.95), rgba(0, 0, 0, 0.95));
  background: linear-gradient(135deg, rgba(208, 0, 255, 0.95), rgba(0, 0, 0, 0.95));

  &::after {
    content: '';
    position: absolute;
    height: var(--line-width);
    width: 25%;
    background: var(--line-gradient);
    top: 50%;
    left: 100%;
    -webkit-filter: drop-shadow(0 0 4px var(--neon-primary));
            filter: drop-shadow(0 0 4px var(--neon-primary));
    z-index: 1;
    pointer-events: none;
  }
`;

export const ProcessingNode = styled(BaseNode)`
  -ms-grid-column: 1;
  grid-column: 1;
  -ms-grid-row: 2;
  grid-row: 2;
  -ms-grid-column-align: center;
      justify-self: center;
  -ms-grid-row-align: center;
      align-self: center;

  &::after {
    content: '';
    position: absolute;
    height: var(--line-width);
    width: 24%;
    background: var(--line-gradient);
    top: 50%;
    left: 100%;
    -webkit-filter: drop-shadow(0 0 3px var(--neon-primary));
            filter: drop-shadow(0 0 3px var(--neon-primary));
    z-index: 1;
    pointer-events: none;
  }
`;

export const AgentsNode = styled(BaseNode)`
  -ms-grid-column: 3;
  grid-column: 3;
  -ms-grid-row: 2;
  grid-row: 2;
  -ms-grid-column-align: center;
      justify-self: center;
  -ms-grid-row-align: center;
      align-self: center;

  &::after {
    content: '';
    position: absolute;
    height: var(--line-width);
    width: 25%;
    background: var(--line-gradient);
    top: 50%;
    left: 100%;
    -webkit-filter: drop-shadow(0 0 4px var(--neon-primary));
            filter: drop-shadow(0 0 4px var(--neon-primary));
    z-index: 1;
    pointer-events: none;
  }
`;

export const ResultsNode = styled(BaseNode)`
  -ms-grid-column: 4;
  grid-column: 4;
  -ms-grid-row: 2;
  grid-row: 2;
  -ms-grid-column-align: center;
      justify-self: center;
  -ms-grid-row-align: center;
      align-self: center;
`;

export const TechDetails = styled.div`
  font-size: 0.8em;
  opacity: 0.5;
  margin-top: 0.5rem;
`;
