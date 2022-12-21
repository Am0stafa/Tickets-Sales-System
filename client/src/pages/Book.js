import React from "react";
import Header from "../components/headers/light.js";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import MainFeature from "../components/features/TwoColSingleFeatureWithStats.js";

export const Book = () => {
  // eslint-disable-next-line no-unused-vars

  return (
    <AnimationRevealPage>
      <Header />
      <MainFeature />
    </AnimationRevealPage>
  );
};
