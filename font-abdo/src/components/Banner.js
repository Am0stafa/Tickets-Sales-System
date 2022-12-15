import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BannerStyles = styled.div`
  width: 100%;
  height: 100px;
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
        
      <img src={`/assets/Banner.jpeg`} alt="banner" className="banner" />
    </BannerStyles>
  );
};

export default Banner;
