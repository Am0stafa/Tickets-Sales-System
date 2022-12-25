import React from "react";
import tw from "twin.macro";
import HeaderBase, {
  NavLinks,
  NavLink,
  PrimaryLink,
} from "../components/headers/light.js";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import MainFeature from "../components/features/TwoColSingleFeatureWithStats.js";

const Header = tw(HeaderBase)`max-w-none`;

export const Book = () => {
  // eslint-disable-next-line no-unused-vars
  const buttonRoundedCss = tw`rounded-full`;

  const navLinks = [
    <NavLinks key={1}>
      <NavLink href="/#">About</NavLink>
      <NavLink href="/#">Blog</NavLink>
      <NavLink href="/#">Pricing</NavLink>
      <NavLink href="/#">Contact Us</NavLink>
      <NavLink href="/#">Testimonials</NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      <NavLink href="/#" tw="lg:ml-12!">
        Login
      </NavLink>
      <PrimaryLink css={buttonRoundedCss} href="/#">
        Sign Up
      </PrimaryLink>
    </NavLinks>,
  ];
  return (
    <AnimationRevealPage>
      <Header links={navLinks} />
      <MainFeature />
    </AnimationRevealPage>
  );
};
