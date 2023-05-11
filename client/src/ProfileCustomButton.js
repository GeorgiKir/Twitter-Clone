import React from "react";
import styled from "styled-components";
import { COLORS } from "./constants";

const ProfileCustomButton = ({ buttonName, buttonState, setButtonState }) => {
  const handleButton = (buttonValue) => {
    setButtonState(buttonValue);
  };

  return (
    <CustomButton
      style={{
        borderBottom:
          buttonState === buttonName ? `solid 5px ${COLORS.primary}` : "none",
      }}
      onClick={() => {
        handleButton(buttonName);
      }}
    >
      {buttonName}
    </CustomButton>
  );
};

const CustomButton = styled.button`
  border: none;
  color: black;
  width: 33.33%;
  background-color: white;
  font-size: 1.2em;
  cursor: pointer;
  padding: 20px 50px;
`;

export default ProfileCustomButton;
