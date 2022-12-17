import UserCard from "../components/UserCard.js";
import algoliasearch from "algoliasearch/lite";
import Header from "../components/Header.js";
import Banner from "../components/Banner.js";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Menu,
  Pagination,
} from "react-instantsearch-hooks-web";
import React from "react";
import styled from "styled-components";
import "instantsearch.css/themes/satellite.css";

const MainPlpStyles = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  .plp-banner {
    width: 100%;
    height: 300px;
  }
  .plp-header {
    margin: auto;
  }

  .main-div {
    margin-top: 4rem;
  }
`;

function Hit({ hit }) {
  console.log(hit);
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
      <div className="main-div">
        <InstantSearch searchClient={searchClient} indexName="fifa-wc-tickets">
          <SearchBox
            placeholder="Start searching..."
            onClick={() =>
              window.scrollBy({
                top: 500,
                left: 0,
                behavior: "smooth",
              })
            }
          />
          <Hits hitComponent={Hit} />
          <Pagination />
          <Menu
            attribute="categories"
            showMore={true}
            translations={{
              showMore: "Voir plus",
            }}
          />
        </InstantSearch>
      </div>
    </MainPlpStyles>
  );
};
export default Home;
