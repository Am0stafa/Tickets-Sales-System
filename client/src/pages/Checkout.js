import React from "react";
import { SectionHeading } from "../components/misc/Headings.js";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import HeaderBase from "../components/headers/light.js";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import CheckoutComponent from "../components/checkout/index";
import ProgressBar from "@ramonak/react-progress-bar";
import Countdown from "react-countdown";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../images/svg-decorator-blob-7.svg";
import { Container, ContentWithPaddingXl } from "../components/misc/Layouts.js";
import { getHoldById } from "../services/shop";
import { useAsync } from "react-async-hook";
import BallLoading from "../components/ballLoading/BallLoading.js";
import axios from "axios";

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;
const Value = tw.div`font-bold text-lg sm:text-xl lg:text-2xl text-secondary-500 tracking-wide`;

const Header = tw(HeaderBase)`max-w-none`;
const Key = tw.div`font-medium text-primary-700`;
const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [progress, setProgress] = React.useState(50);
  const { id } = useParams();

  const { result, error, loading } = useAsync(getHoldById, [id]);

  if (loading) return <BallLoading />;

  if (error || !state) {
    navigate("/");
  }

  const Completionist = async () => {
    const body = {
        session: sessionId,
        kafka: state.kafka,
      };
    navigate("/", {
      state: {
        errors: "Session expired",
      },
    });
    await axios.post(
      "https://reservation-two.vercel.app/api/reservation/cancel",
      body
    );

    return <span>Session ended</span>;
  };

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <AnimationRevealPage>
      <Header />
      <div style={{ margin: "3em" }} />
      <Container>
        <ProgressBar completed={progress} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "2em",
          }}
        >
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Value>
              <Key>Session ends in</Key>
              <Countdown date={state.time} renderer={renderer} />
            </Value>
          </div>
        </div>
        <CheckoutComponent sessionId={id} setProgress={setProgress} />
        <DecoratorBlob1 />
        <DecoratorBlob2 />
      </Container>
    </AnimationRevealPage>
  );
};

export default Checkout;
