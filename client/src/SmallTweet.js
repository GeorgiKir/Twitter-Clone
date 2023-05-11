import React from "react";
import styled from "styled-components";
import TweetActions from "./TweetActions";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { AiOutlineRetweet } from "react-icons/ai";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";

const SmallTweet = ({ tweetInfo }) => {
  let tweetDate = format(new Date(tweetInfo.timestamp), "LLL do");

  const navigate = useNavigate();

  const handleTweetNavigation = (targetTweetId, e) => {
    e.preventDefault();
    navigate(`/tweet/${targetTweetId}`);
  };

  return (
    <SmallTweetContainer>
      <UserAvatar src={tweetInfo.author.avatarSrc} />
      <SmallTweetContent>
        {tweetInfo.retweetFrom && (
          <Retweet>
            <AiOutlineRetweet /> {tweetInfo.retweetFrom.displayName} Remeowed
          </Retweet>
        )}
        <SmallTweetInfo>
          <Tippy
            delay={750}
            content={
              <span>
                Followers: {tweetInfo.author.numFollowers} / Following:{" "}
                {tweetInfo.author.numFollowing}
              </span>
            }
          >
            <DisplayNameLink to={`/${tweetInfo.author.handle}`}>
              {tweetInfo.author.displayName}
            </DisplayNameLink>
          </Tippy>
          <UserInfoSpan>
            @{tweetInfo.author.handle} - {tweetDate}
          </UserInfoSpan>
        </SmallTweetInfo>
        <StatusContainer
          onClick={(e) => {
            handleTweetNavigation(tweetInfo.id, e);
          }}
        >
          <SmallTweetStatus>
            <TweetStatusSpan>{tweetInfo.status}</TweetStatusSpan>
          </SmallTweetStatus>
          {tweetInfo.media?.length > 0 && (
            <SmallTweetImage src={tweetInfo.media[0].url} />
          )}
        </StatusContainer>
        <TweetActions
          tweetAuthor={tweetInfo.author.handle}
          tweetInfo={tweetInfo.numLikes}
          tweetId={tweetInfo.id}
          isLiked={tweetInfo.isLiked}
          isRetweeted={tweetInfo.isRetweeted}
          numRetweets={tweetInfo.numRetweets}
        />
      </SmallTweetContent>
    </SmallTweetContainer>
  );
};
const Retweet = styled.span`
  margin: 0px 0px 15px 0px;
`;
const StatusContainer = styled.div`
  word-wrap: break-word;
  height: fit-content;
  &:hover {
    cursor: pointer;
  }
  width: calc(100% - 60px);
`;
const TweetStatusSpan = styled.p`
  margin: 5px auto 10px auto;
  font-size: 1.2em;
`;
export const UserInfoSpan = styled.span`
  color: gray;
`;
export const DisplayNameLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2em;
  margin-right: 5px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const SmallTweetImage = styled.img`
  border-radius: 15px;
  width: 95%;
  max-height: 450px;
  margin-bottom: 15px;
`;
const SmallTweetStatus = styled.div`
  margin-bottom: 5px;
  width: 95%;
`;

const SmallTweetInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  width: calc(100% - 60px);
`;

const SmallTweetContent = styled.div`
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const UserAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
`;

const SmallTweetContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0px 35px 10px;
  border: 1px lightgray solid;
`;
export default SmallTweet;
