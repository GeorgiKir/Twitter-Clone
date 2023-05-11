import React, { useEffect } from "react";
import styled from "styled-components";
import { DisplayNameLink, UserAvatar } from "./SmallTweet";
import FollowButton from "./FollowButton";

const FollowerThumbnail = ({
  followingUserProfile,
  profileFlag,
  setProfileFlag,
}) => {
  return (
    <FollowersContainerDiv>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FollowersInfoDiv style={{ marginRight: "20px" }}>
          <UserAvatar src={followingUserProfile.avatarSrc} />
        </FollowersInfoDiv>
        <FollowersInfoDiv>
          <DisplayNameLink to={`/${followingUserProfile.handle}`}>
            {followingUserProfile.displayName}
          </DisplayNameLink>
          <span>@{followingUserProfile.handle}</span>
        </FollowersInfoDiv>
      </div>
      <FollowersInfoDiv>
        <FollowButton
          isBeingFollowed={followingUserProfile.isBeingFollowedByYou}
          userProfileInfo={followingUserProfile}
          setProfileFlag={setProfileFlag}
          profileFlag={profileFlag}
        />
      </FollowersInfoDiv>
    </FollowersContainerDiv>
  );
};

const FollowersInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

const FollowersContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  border: 1px lightgray solid;
`;

export default FollowerThumbnail;
