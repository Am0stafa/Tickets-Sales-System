/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "../misc/Layouts.js";
import { SectionHeading } from "../misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons.js";
import { ReactComponent as StarIcon } from "../../images/star-icon.svg";
import { useNavigate } from "react-router-dom";

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;

const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

export default ({ user }) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{
        borderTopLeftRadius: "0.25rem",
        borderTopRightRadius: "0.25rem",
      }}
      className="group"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <CardImageContainer
        imageSrc="/assets/bg-grey.jpg"
        style={{
          maxHeight: "150px",
          borderTopLeftRadius: "0.25rem",

          borderTopRightRadius: "0.25rem",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <img
            className="avatar"
            src={`/assets/${user.homeTeam}.png`}
            alt={user.homeTeam}
          />

          <img
            className="avatar"
            src={`/assets/${user.awayTeam}.png`}
            alt={user.awayTeam}
          />
        </div>
        <CardHoverOverlay
          variants={{
            hover: {
              opacity: 1,
              height: "auto",
            },
            rest: {
              opacity: 0,
              height: 0,
            },
          }}
          transition={{ duration: 0.3 }}
        >
          <CardButton
            onClick={() => navigate(`/book/${user.id}`, { state: { ...user } })}
          >
            Buy Now
          </CardButton>
        </CardHoverOverlay>
      </CardImageContainer>
      <CardText>
        <CardTitle>
          {user.homeTeam} vs {user.awayTeam}
        </CardTitle>
        <div style={{ margin: "0.8em" }}></div>
        <CardContent style={{ display: "flex" }}>
          <img
            alt=""
            src="/assets/calendar.svg"
            style={{ height: "20px", width: "20px" }}
          />
          <div style={{ margin: "0.2em" }}></div>

          {user.Date}
        </CardContent>
        <CardContent style={{ display: "flex" }}>
          <img
            alt=""
            src="/assets/stadium.svg"
            style={{ height: "20px", width: "20px" }}
          />
          <div style={{ margin: "0.2em" }}></div>

          {user.location}
        </CardContent>
      </CardText>
    </Card>
  );
};
