import React from "react";
import styled from "styled-components";
import { UserAvatar } from "./SmallTweet";
import { useContext, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { COLORS } from "./constants";
import LoadingSpinner from "./LoadingSpinner";
import { ImSpinner3 } from "react-icons/im";
import { spinAnimation } from "./LoadingSpinner";

const TweetInput = ({ setFeedFlag, feedFlag }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [newTweet, setNewTweet] = useState("");
  const [tweetCounter, setweetCounter] = useState(280);
  const [inputLoading, setInputLoading] = useState(false);

  const handleTweetChange = (value) => {
    setNewTweet(value);
    setweetCounter(280 - value.length);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputLoading(true);

    if (newTweet !== "") {
      fetch("/api/tweet", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newTweet,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setNewTweet("");
          setweetCounter(280);
          setFeedFlag(!feedFlag);
          setInputLoading(false);
        })
        .catch((error) => {
          window.alert("An unexpected error occured. Please try again.");
          setNewTweet("");
          setweetCounter(280);
          setFeedFlag(!feedFlag);
          setInputLoading(false);
        });
    } else {
      window.alert("Your tweet is empty");
      setInputLoading(false);
    }
  };

  return (
    <>
      <TweetForm
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {!currentUser && <LoadingSpinner />}
        {currentUser && (
          <>
            <UserAvatar src={currentUser.profile.avatarSrc} />
            <TweetInputArea
              value={newTweet}
              placeholder="What's happening?"
              onChange={(e) => {
                handleTweetChange(e.target.value);
              }}
            ></TweetInputArea>
            <span
              style={{
                color:
                  tweetCounter <= 55
                    ? tweetCounter < 0
                      ? "red"
                      : "yellow"
                    : "gray",
              }}
            >
              {tweetCounter}
            </span>
            <TweetSubmitButton
              disabled={tweetCounter < 0}
              style={{
                backgroundColor:
                  tweetCounter < 0
                    ? " RGB(76, 0, 255, 0.2)"
                    : `${COLORS.primary}`,
              }}
            >
              {!inputLoading && <>MEOW</>}
              {inputLoading && (
                <SpinnerContainerDiv>
                  <ImSpinner3 size={"20px"} />
                </SpinnerContainerDiv>
              )}
            </TweetSubmitButton>
          </>
        )}
        {/* )} */}
      </TweetForm>
    </>
  );
};

const SpinnerContainerDiv = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  margin: 10% auto;
  animation-name: ${spinAnimation};
  animation-duration: 3s;
  animation-iteration-count: infinite;
`;

const TweetSubmitButton = styled.button`
  border: none;
  border-radius: 30px;
  font-size: 0.75em;
  font-weight: bold;
  height: 25%;
  width: 12%;
  color: white;
  background-color: ${COLORS.primary};
  align-self: flex-end;
`;

const TweetInputArea = styled.textarea`
  outline: none;
  resize: none;
  width: 70%;
  height: 80%;
  border: none;
  font-family: sans-serif;
  font-size: 1.2em;
`;
const TweetForm = styled.form`
  width: 95%;
  height: 20vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & span {
    align-self: flex-end;
    font-size: 0.7em;
    color: grey;
  }
`;

export default TweetInput;
