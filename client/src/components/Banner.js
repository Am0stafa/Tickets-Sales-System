import React from "react";
import styled from "styled-components";

const BannerStyles = styled.div`
  width: 100%;
  height: 2px;
  margin-top: 50px;
  position: relative;

  .first-txt {
    position: absolute;
    top: 17px;
    left: 50px;
  }

  .second-txt {
    position: absolute;
    bottom: -40px;
    left: 40px;
  }
`;

const Banner = () => {
  return (
    <BannerStyles>
      <img
        className=""
        height={440}
        display="flex"
        justify-content="center"
        margin-top="900px"
        width="auto"
        src="/assets/banner.jpg"
        alt="banner"
      />
    </BannerStyles>
  );
};

export default Banner;
