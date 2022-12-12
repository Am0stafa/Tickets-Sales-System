import React, { useState, useEffect } from "react";
import styled from "styled-components";

import banner from "../assets/banner.jpg";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BannerStyles = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: flex-start;
`;

const Banner = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <Skeleton height={140} duration={0.5} />;
  }

  return (
    <BannerStyles>
      <img src={banner} alt="banner" />
    </BannerStyles>
  );
};

export default Banner;
