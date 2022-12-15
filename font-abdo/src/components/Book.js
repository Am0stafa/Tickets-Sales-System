import React from "react";
import { useLocation } from "react-router-dom";
import BookCard from "./BookCard";
import Banner from "./Banner";
import Header from "./Header";
import styled from "styled-components";
import data from "./matches.js";
import MatchLogo from "./MatchLogo";
import { Progress } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";


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
export const Book = () => {
  const loc = useLocation();
  const match = loc.state;
  const [progress, setProgress] = React.useState(0);
  const [choices, setChoices] = React.useState({});
    console.log(choices)
  return (
    <MainPlpStyles>
      <div className="plp-header">
        <Header />
      </div>
      <div>
        <BookCard user={match} />
        <Progress value={progress} label="Completed" color="teal" />;
        <Typography variant="lead" color="green">
            1. Click the logo to choose your team
        </Typography>
        <MatchLogo user={match} setProgress={setProgress} progress={progress}
        choices={choices} setChoices={setChoices} />
        
        <Typography variant="lead" color="green">
            2. Specify the number of tickets
        </Typography>
        <Typography variant="small" color="blue-gray">
            You can choose up to 4 tickets
        </Typography>
      </div>
    </MainPlpStyles>
  );
};
