import React from "react";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

import { BiStore, BiShoppingBag, BiUserCircle } from "react-icons/bi";

const HeaderStyles = styled.div`
  width: 100%;
  background-color: #219f45;

  .header {
    width: 90%;
    height: 100px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    width: 20%;
    display: flex;
    font-size: 2rem;
  }
  .menu {
    width: 60%;
    margin: auto;
    ul {
      text-align: center;
      padding: 0 4rem;
      li {
        width: 30%;
        display: inline-block;
        font-weight: 500;
        color: var(--gray-1);
      }
    }
  }
  .menu-icons {
    width: 20%;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    font-size: 30px;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderStyles>
      <div className="header">
        <div className="logo">
          <image>
            <img src="/assets/logo.png" style={{ height: "80px" }} alt="logo" />
          </image>
        </div>
        <nav className="menu">
          <ul>
            <button className="butt" onClick={() => navigate("/")}>
              Home
            </button>
            <button
              className="butt"
              // onClick={() =>
              //   // navigate(`/my-tickets/${user.id}`, { state: { ...user } })
              // }
            >
              My Tickets
            </button>
          </ul>
        </nav>
        <div className="menu-icons">
          <span>
            <BiUserCircle />
          </span>
          <span>
            <BiShoppingBag />
          </span>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
