import React from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../components/BookCard";
import Header from "../components/Header";
import styled from "styled-components";
import MatchLogo from "../components/MatchLogo";
import { Progress } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import AppContext from '../context/Total'

const MainPlpStyles = styled.div`
  width: 100%;
  margin-bottom: 8rem;
  .plp-banner {
    width: 100%;
  }
  .plp-header {
    margin: auto;
  }
  .plp-banner {
    height: 100px;
    margin: auto;
  }
  .big {
    display: flex;
    justify-content: center;
  }
`;
export const Book = () => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const loc = useLocation();
  const match = loc.state;
  const [progress, setProgress] = React.useState(0);
  const [choices, setChoices] = React.useState({});
  const {total} = React.useContext(AppContext)
  


  return (
    <MainPlpStyles>
      <div className="plp-header">
        <Header />
      </div>
      <div style={{ marginTop: "4em" }}>
        <BookCard user={match} />
        <div className="big">
          <div className="booked">
            <Progress value={progress} label="Completed" color="teal" />
            <span style={{ margin: "0.5em" }}></span>

            <Typography variant="lead" color="green">
              1. Click the logo to choose your team
            </Typography>
            <span style={{ margin: "2.5em" }}></span>
            <MatchLogo
              user={match}
              setProgress={setProgress}
              progress={progress}
              choices={choices}
              setChoices={setChoices}
            />
            <span style={{ margin: "2em" }}></span>
            <div>
              <Typography variant="lead" color="green">
                2. Specify the number of tickets
              </Typography>
              <h3>You can choose up to 4 tickets</h3>
            </div>

            <span style={{ margin: "2em" }}></span>
            <div className="type1" style={{ display: "none" }}>
              <Form num="1" price="USD 200" setProgress={setProgress} progress={progress} />
              <Form num="2" price="USD 400"  setProgress={setProgress} progress={progress} />
              <Form num="3" price="USD 800" setProgress={setProgress} progress={progress} />
              <Form num="4" price="USD 1200" setProgress={setProgress} progress={progress} />
              <span style={{ margin: "2em" }}></span>

              <div display="flex">
                <h2>Total {total}</h2>
              </div>
              <div
                style={{
                  display: "flex",
                  margin: "2em",
                  justifyContent: "right",
                }}
              >
                <button
                  className="button button-green width-auto"
                  // onClick={() => navigate(`/book/${user.id}`, { state: { ...user } })}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPlpStyles>
  );
};
