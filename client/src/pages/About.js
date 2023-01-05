import React from "react";
import Profile from "../components/cards/ProfileThreeColGrid";
import { Container, ContentWithPaddingXl } from "../components/misc/Layouts.js";
import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../images/svg-decorator-blob-7.svg";
import HeaderBase from "../components/headers/light.js";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "../helpers/AnimationRevealPage";

//decorations
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const Header = tw(HeaderBase)`max-w-none`;
const About = () => {
  return (
    <AnimationRevealPage>
      <Container>
        <Header />
        <Profile />
        <DecoratorBlob1 />
        <DecoratorBlob2 />
      </Container>
    </AnimationRevealPage>
  );
};

export default About;
