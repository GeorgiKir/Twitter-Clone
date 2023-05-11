import React from "react";
import styled from "styled-components";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { UserAvatar, DisplayNameLink, UserInfoSpan } from "./SmallTweet";
import { format } from "date-fns";
import TweetActions from "./TweetActions";

const BigTweet = ({ bigTweetInfo }) => {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/");
  };

  let tweetDate = format(new Date(bigTweetInfo.tweet.timestamp), "LLL dd yyyy");
  let tweetTime = format(new Date(bigTweetInfo.tweet.timestamp), "p");

  return (
    <BigTweetContainer>
      <BackArrowContainer>
        <AiOutlineArrowLeft
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleReturn();
          }}
        />
        <span>Meow</span>
      </BackArrowContainer>
      <UserInfoDiv>
        <UserAvatar src={bigTweetInfo.tweet.author.avatarSrc} />
        <UsernameDetails>
          <DisplayNameLink to={`/${bigTweetInfo.tweet.author.handle}`}>
            {bigTweetInfo.tweet.author.displayName}
          </DisplayNameLink>
          <UserInfoSpan>@{bigTweetInfo.tweet.author.handle}</UserInfoSpan>
        </UsernameDetails>
      </UserInfoDiv>
      <BigTweetStatus>{bigTweetInfo.tweet.status}</BigTweetStatus>
      {bigTweetInfo.tweet.media.length > 0 && (
        <BigTweetMedia src={bigTweetInfo.tweet.media[0].url} />
      )}
      <DateContainer>
        {tweetTime} {" · "}
        {tweetDate} {" · "} {"Critter web app"}
      </DateContainer>
      <ActionsDiv>
        <TweetActions
          tweetAuthor={bigTweetInfo.tweet.author.handle}
          tweetInfo={bigTweetInfo.tweet.numLikes}
          tweetId={bigTweetInfo.tweet.id}
          isLiked={bigTweetInfo.tweet.isLiked}
          isRetweeted={bigTweetInfo.tweet.isRetweeted}
          numRetweets={bigTweetInfo.tweet.numRetweets}
        />
      </ActionsDiv>
    </BigTweetContainer>
  );
};
const ActionsDiv = styled.div`
  width: 95%;
  margin: 15px auto;
  display: flex;
  justify-content: flex-end;
`;
const DateContainer = styled.span`
  color: grey;
  border-bottom: 1px lightgray solid;
  padding: 5px 0px 10px 20px;
  width: 95%;
  margin: 0px auto;
`;
const BigTweetMedia = styled.img`
  border-radius: 25px;
  width: 95%;
  height: auto;
  margin: 10px auto;
`;
const BigTweetStatus = styled.span`
  font-size: 1.5em;
  padding: 5px 20px;
  word-wrap: break-word;
`;

const UsernameDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 10px;
  margin-top: 5px;
`;

const UserInfoDiv = styled.div`
  display: flex;
  padding: 10px;
`;

const BackArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 0px 20px 20px;
  border-bottom: 1px lightgray solid;

  & span {
    font-size: 1.3em;
    font-weight: bold;
    margin-left: 10px;
  }
`;

const BigTweetContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px lightgray solid;
  width: 70%;
`;
export default BigTweet;
