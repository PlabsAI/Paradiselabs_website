import React from 'react';
import {
  GlobalWorkflowStyles,
  WorkflowContainer,
  WorkflowGrid,
  UserNode,
  InterfaceNode,
  ProcessingNode,
  AgentsNode,
  ResultsNode,
  TechDetails,
} from './WorkflowStyles';

const Workflow: React.FC = () => {
  return (
    <>
      <GlobalWorkflowStyles />
      <WorkflowContainer>
        <WorkflowGrid>
          <UserNode>
            User
            <TechDetails>Input & Interaction</TechDetails>
          </UserNode>
          <InterfaceNode>
            Interface
            <TechDetails>System Frontend</TechDetails>
          </InterfaceNode>
          <ProcessingNode>
            Processing
            <TechDetails>Data Analysis</TechDetails>
          </ProcessingNode>
          <AgentsNode>
            Agents
            <TechDetails>AI Processing</TechDetails>
          </AgentsNode>
          <ResultsNode>
            Results
            <TechDetails>Output Display</TechDetails>
          </ResultsNode>
        </WorkflowGrid>
      </WorkflowContainer>
    </>
  );
};

export default Workflow;
