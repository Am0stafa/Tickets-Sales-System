import React from "react";
import tw from "twin.macro";
import HeaderBase from "../components/headers/light.js";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import MainFeature from "../components/features/TwoColSingleFeatureWithStats.js";
import { useAsync } from "react-async-hook";
import { getCatagories } from "../services/shop";
const Header = tw(HeaderBase)`max-w-none`;
import { useParams,useNavigate } from "react-router-dom";
import BallLoading from "../components/ballLoading/BallLoading.js";
import { auth } from "../firebase/config";

export const Book = () => {
  const { matchId } = useParams();
    const navigate = useNavigate();
  const { result, loading, error } = useAsync(getCatagories, [matchId]);
  if (loading) return <BallLoading />;
  if (error) {
    navigate("/", { state: { errors: error.message } });
 }

  return (
    <AnimationRevealPage>
      <Header />
      <MainFeature catagories={result} />
    </AnimationRevealPage>
  );
}; 
