import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  RefinementList,
  Pagination,
} from "react-instantsearch-hooks-web";
import React from "react";
import Banner from "./Banner";
import Header from "./Header";
import styled from "styled-components";

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

function Hit({ hit }) {

  return (
    <article>
      <UserCard user={hit} key={hit.id} />
    </article>
  );
}

const Home = () => {
  const searchClient = algoliasearch(
    "F1K7P1CJSO",
    "edd15deed9e61a4b64095726b783e9df"
  );

  return (
    <MainPlpStyles>
      <div className="plp-header">
        <Header />
      </div>
      <div className="plp-banner">
        <Banner />
      </div>
      <InstantSearch searchClient={searchClient} indexName="fifa-wc-tickets">
        <SearchBox />
        <RefinementList attribute="brand" />
        <Hits hitComponent={Hit} />
        <Pagination />
      </InstantSearch>
    </MainPlpStyles>
  );
};
export default Home;
