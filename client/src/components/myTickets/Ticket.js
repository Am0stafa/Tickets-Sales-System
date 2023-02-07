import React from "react";
import "./Ticket.css";
import tw from "twin.macro";

const { useState } = React;
const rootElement = document.getElementById("root");
const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;
const SecondaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100`;
const Value = tw.span`font-bold text-primary-500`;
const Key = tw.div`font-medium text-gray-700`;
const Ticket = (props) => {
  const { value } = props;
  const [active, handleActive] = useState(false);
  const match = value.Ticket.Match;
  const day = match.Date.substring(0, 10);
  const tiime = match.Date.substring(11, 19);
  return (
    <>
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
            <div id="detailLabel" style={{ fontWeight: "bold" }}>
              Home
            </div>
            {match.homeTeam}
          </div>

          <div id="flightDetail">
            <div id="detailLabel" style={{ fontWeight: "bold" }}>
              Away
            </div>
            {match.awayTeam}
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
            <div style={{ width: "40px" }}></div>
            <Key>
              Category:
              <Value> {value.Ticket.category}</Value>
            </Key>
            <div
              style={{
                marginRight: "1em",
                height: "55px",
                border: "0.8px solid grey",
              }}
            ></div>
            <Key
              style={{
                marginRight: "10px",
              }}
            >
              Ticket ID:
              <Value> {value.Ticket.id}</Value>
            </Key>
          </div>
          <div id="firstBehind">
            <div id="firstBehindDisplay">
              <div id="firstBehindRow">
                <div id="detail">
                  {match.roundNumber}
                  <div id="detailLabel">Round</div>
                </div>
                <div id="detail">
                  {tiime}
                  <div id="detailLabel">Time</div>
                </div>
              </div>
              <div id="firstBehindRow">
                <div id="detail">
                  {match.location}
                  <div id="detailLabel">Location</div>
                </div>
                <div id="detail">
                  {day}
                  <div id="detailLabel">Date</div>
                </div>
              </div>
              <div id="firstBehindRow">
                <div id="detail">
                  {value.Ticket.gateOpens}
                  <div id="detailLabel">Gate Opens</div>
                </div>
                <div id="detail">
                  {match.group}
                  <div id="detailLabel">Group</div>
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
                    ${value.Ticket.price}
                    <div id="priceLabel">Ticket Price</div>
                  </div>
                  <div id="price">
                    {value.Ticket.category}
                    <div id="priceLabel">Category</div>
                  </div>
                  <img
                    id="barCode"
                    src="https://github.com/pizza3/asset/blob/master/barcode.png?raw=true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
