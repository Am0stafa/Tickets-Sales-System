import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import "./MyTickets.css";
import { SectionHeading } from "../misc/Headings.js";
import tw from "twin.macro";
import styled from "styled-components";
import { Container, ContentWithPaddingXl } from "../misc/Layouts.js";

const { useState } = React;
const rootElement = document.getElementById("root");

const Flight = [
  {
    src: "/assets/brazil.png",
    src1: "/assets/usa.png",
    style: {
      height: "51px",
      margin: "22px 12px",
    },
    label: "rgb(13, 28, 83)",
  },
  {
    src: "/assets/brazil.png",
    src1: "/assets/usa.png",
    style: {
      height: "51px",
      margin: "22px 12px",
    },
    label: "rgb(90, 5, 49)",
  },
  {
    src: "/assets/brazil.png",
    src1: "/assets/usa.png",
    style: {
      height: "51px",
      margin: "22px 12px",
    },
    label: "rgb(230, 26, 56)",
  },
  {
    src: "/assets/brazil.png",
    src1: "/assets/usa.png",
    style: {
      height: "51px",
      margin: "22px 12px",
    },
    label: "rgb(252, 178, 50)",
  },
  {
    src: "/assets/brazil.png",
    src1: "/assets/usa.png",
    style: {
      height: "51px",
      margin: "22px 12px",
    },
    label: "rgb(13, 28, 83)",
  },
  {
    src: "/assets/brazil.png",
    src1: "/assets/usa.png",
    style: {
      height: "51px",
      margin: "22px 12px",
    },
    label: "rgb(90, 5, 49)",
  },
  {
    src: "/assets/brazil.png",
    src1: "/assets/usa.png",
    style: {
      height: "51px",
      margin: "22px 12px",
    },
    label: "rgb(230, 26, 56)",
  },
  {
    src: "/assets/brazil.png",
    src1: "/assets/usa.png",
    style: {
      height: "51px",
      margin: "22px 12px",
    },
    label: "rgb(252, 178, 50)",
  },
];

const Cell = (props) => {
  const { index } = props;
  const [active, handleActive] = useState(false);
  let iii = 4;
  return (
    <div
      id="cardContainer"
      style={{
        height: active ? `300px` : `100px`,
        transition: "0.9s",
      }}
      onClick={() => {
        handleActive(!active);
      }}
    >
      <div id="firstDisplay">
        <div id="flightDetail">
          <div
            id="detailLabel"
            style={{ fontWeight: "bold", color: Flight[index].label }}
          >
            From
          </div>
          BLR
          <div id="detailLabel">Kempegowda International</div>
        </div>
        <div
          id="flightDetail"
          style={{
            marginTop: "15px",
          }}
        >
          <div id="animContainer">
            <div id="anim">
              <div id="circle" />
              <div id="circle" />
              <div id="circle" />
            </div>
          </div>
          <div id="animContainer" style={{ left: "62px" }}>
            <div id="anim">
              <div id="circle" />
              <div id="circle" />
              <div id="circle" />
            </div>
          </div>
          <img
            style={{ width: "30px" }}
            src="https://github.com/pizza3/asset/blob/master/airplane2.png?raw=true"
          />
        </div>
        <div id="flightDetail">
          <div
            id="detailLabel"
            style={{ fontWeight: "bold", color: Flight[index].label }}
          >
            To
          </div>
          DEL
          <div id="detailLabel">Indira Gandhi International</div>
        </div>
      </div>
      <div
        id="first"
        style={{
          transform: active
            ? `rotate3d(1, 0, 0, -180deg)`
            : `rotate3d(1, 0, 0, 0deg)`,
          transitionDelay: active ? "0s" : "0.3s",
        }}
      >
        <div id="firstTop">
          <img style={Flight[index].style} src={Flight[index].src} />
          <img style={Flight[index].style} src={Flight[index].src1} />

          <div id="timecontainer">
            <div id="detailTime">Brazil</div>

            <div id="detailDate">vs</div>

            <div id="detailTime">USA</div>
          </div>
        </div>
        <div id="firstBehind">
          <div id="firstBehindDisplay">
            <div id="firstBehindRow">
              <div id="detail">
                6:20 - 8:45
                <div id="detailLabel">Flight Time</div>
              </div>
              <div id="detail">
                No
                <div id="detailLabel">Transfer</div>
              </div>
            </div>
            <div id="firstBehindRow">
              <div id="detail">
                2h 25 min
                <div id="detailLabel">Duration</div>
              </div>
              <div id="detail">
                8<div id="detailLabel">Gate</div>
              </div>
            </div>
            <div id="firstBehindRow">
              <div id="detail">
                5:35
                <div id="detailLabel">Boarding</div>
              </div>
              <div id="detail">
                20A
                <div id="detailLabel">Seat</div>
              </div>
            </div>
          </div>
          <div
            id="second"
            style={{
              transform: active
                ? `rotate3d(1, 0, 0, -180deg)`
                : `rotate3d(1, 0, 0, 0deg)`,
              transitionDelay: active ? "0.2s" : "0.2s",
            }}
          >
            <div id="secondTop" />
            <div id="secondBehind">
              <div id="secondBehindDisplay">
                <div id="price">
                  $100
                  <div id="priceLabel">Price</div>
                </div>
                <div id="price">
                  Economy
                  <div id="priceLabel">Class</div>
                </div>
                <img
                  id="barCode"
                  src="https://github.com/pizza3/asset/blob/master/barcode.png?raw=true"
                />
              </div>
              <div
                id="third"
                style={{
                  transform: active
                    ? `rotate3d(1, 0, 0, -180deg)`
                    : `rotate3d(1, 0, 0, 0deg)`,
                  transitionDelay: active ? "0.4s" : "0s",
                }}
              >
                <div id="thirdTop" />
                <div id="secondBehindBottom">
                  <button
                    id="button"
                    style={{
                      color: Flight[index].label,
                      border: `1px solid ${Flight[index].label}`,
                    }}
                    onClick={() => alert(1)}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
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

const DataArr = Array(8).fill(0).map(Number.call, Number);
const MyTickets = () => {
  const navigate = useNavigate();
  if (!auth.currentUser) {
    navigate("/");
  }
  return (
    <Container>
      <div className="whole">
        {Header}
        {DataArr.map((val, i) => (
          <Cell key={i} index={i} />
        ))}
      </div>
    </Container>
  );
};

export default MyTickets;
