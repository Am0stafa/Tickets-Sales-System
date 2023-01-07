import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase/config";
import "./Ticket.css";
import tw from "twin.macro";
import styled from "styled-components";
import Cell from "./Ticket.js";
import axios from "axios";
import Head from "../headers/light.js";
import { Container, ContentWithPaddingXl } from "../misc/Layouts.js";
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";

const { useState, useEffect } = React;
const rootElement = document.getElementById("root");
const SectionHeading = tw.h2`text-4xl sm:text-5xl font-black tracking-wide text-center`;
const HeaderRow = tw.div``;
const Headr = tw(SectionHeading)``;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;

const Header = (
  <HeaderRow>
    <Headr>
      Your <HighlightedText>Orders</HighlightedText>
    </Headr>
  </HeaderRow>
);

const MyTickets = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const email = location.state.email;
  console.log(email);
  useEffect(() => {
    async function fetchData() {
      try {
        if (email) {
          const  {data}  = await axios.get(
            `https://user-blush.vercel.app/api/users/mail/${email}`
          );
          const id = data.data;
          const url = `https://user-blush.vercel.app/api/users/ticket/${id}`;
          console.log(url);
          const res = await axios.get(url);
          setResults(res.data.data);
          console.log(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;
  const SecondaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100`;
  const Value = tw.span`font-bold text-primary-500`;
  const Key = tw.div`font-medium text-gray-700`;
  const Plan = styled.div`
    ${tw`border-2 border-gray-200 shadow-none`}
  `;
  const navigate = useNavigate();
  if (!auth.currentUser) {
    navigate("/");
  }
  return (
    <AnimationRevealPage>
      <Head />
      <div style={{ height: "70px" }} />
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="whole">
          {Header}
          <div style={{ height: "30px" }} />

          {results.map((res) => (
            <Plan
              style={{
                padding: "20px",
                backgroundColor: "#edf2f7",
                marginBottom: "30px",
              }}
            >
              <Key style={{ fontSize: "20px" }}>
                Order <Value style={{ fontSize: "20px" }}> {res.id}</Value>
              </Key>
              <div style={{ display: "flex", padding: "14px" }}>
                <img
                  style={{ height: "60px", width: "60px" }}
                  src={`/assets/${res.Reservation[0].Ticket.Match.homeTeam}.png`}
                  alt="home"
                />

                <div
                  style={{
                    display: "flex",
                    width: "40px",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center center",
                  }}
                >
                  <Value>vs</Value>
                </div>
                <img
                  style={{ height: "60px", width: "60px" }}
                  src={`/assets/${res.Reservation[0].Ticket.Match.awayTeam}.png`}
                  alt="home"
                />
                <div style={{ width: "70px" }}></div>
                <div
                  style={{
                    display: "flex",
                    width: "40px",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center center",
                  }}
                >
                  {" "}
                  <Key>
                    Status:<Value>{res.status}</Value>
                  </Key>
                </div>
                <div style={{ width: "70px" }}></div>
                <div
                  style={{
                    display: "flex",
                    width: "100px",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center center",
                  }}
                >
                  <Key>
                    <Value>Total Price: {res.price}</Value>
                  </Key>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  // gridTemplateColumns: "2fr 2fr",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  {res.Reservation.map((val) => (
                    <Cell value={val} />
                  ))}
                </div>
              </div>
            </Plan>
          ))}
        </div>
      </Container>
    </AnimationRevealPage>
  );
};

export default MyTickets;
