import React, { useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "./constants";
import { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { CurrentUserContext } from "./CurrentUserContext";
import { useContext } from "react";

const FollowButton = ({
  isBeingFollowed,
  userProfileInfo,
  profileFlag,
  setProfileFlag,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [followFlag, setFollowFlag] = useState(isBeingFollowed);
  useEffect(() => {
    setFollowFlag(isBeingFollowed);
  }, [userProfileInfo]);

  const handleUnfollow = () => {
    fetch(`/api/${userProfileInfo.handle}/unfollow`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileFlag(!profileFlag);
      });
  };

  const handleFollow = () => {
    fetch(`/api/${userProfileInfo.handle}/follow`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfileFlag(!profileFlag);
      });
  };
  return (
    <>
      {isBeingFollowed &&
        userProfileInfo.handle !== currentUser.profile.handle && (
          <Tippy content={`Unfollow ${userProfileInfo.displayName} ?`}>
            <PurpleButton
              onClick={() => {
                handleUnfollow();
              }}
            >
              Following
            </PurpleButton>
          </Tippy>
        )}
      {!isBeingFollowed &&
        userProfileInfo.handle !== currentUser.profile.handle && (
          <Tippy content={`Follow ${userProfileInfo.displayName} ?`}>
            <PurpleButton
              variant={"outlined"}
              onClick={() => {
                handleFollow();
              }}
              style={{
                backgroundColor: "white",
                color: `${COLORS.primary}`,
                border: `3px ${COLORS.primary} solid`,
              }}
            >
              Follow
            </PurpleButton>
          </Tippy>
        )}
    </>
  );
};
const PurpleButton = styled.button`
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 1.1em;
  background-color: ${COLORS.primary};
  border: none;
  padding: 10px 15px;
  height: 25%;
  border-radius: 40px;
  align-self: flex-end;
  margin-bottom: 20px;
`;

export default FollowButton;
