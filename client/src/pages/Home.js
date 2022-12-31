import React, { useRef, useState, useEffect } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "../components/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "../components/misc/Layouts.js";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Menu,
  Pagination,
} from "react-instantsearch-hooks-web";
import algoliasearch from "algoliasearch/lite";
import styled from "styled-components";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../images/svg-decorator-blob-7.svg";
import "instantsearch.css/themes/satellite.css";
import axios from "axios";
import { useAsync } from "react-async-hook";
import { getAllAvailability } from "../services/shop";
import ReactLoading from "react-loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const handshake = React.lazy(() => import("../images/handshake.jpg"));

const AnimationRevealPage = React.lazy(() =>
  import("../helpers/AnimationRevealPage.js")
);
const Hero = React.lazy(() =>
  import("../components/hero/TwoColumnWithVideo.js")
);
const Features = React.lazy(() =>
  import("../components/features/ThreeColSimple.js")
);
const MainFeature2 = React.lazy(() =>
  import("../components/features/TwoColSingleFeatureWithStats2.js")
);
const TabGrid = React.lazy(() => import("../components/cards/TabCardGrid.js"));
const Testimonial = React.lazy(() =>
  import("../components/testimonials/ThreeColumnWithProfileImage.js")
);
const Footer = React.lazy(() =>
  import("../components/footers/MiniCenteredFooter.js")
);

//decorations
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const Home = () => {
  const myRef = useRef();
  function Hit({ hit }) {
    return <TabGrid countryCode={countryCode} user={hit} />;
  }
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    //https://extreme-ip-lookup.com/json/?key=asZaRChNXhO3sOgN1rGE
    // fetch('https://ipapi.co/json/')
    axios
      .get("https://ipapi.co/json/")

      .then((response) => {
        // setCountryCode(response.data.countryCode);
        setCountryCode(response.data.country);
        // console.log("Continent is : ", continent(response.data.countryCode));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchClient = algoliasearch(
    "F1K7P1CJSO",
    "edd15deed9e61a4b64095726b783e9df"
  );
  const HeaderRow = tw.div``;
  const Header = tw(SectionHeading)``;
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const imageCss = tw`rounded-4xl`;

  const { result, error, loading } = useAsync(getAllAvailability);

  if (error) return <div>Error please refresh the page</div>;
  // if (result) console.log("result", result);

  return (
    <AnimationRevealPage>
      <Hero
        heading={
          <>
            Buy your <HighlightedText>World Cup </HighlightedText> Tickets Now!
          </>
        }
        description="Hurry up! Buy your FIFA World Cup Qatar 2022 tickets right now, with the lowest prices on the market!"
        imageSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Order Now"
        watchVideoButtonText="Meet The Chefs"
      />

      <Container>
        <ContentWithPaddingXl>
          <InstantSearch
            searchClient={searchClient}
            indexName="fifa-wc-tickets"
          >
            <section id="things">
              <HeaderRow ref={myRef}>
                <Header>
                  All <HighlightedText>Matches</HighlightedText>
                </Header>
              </HeaderRow>
            </section>
            <div style={{ marginTop: "30px" }}></div>
            <SearchBox
              style={{ margin: "30px" }}
              placeholder="Start searching..."
              onClick={() => {
                myRef.current.scrollIntoView({ behavior: "smooth" });
              }}
            />

            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  marginTop: "50px",
                  marginRight: "2em",
                  marginLeft: "2em",
                }}
              >
                <div style={{ marginBottom: "30px", marginRight: "55px" }}>
                  <Skeleton height={50} width={325} />
                  <Skeleton height={200} width={325} />
                </div>
                <div style={{ marginBottom: "30px", marginRight: "55px" }}>
                  <Skeleton height={50} width={325} />
                  <Skeleton height={200} width={325} />
                </div>
                <div>
                  <Skeleton height={50} width={325} />
                  <Skeleton height={200} width={325} />
                </div>
                <div style={{ marginBottom: "30px", marginRight: "55px" }}>
                  <Skeleton height={50} width={325} />
                  <Skeleton height={200} width={325} />
                </div>
                <div style={{ marginBottom: "30px", marginRight: "55px" }}>
                  <Skeleton height={50} width={325} />
                  <Skeleton height={200} width={325} />
                </div>
                <div>
                  <Skeleton height={50} width={325} />
                  <Skeleton height={200} width={325} />
                </div>
              </div>
            ) : (
              <Hits hitComponent={Hit} />
            )}
            <div style={{ marginTop: "35px" }}></div>

            <Pagination />
            <Menu
              attribute="categories"
              showMore={true}
              translations={{
                showMore: "Voir plus",
              }}
            />
          </InstantSearch>
        </ContentWithPaddingXl>
        <DecoratorBlob1 />
        <DecoratorBlob2 />
      </Container>
      <Features
        heading={
          <>
            Amazing <HighlightedText>Services.</HighlightedText>
          </>
        }
        cards={[
          {
            imageSrc: "/assets/flash.png",
            title: "Quick Delivery",
            description: "Receive your ticket in less than 24 hours",
            url: "https://google.com",
          },
          {
            imageSrc: "/assets/customer-service.png",
            title: "24/7 Support",
            description: "Chat with or call our customer support at any time ",
            url: "https://timerse.com",
          },
          {
            imageSrc: "/assets/refund.png",
            title: "Easy Refund",
            description: "Guaranteed to get your money back",
            url: "https://reddit.com",
          },
        ]}
        imageContainerCss={tw`p-2!`}
        imageCss={tw`w-20! h-20!`}
      />
      <MainFeature2
        subheading={<Subheading>A Trusted Seller</Subheading>}
        heading={
          <>
            Why <HighlightedText>Choose Us ?</HighlightedText>
          </>
        }
        statistics={[
          {
            key: "Tickets Sold",
            value: "94000+",
          },
          {
            key: "Customers",
            value: "11000+",
          },
          {
            key: "Employees",
            value: "1500+",
          },
        ]}
        primaryButtonText="Order Now"
        primaryButtonUrl="https://order.now.com"
        imageInsideDiv={false}
        imageSrc={handshake}
        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/2 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
      />
      <Testimonial
        subheading=""
        heading={
          <>
            Customers <HighlightedText>Love Us.</HighlightedText>
          </>
        }
      />
      <Footer />
    </AnimationRevealPage>
  );
};
export default Home;
