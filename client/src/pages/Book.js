import React from "react";
import tw from "twin.macro";
import HeaderBase from "../components/headers/light.js";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import MainFeature from "../components/features/TwoColSingleFeatureWithStats.js";

const Header = tw(HeaderBase)`max-w-none`;

export const Book = () => {
  // eslint-disable-next-line no-unused-vars
  const buttonRoundedCss = tw`rounded-full`;

  return (
    <AnimationRevealPage>
      <Header />
      <MainFeature />
    </AnimationRevealPage>
  );
};
