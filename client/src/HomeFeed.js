import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import SmallTweet from "./SmallTweet";
import TweetInput from "./TweetInput";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import ErrorPage from "./ErrorPage";

const HomeFeed = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [tweetFeed, setTweetFeed] = useState("");
  const [feedFlag, setFeedFlag] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  useEffect(() => {
    fetch(`/api/me/home-feed`)
      .then((res) => res.json())
      .then((parsedRes) => {
        setTweetFeed(parsedRes);
      })
      .catch((error) => {
        console.log(error);

        setErrorStatus(true);
      });
  }, [feedFlag]);

  return (
    <>
      <ContentContainer>
        {errorStatus && <ErrorPage />}
        {!errorStatus && (
          <>
            <TitleContainer>Home</TitleContainer>
            <TitleContainer style={{ borderBottom: "15px solid lightgray" }}>
              {!currentUser && <LoadingSpinner />}
              {currentUser && (
                <TweetInput setFeedFlag={setFeedFlag} feedFlag={feedFlag} />
              )}
            </TitleContainer>
            {!tweetFeed && <LoadingSpinner />}
            {tweetFeed && (
              <>
                {tweetFeed.tweetIds.map((tweetId) => {
                  return (
                    <SmallTweet
                      key={tweetId}
                      tweetInfo={tweetFeed.tweetsById[tweetId]}
                    />
                  );
                })}
              </>
            )}
          </>
        )}
      </ContentContainer>
    </>
  );
};
const TitleContainer = styled.div`
  font-size: 1.3em;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 0px 20px 10px;
  border: 1px lightgray solid;
  max-height: 300px;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  /* border: 1px solid blue; */
`;

export default HomeFeed;
