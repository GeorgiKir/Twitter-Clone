import React from "react";
import { ImSpinner3 } from "react-icons/im";
import { keyframes } from "styled-components";
import styled from "styled-components";

const LoadingSpinner = () => {
  return (
    <SpinnerContainerDiv style={{ color: "grey" }}>
      <ImSpinner3 size={"50px"} />
    </SpinnerContainerDiv>
  );
};

export const spinAnimation = keyframes`
 from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
`;

const SpinnerContainerDiv = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  margin: 200px auto;
  animation-name: ${spinAnimation};
  animation-duration: 3s;
  animation-iteration-count: infinite;
`;

export default LoadingSpinner;
