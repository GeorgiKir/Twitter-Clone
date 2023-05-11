import React from "react";
import { FaBomb } from "react-icons/fa";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <ErrorContainerDiv>
      <FaBomb size={"100px"} />
      <h2>An unknown error has occured</h2>
      <p>
        Please try refreshing the page, or <span>contact support</span> if the
        problem persists.
      </p>
    </ErrorContainerDiv>
  );
};

const ErrorContainerDiv = styled.div`
  margin: 10% auto;
  width: 70%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; */
  & span {
    text-decoration: underline;
    color: blue;
  }
  & p {
    font-size: 1.3em;
    text-align: center;
  }
`;

export default ErrorPage;
