import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import Profile from "./Profile";
import GlobalStyle from "./GlobalStyles";
import Sidebar from "./Sidebar";
import { CurrentUserContext } from "./CurrentUserContext";
import { useEffect, useContext } from "react";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "./LoadingSpinner";

const App = () => {
  const { status } = useContext(CurrentUserContext);

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <MainContainer>
          {status === "error" && <ErrorPage />}
          {status === "loading" && <LoadingSpinner />}
          {status === "idle" && (
            <>
              <Sidebar />
              <Routes>
                <Route path="/" element={<HomeFeed />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/tweet/:tweetId" element={<TweetDetails />} />
                <Route path="/:profileId" element={<Profile />} />
              </Routes>
            </>
          )}
        </MainContainer>
      </BrowserRouter>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;

  /* min-width: 600px; */
  margin: 0px auto;
`;
export default App;
