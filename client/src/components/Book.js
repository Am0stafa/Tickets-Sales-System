import React from "react";
import { useLocation } from "react-router-dom";
import BookCard from "./BookCard";
import Banner from "./Banner";
import Header from "./Header";
import styled from "styled-components";
import data from "./matches.js";
const MainPlpStyles = styled.div`
  width: 100%;
  margin-bottom: 8rem;
  .plp-banner {
    width: 100%;
  }
  .plp-header {
    width: 70%;
    margin: auto;
  }
  .plp-banner {
    height: 100px;
    margin: auto;
  }
`;
export const Book = () => {
  const loc = useLocation();
  const match = loc.state;

  return (
    <MainPlpStyles>
      <div className="plp-header">
        <Header />
      </div>
      <div className="plp-banner">
        <Banner />
      </div>
      <div>
        <BookCard user={match} />
      </div>
    </MainPlpStyles>
  );
};
