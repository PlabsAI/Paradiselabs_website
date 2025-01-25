import React from 'react';
import styled from 'styled-components';
import { Loader } from './Loader';

const BlackHoleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
          justify-content: center;
  -webkit-transform: translateY(50px);
  -ms-transform: translateY(50px);
          transform: translateY(50px); 
`;

export const BlackHole: React.FC = () => {
  return (
    <BlackHoleContainer>
      <Loader />
    </BlackHoleContainer>
  );
};
