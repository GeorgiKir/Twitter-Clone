import React from "react";
import { useParams } from "react-router-dom";
import BigTweet from "./BigTweet";
import { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "./LoadingSpinner";

const TweetDetails = () => {
  const { tweetId } = useParams();
  const [bigTweet, setBigTweet] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((parsedRes) => {
        setBigTweet(parsedRes);
      })
      .catch((error) => {
        console.log(error);
        setErrorStatus(true);
      });
  }, []);

  return (
    <>
      {errorStatus && <ErrorPage />}
      {!errorStatus && !bigTweet && <LoadingSpinner />}
      {!errorStatus && bigTweet && <BigTweet bigTweetInfo={bigTweet} />}
    </>
  );
};

export default TweetDetails;
