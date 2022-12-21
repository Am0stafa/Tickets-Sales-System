/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "../misc/Headings.js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MatchLogo from "../MatchLogo";
import { Progress } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import Form from "../Form.js";
import AppContext from "../../context/Total";

const Container = tw.div`relative`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;

const TextColumn = styled(Column)((props) => [
  tw`md:w-6/12 mt-8 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-8 lg:mr-16 md:order-first`
    : tw`md:ml-8 lg:ml-16 md:order-last`,
]);

const TextContent = tw.div`lg:py-8`;

const Heading = tw(
  SectionHeading
)`text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-4`;

const Statistics = tw.div`mt-6 lg:mt-8 xl:mt-16 flex flex-wrap`;
const Statistic = tw.div`text-lg sm:text-2xl lg:text-3xl w-1/2 mt-4 lg:mt-10 text-center md:text-left`;

export default ({ textOnLeft = false }) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  //Change the statistics variable as you like, add or delete objects
  const navigate = useNavigate();
  const loc = useLocation();
  const match = loc.state;
  const [progress, setProgress] = React.useState(0);
  const [choices, setChoices] = React.useState({});
  const { total } = React.useContext(AppContext);

  return (
    <Container>
      <div style={{ marginLeft: "4em", marginRight: "4em" }}>
        <TextContent>
          <Progress value={progress} label="Completed" color="teal" />
          <Heading>We have the best service.</Heading>
          <Description>1. Click the logo to choose your team</Description>
          <MatchLogo
            user={match}
            setProgress={setProgress}
            progress={progress}
            choices={choices}
            setChoices={setChoices}
          />
          <Description>
            2. Specify the number of tickets You can choose up to 4 tickets
          </Description>
          <div className="type1" style={{ display: "none" }}>
            <ul>
              <Form
                num="1"
                price="USD 200"
                setProgress={setProgress}
                progress={progress}
              />
              <Form
                num="2"
                price="USD 400"
                setProgress={setProgress}
                progress={progress}
              />
              <Form
                num="3"
                price="USD 800"
                setProgress={setProgress}
                progress={progress}
              />
              <Form
                num="4"
                price="USD 1200"
                setProgress={setProgress}
                progress={progress}
              />
            </ul>
            <div display="flex">
              <h2>Total {total}</h2>
            </div>
          </div>
          <button
            className="button button-green width-auto"
            // onClick={() => navigate(`/book/${user.id}`, { state: { ...user } })}
          >
            Proceed
          </button>
        </TextContent>
      </div>
    </Container>
  );
};
