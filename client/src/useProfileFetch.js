import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { format } from "date-fns";

const useProfileFetch = (
  setFollowersTab,
  tweetDate,
  setTweetDate,
  setUserProfileInfo,
  profileFlag,
  setUserTweets
) => {
  const { currentUser } = useContext(CurrentUserContext);

  const { profileId } = useParams();

  useEffect(() => {
    setFollowersTab(false);
    if (profileId !== currentUser.profile.handle) {
      fetch(`/api/${profileId}/profile`)
        .then((res) => res.json())
        .then((parsedRes) => {
          setUserProfileInfo(parsedRes);
          setTweetDate(format(new Date(parsedRes.profile.joined), "LLLL yyyy"));
        });

      fetch(`/api/${profileId}/feed`)
        .then((res) => res.json())
        .then((parsedRes) => {
          setUserTweets(parsedRes);
        });
    } else if (profileId === currentUser.profile.handle) {
      fetch(`/api/me/profile`)
        .then((res) => res.json())
        .then((parsedRes) => {
          setUserProfileInfo(parsedRes);
          setTweetDate(format(new Date(parsedRes.profile.joined), "LLLL yyyy"));
        });

      fetch(`/api/${currentUser.profile.handle}/feed`)
        .then((res) => res.json())
        .then((parsedRes) => {
          setUserTweets(parsedRes);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [profileFlag, profileId]);
};

export default useProfileFetch;
