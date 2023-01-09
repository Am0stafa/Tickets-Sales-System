import React from "react";
import "./ball.css";
import tw from "twin.macro";
import { SectionHeading } from "../misc/Headings.js";
const Heading = tw(
  SectionHeading
)`text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const BallLoading = () => {
  return (
    <div>
      <div class="box">
        <div class="shadow"></div>
        <div class="gravity">
          <div class="ball"></div>
        </div>
      </div>
    </div>
  );
};

export default BallLoading;
