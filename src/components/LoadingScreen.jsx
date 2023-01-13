import React from "react";
import styled from "styled-components";
import { DotLoader } from "react-spinners";
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
`;

function LoadingScreen() {
  return (
    <Container>
      <DotLoader />
    </Container>
  );
}

export default LoadingScreen;
