import React from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../components/BookCard";
import Header from "../components/Header";
import styled from "styled-components";
import data from "../components/matches.js";
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
    <>
      <div className="plp-header">
        <Header />
      </div>

      <div style={{ "margin-top": 100 }}>
        <BookCard user={match} />
      </div>
    </>
  );
};