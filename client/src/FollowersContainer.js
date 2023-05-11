import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FollowerThumbnail from "./FollowerThumbnail";

const FollowersContainer = ({ followersTab }) => {
  const { profileId } = useParams();
  const [followingState, setFollowingState] = useState("");
  const [followersState, setFollowersState] = useState("");
  const [followersThumbnailFlag, setFollowersThumbnailFlag] = useState();

  useEffect(() => {
    fetch(`/api/${profileId}/following`)
      .then((res) => res.json())
      .then((data) => {
        setFollowingState(data);
      });

    fetch(`/api/${profileId}/followers`)
      .then((res) => res.json())
      .then((data) => {
        setFollowersState(data);
      });
  }, [followersThumbnailFlag]);
  return (
    <>
      <div>
        {followersTab === "Following" && followingState && (
          <>
            {followingState.following.map((followingUserProfile) => {
              return (
                <FollowerThumbnail
                  key={followingState.following.indexOf(followingUserProfile)}
                  setProfileFlag={setFollowersThumbnailFlag}
                  profileFlag={followersThumbnailFlag}
                  followingUserProfile={followingUserProfile}
                />
              );
            })}
          </>
        )}
        {followersTab === "Followers" && followersState && (
          <>
            {followersState.followers.map((followerUserProfile) => {
              return (
                <FollowerThumbnail
                  key={followersState.followers.indexOf(followerUserProfile)}
                  followingUserProfile={followerUserProfile}
                  setProfileFlag={setFollowersThumbnailFlag}
                  profileFlag={followersThumbnailFlag}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default FollowersContainer;
