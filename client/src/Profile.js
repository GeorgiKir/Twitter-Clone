import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserInfoSpan } from "./SmallTweet";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineCalendarToday } from "react-icons/md";
import { format } from "date-fns";
import ProfileCustomButton from "./ProfileCustomButton";
import SmallTweet from "./SmallTweet";
import LoadingSpinner from "./LoadingSpinner";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import FollowButton from "./FollowButton";
import FollowersContainer from "./FollowersContainer";
import useProfileFetch from "./useProfileFetch";

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);

  const { profileId } = useParams();
  const [userProfileInfo, setUserProfileInfo] = useState(profileId);
  const [profileFlag, setProfileFlag] = useState(false);
  const [userTweets, setUserTweets] = useState("");
  const [tweetDate, setTweetDate] = useState(null);
  const [buttonState, setButtonState] = useState("Tweets");
  const buttonNames = ["Tweets", "Media", "Likes"];
  const [followersTab, setFollowersTab] = useState(false);
  const followerButtonNames = ["Following", "Followers"];

  useProfileFetch(
    setFollowersTab,
    tweetDate,
    setTweetDate,
    setUserProfileInfo,
    profileFlag,
    setUserTweets
  );

  const handleShowFollowers = () => {
    setFollowersTab(!followersTab);
  };

  return (
    <ProfileMainContainer>
      {(!userProfileInfo || !tweetDate || !userTweets) && <LoadingSpinner />}
      {userProfileInfo && tweetDate && userTweets && (
        <>
          <BannerContainer
            style={{
              backgroundImage: `url(${userProfileInfo.profile.bannerSrc})`,
            }}
          />
          <UserInfoContainer>
            <UserPicContainer>
              <AvatarPic src={userProfileInfo.profile.avatarSrc} />
              {userProfileInfo.profile.handle !==
                currentUser.profile.handle && (
                <FollowButton
                  userProfileInfo={userProfileInfo.profile}
                  isBeingFollowed={userProfileInfo.profile.isBeingFollowedByYou}
                  setProfileFlag={setProfileFlag}
                  profileFlag={profileFlag}
                />
              )}
            </UserPicContainer>
          </UserInfoContainer>
          <UserDetailsContainer>
            <UserNameSpan>{userProfileInfo.profile.displayName}</UserNameSpan>
            <UserRowDiv style={{ marginTop: "-15px" }}>
              <UserInfoSpan style={{ fontSize: "1.1em" }}>
                @{userProfileInfo.profile.handle}
              </UserInfoSpan>
              {userProfileInfo.profile.isFollowingYou === true && (
                <FollowsYouSpan>Follows you</FollowsYouSpan>
              )}
            </UserRowDiv>
            <span style={{ fontSize: "1.3em" }}>
              {userProfileInfo.profile.bio}
            </span>
            <UserRowDiv>
              {userProfileInfo.profile.location && (
                <span style={{ color: "gray", marginRight: "25px" }}>
                  <SlLocationPin /> {userProfileInfo.profile.location}
                </span>
              )}
              <span style={{ color: "gray" }}>
                <MdOutlineCalendarToday /> Joined {tweetDate}
              </span>
            </UserRowDiv>
            <UserRowDiv>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleShowFollowers();
                  setFollowersTab("Following");
                }}
              >
                {userProfileInfo.profile.numFollowing} Following
              </span>

              <span
                style={{ marginLeft: "25px", cursor: "pointer" }}
                onClick={() => {
                  handleShowFollowers();
                  setFollowersTab("Followers");
                }}
              >
                {userProfileInfo.profile.numFollowers} Followers
              </span>
            </UserRowDiv>
          </UserDetailsContainer>

          {followersTab && (
            <>
              <ButtonsContainer>
                {followerButtonNames.map((item) => {
                  return (
                    <ProfileCustomButton
                      key={item}
                      buttonName={item}
                      buttonState={followersTab}
                      setButtonState={setFollowersTab}
                    />
                  );
                })}
              </ButtonsContainer>
              <TweetContainer>
                <FollowersContainer followersTab={followersTab} />
              </TweetContainer>
            </>
          )}

          {!followersTab && (
            <ButtonsContainer>
              {buttonNames.map((item) => {
                return (
                  <ProfileCustomButton
                    key={item}
                    buttonName={item}
                    buttonState={buttonState}
                    setButtonState={setButtonState}
                  />
                );
              })}
            </ButtonsContainer>
          )}
          {buttonState === "Tweets" && userTweets && !followersTab && (
            <TweetContainer>
              {userTweets.tweetIds.map((tweetId) => {
                return (
                  <SmallTweet
                    key={tweetId}
                    tweetInfo={userTweets.tweetsById[tweetId]}
                  />
                );
              })}
            </TweetContainer>
          )}
        </>
      )}
    </ProfileMainContainer>
  );
};

const TweetContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const FollowsYouSpan = styled.span`
  background-color: lightgray;
  color: gray;
  border-radius: 5px;
  font-size: 0.9em;
  margin-left: 10px;
  padding: 5px;
`;

const UserRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserNameSpan = styled.span`
  font-weight: bold;
  font-size: 1.5em;
`;

const UserDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 30px;
  justify-content: space-evenly;
  height: 25vh;
  margin-bottom: 25px;
`;

const AvatarPic = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid white;
`;

const UserPicContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 30px;
  margin-top: -100px;
  margin-bottom: 0px;
`;
const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const BannerContainer = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center;
  height: 250px;
`;

const ProfileMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  border: 1px lightgray solid;
  margin-bottom: 50px;
`;
export default Profile;
