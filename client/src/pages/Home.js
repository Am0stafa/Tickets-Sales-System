import React, { useRef } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import Hero from "../components/hero/TwoColumnWithVideo.js";
import Features from "../components/features/ThreeColSimple.js";
import MainFeature2 from "../components/features/TwoColSingleFeatureWithStats2.js";
import TabGrid from "../components/cards/TabCardGrid.js";
import Testimonial from "../components/testimonials/ThreeColumnWithProfileImage.js";
import DownloadApp from "../components/cta/DownloadApp.js";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import { SectionHeading } from "../components/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "../components/misc/Layouts.js";
// import SliderCard from "../components/cards/ThreeColSlider.js";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Menu,
  Pagination,
} from "react-instantsearch-hooks-web";
import chefIconImageSrc from "../images/chef-icon.svg";
import celebrationIconImageSrc from "../images/celebration-icon.svg";
import shopIconImageSrc from "../images/shop-icon.svg";
import algoliasearch from "algoliasearch/lite";
import styled from "styled-components";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../images/svg-decorator-blob-7.svg";
import "instantsearch.css/themes/satellite.css";

//decorations
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

//generates cards (algolia)
function Hit({ hit }) {
  return <TabGrid user={hit} />;
}

const Home = () => {
  const myRef = useRef();

  const searchClient = algoliasearch(
    "F1K7P1CJSO",
    "edd15deed9e61a4b64095726b783e9df"
  );
  const HeaderRow = tw.div``;
  const Header = tw(SectionHeading)``;
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  // const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;

  return (
    <AnimationRevealPage>
      <Hero
        heading={
          <>
            Buy your <HighlightedText>World Cup</HighlightedText>
            Tickets Now!
          </>
        }
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        imageSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Order Now"
        watchVideoButtonText="Meet The Chefs"
      />

      {/* <SliderCard /> */}

      <Container>
        <ContentWithPaddingXl>
          <InstantSearch
            searchClient={searchClient}
            indexName="fifa-wc-tickets"
          >
            <HeaderRow ref={myRef}>
              <Header>
                All <HighlightedText>Matches</HighlightedText>
              </Header>
            </HeaderRow>
            <div style={{ marginTop: "30px" }}></div>
            <SearchBox
              style={{ margin: "30px" }}
              placeholder="Start searching..."
              onClick={() => {
                myRef.current.scrollIntoView({ behavior: "smooth" });
              }}
            />

            <Hits hitComponent={Hit} />
            <div style={{ marginTop: "60px" }}></div>

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
            key: "Customer Support Agents",
            value: "1500+",
          },
        ]}
        primaryButtonText="Order Now"
        primaryButtonUrl="https://order.now.com"
        imageInsideDiv={false}
        imageSrc="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzNzI2fQ&auto=format&fit=crop&w=768&q=80"
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
      <DownloadApp
        text={
          <>
            People around you are ordering delicious meals using the{" "}
            <HighlightedTextInverse>Treact App.</HighlightedTextInverse>
          </>
        }
      />
      <Footer />
    </AnimationRevealPage>
  );
};
export default Home;
