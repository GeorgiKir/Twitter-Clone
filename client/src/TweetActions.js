import React from "react";
import styled from "styled-components";
import { SlBubble } from "react-icons/sl";
import { FiShare, FiHeart } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const TweetActions = ({
  tweetInfo,
  tweetId,
  isLiked,
  isRetweeted,
  numRetweets,
  tweetAuthor,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [tweetLiked, setTweetLiked] = useState(isLiked);
  const [numLikes, setNumLikes] = useState(tweetInfo);
  const [retweeted, setRetweeted] = useState(isRetweeted);
  const [numRetweetsCounter, setNumRetweetsCounter] = useState(numRetweets);

  const handleLike = () => {
    fetch(`/api/tweet/${tweetId}/like`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        like: !tweetLiked,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(tweetLiked);
        setTweetLiked(!tweetLiked);
        if (tweetLiked === false) {
          setNumLikes(numLikes + 1);
        } else if (tweetLiked === true) {
          setNumLikes(numLikes - 1);
        }
        console.log(tweetLiked);
      })
      .catch((error) => {
        window.alert("An unexpcted error occured. Please try again.");
      });
  };

  const handleRetweet = () => {
    if (retweeted === false) {
      setNumRetweetsCounter(numRetweetsCounter + 1);
      setRetweeted(!retweeted);
    } else if (retweeted === true) {
      setNumRetweetsCounter(numRetweetsCounter - 1);
      setRetweeted(!retweeted);
    }
    // fetch(`/api/tweet/${tweetId}/retweet`, {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     retweet: !retweeted,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setRetweeted(!retweeted);
    //     console.log(data);
    //     if (retweeted === false) {
    //       setNumRetweetsCounter(numRetweetsCounter + 1);
    //     } else if (retweeted === true) {
    //       setNumRetweetsCounter(numRetweetsCounter - 1);
    //     }
    //   })
    //   .catch((error) => {
    //     window.alert("An unexpcted error occured. Please try again.");
    //   });
  };
  return (
    <TweetActionsContainer>
      <ActionInfoContainer>
        <SlBubble />
      </ActionInfoContainer>
      <ActionInfoContainer
        // Disabled because it would not make sense to retweet your own tweet.
        disabled={tweetAuthor === currentUser.profile.handle ? true : false}
        onClick={() => {
          handleRetweet();
        }}
      >
        <AiOutlineRetweet style={{ marginRight: "5px" }} />
        {numRetweetsCounter > 0 && <>{numRetweetsCounter}</>}
      </ActionInfoContainer>
      <ActionInfoContainer
        onClick={() => {
          handleLike();
        }}
      >
        {!tweetLiked && <FiHeart style={{ marginRight: "5px" }} />}
        {tweetLiked && (
          <>
            <FaHeart style={{ color: "red", marginRight: "5px" }} />
            {numLikes}
          </>
        )}
      </ActionInfoContainer>
      <ActionInfoContainer>
        <FiShare />
      </ActionInfoContainer>
    </TweetActionsContainer>
  );
};
const ActionInfoContainer = styled.button`
  background-color: white;
  border: none;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
`;
const TweetActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  & button {
    scale: 1.2;
    width: 20%;
  }
`;

export default TweetActions;
