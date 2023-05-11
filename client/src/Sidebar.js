import React from "react";
import styled from "styled-components";
import { COLORS } from "./constants";
import { ReactComponent as CritterLogo } from "./assets/logo.svg";
import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const Sidebar = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <SidebarContainer>
      <CritterLogo style={{ width: "60px" }} />
      <StyledNavLink to={`/`}>
        <FiHome />
        <span>Home</span>
      </StyledNavLink>
      <StyledNavLink to={`/${currentUser.profile.handle}`}>
        <FiUser />
        <span>Profile</span>
      </StyledNavLink>
      <StyledNavLink to={"/notifications"}>
        <FiBell />
        <span>Notifications</span>
      </StyledNavLink>
      <StyledNavLink to={"/bookmarks"}>
        <FiBookmark />
        <span>Bookmarks</span>
      </StyledNavLink>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  /* padding-right: 80px; */
  height: fit-content;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-weight: bold;
  width: fit-content;
  color: black;
  border-radius: 25px;
  padding: 10px 20px;
  margin: 5px 0px;
  & span {
    margin-left: 10px;
  }
  &.active,
  :hover {
    color: ${COLORS.primary};
    background-color: RGB(76, 0, 255, 0.2);
  }
`;
export default Sidebar;
