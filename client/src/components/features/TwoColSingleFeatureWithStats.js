/* eslint-disable import/no-anonymous-default-export */
import React, { useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "../misc/Headings.js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MatchLogo from "../MatchLogo";
import Form from "../Form.js";
import AppContext from "../../context/Total";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/svg-decorator-blob-7.svg";
import  {
  NavLinks,
  NavLink,
  PrimaryLink,
} from "../headers/light.js";
import ProgressBar from "@ramonak/react-progress-bar";
const Container = tw.div`relative`;
const Value = tw.div`font-bold text-primary-500`;
const Key = tw.div`font-medium text-gray-700`;
const TextContent = tw.div`lg:py-8`;
const Heading = tw(
  SectionHeading
)`text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-4`;

export default ({ textOnLeft = false }) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  //Change the statistics variable as you like, add or delete objects
  const reff = useRef();
  const navigate = useNavigate();
  const loc = useLocation();
  const match = loc.state;
  const [progress, setProgress] = React.useState(0);
  const [choices, setChoices] = React.useState({});
  const { total } = React.useContext(AppContext);
  const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
    ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
  `;
  const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
    ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
  `;

    const handelClick = () => {
        //TODO: api
        navigate("/checkout/123", { state: {choices,total,match} });
    };




  return (
    <Container>
      <div style={{ marginLeft: "4em", marginRight: "4em" }}>
        <TextContent>
          <Container>
            <div style={{ margin: "1em" }}></div>

            <Heading>Complete your ticket order.</Heading>
            <div style={{ margin: "2em" }}></div>
            <ProgressBar completed={progress} />

            <Description>1. Click the logo to choose your team</Description>

            <div style={{ margin: "2em" }}></div>
            <MatchLogo
              myRef={reff}
              user={match}
              setProgress={setProgress}
              progress={progress}
              choices={choices}
              setChoices={setChoices}
            />
            <DecoratorBlob1 />
            <DecoratorBlob2 />
          </Container>
          <Container>
            <div style={{ marginBottom: "4em" }}></div>
            <section ref={reff}>
              <div className="type1" style={{ display: "none" }}>
                <Description>
                  2. Specify the number of tickets You can choose up to 4
                  tickets
                </Description>
                <div style={{ marginBottom: "1em" }}></div>

                <div
                  style={{
                    borderRadius: "5px",
                  }}
                >
                  <div style={{ height: "10px" }}></div>
                  <ul>
                    <Form
                      num="1"
                      price="USD 200"
                      setProgress={setProgress}
                      progress={progress}
                    />
                    <div style={{ margin: "1em" }}></div>

                    <Form
                      num="2"
                      price="USD 400"
                      setProgress={setProgress}
                      progress={progress}
                    />
                    <div style={{ margin: "1em" }}></div>

                    <Form
                      num="3"
                      price="USD 800"
                      setProgress={setProgress}
                      progress={progress}
                    />
                    <div style={{ margin: "1em" }}></div>

                    <Form
                      num="4"
                      price="USD 1200"
                      setProgress={setProgress}
                      progress={progress}
                    />
                  </ul>
                  <div
                    className="user-card"
                    style={{
                      backgroundColor: "transparent",
                      marginTop: "30px",
                    }}
                  >
                    <Key>Total </Key>
                    <Value>USD {total}</Value>
                    <h1>3</h1>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "auto",
                      marginTop: "20px",
                    }}
                  >
                    <NavLinks>
                      <NavLink href="/#" tw="lg:ml-12!">
                        Go Back
                      </NavLink>
                    </NavLinks>
                    <NavLinks>
                      <PrimaryLink onClick={handelClick}>Proceed</PrimaryLink>
                    </NavLinks>
                  </div>
                </div>
                <DecoratorBlob1 />
                <DecoratorBlob2 />
              </div>
            </section>
          </Container>
        </TextContent>
      </div>
    </Container>
  );
};
