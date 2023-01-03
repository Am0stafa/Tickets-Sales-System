import React, { useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SectionHeading } from "../misc/Headings.js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MatchLogo from "../MatchLogo";
import Form from "../Form.js";
import ReactLoading from "react-loading";
import AppContext from "../../context/Total";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/svg-decorator-blob-7.svg";
import { NavLinks, NavLink } from "../headers/light.js";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
const Container = tw.div`relative`;
const Value = tw.div`font-bold text-primary-500`;
const Key = tw.div`font-medium text-gray-700`;
const TextContent = tw.div`lg:py-8`;
const Heading = tw(
  SectionHeading
)`text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-4`;
const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;
const SecondaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100`;
import { auth } from "../../firebase/config";

export default ({ textOnLeft = false, catagories }) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  //Change the statistics variable as you like, add or delete objects
  const reff = useRef();
  const navigate = useNavigate();
  const loc = useLocation();
  const match = loc.state;
  const [progress, setProgress] = React.useState(0);
  const [choices, setChoices] = React.useState({});
  const {
    total,
    totalChoices,
    without: mapChoice,
  } = React.useContext(AppContext);
  const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
    ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
  `;
  const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
    ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
  `;
  const [issLoading, setIssLoading] = React.useState(false);

  const [token, setToken] = React.useState("");
  const captchaRef = React.useRef("");

  const onExpire = () => {
    toast.error("hCaptcha Expired", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setToken("");
  };

  const onError = (err) => {
    toast.error("hCaptcha Error", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleClick = async () => {
    // if (!token) {
    //     toast.error("Please verify hCaptcha", {
    //         position: "top-center",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored",
    //     });

    //     return;
    // }

    // const captcha = await axios.post('https://security-alpha.vercel.app/signup-with-hcaptcha', {
    //     token: token
    // });

    // if (!captcha.data.success) {
    //     toast.error("hCaptcha Error", {
    //         position: "top-center",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored",
    //     });
    //     return;
    // }

    if (!auth?.currentUser?.email) {
      toast.error("Please Login to provide an email", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setIssLoading(true);

    const names = {
      1: "Category 1",
      2: "Category 2",
      3: "Category 3",
      4: "Category 4",
    };

    const payload = {};

    payload.matchId = match.id;

    const tickets = Object.keys(mapChoice).map((key) => {
      return {
        category: names[key],
        quantity: mapChoice[key],
      };
    });

    payload.tickets = tickets.filter((ticket) => ticket.quantity > 0);

    // console.log(payload);

    const response = await axios.post(
      "https://reservation-two.vercel.app/api/reservation/pending",
      payload
    );

    // console.log(response.data);

    setIssLoading(false);

    navigate(`/checkout/${response.data.session}`, {
      state: {
        choices,
        total,
        match,
        totalChoices,
        email: auth?.currentUser?.email,
        time: response.data.holdUntil,
      },
    });
  };
  //   const onSubmit = () => {
  //     captchaRef.current.execute();
  //   };
  return (
    <Container>
      <ToastContainer />
      <div style={{ marginLeft: "4em", marginRight: "4em" }}>
        <TextContent>
          <Container>
            <div style={{ margin: "1em" }}></div>

            <Heading>Complete your ticket order.</Heading>
            <div style={{ margin: "2em" }}></div>
            <ProgressBar completed={progress} />

            <Description>1. Click the logo to choose your team</Description>

            <div style={{ margin: "2em" }}></div>
            <MatchLogo
              myRef={reff}
              user={match}
              setProgress={setProgress}
              progress={progress}
              choices={choices}
              setChoices={setChoices}
            />
            <DecoratorBlob1 />
            <DecoratorBlob2 />
          </Container>
          <Container>
            <div style={{ marginBottom: "4em" }}></div>
            <section ref={reff}>
              <div className="type1" style={{ display: "none" }}>
                <Description>
                  2. Specify the number of tickets. You can choose up to 4
                  tickets per Category
                </Description>
                <div style={{ marginBottom: "1em" }}></div>

                <div
                  style={{
                    borderRadius: "5px",
                  }}
                >
                  <div style={{ height: "10px" }}></div>
                  <ul>
                    <Form
                      catagories={catagories}
                      num="1"
                      price="USD 75"
                      setProgress={setProgress}
                      progress={progress}
                    />
                    <div style={{ margin: "1em" }}></div>

                    <Form
                      catagories={catagories}
                      num="2"
                      price="USD 125"
                      setProgress={setProgress}
                      progress={progress}
                    />
                    <div style={{ margin: "1em" }}></div>

                    <Form
                      catagories={catagories}
                      num="3"
                      price="USD 195"
                      setProgress={setProgress}
                      progress={progress}
                    />
                    <div style={{ margin: "1em" }}></div>

                    <Form
                      catagories={catagories}
                      num="4"
                      price="USD 400"
                      setProgress={setProgress}
                      progress={progress}
                    />
                  </ul>
                  <div
                    className="user-card"
                    style={{
                      backgroundColor: "transparent",
                      marginTop: "30px",
                    }}
                  >
                    <Key style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                      Total{" "}
                    </Key>
                    <Value
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                      }}
                    >
                      USD {total}
                    </Value>

                    <h1
                      style={{
                        marginRight: "1em",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                      }}
                    >
                      {totalChoices}
                    </h1>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      width: "auto",
                      marginTop: "20px",
                    }}
                  >
                    <HCaptcha
                      sitekey="12c4968d-1248-4670-93f9-d2aa4b005fda"
                      onVerify={setToken}
                      onError={onError}
                      onExpire={onExpire}
                      ref={captchaRef}
                    />

                    {!issLoading ? (
                      <NavLinks>
                        <NavLink href="/" tw="lg:ml-12!">
                          Go Back
                        </NavLink>
                        {total === 0 && (
                          <SecondaryButton
                            style={{
                              backgroundColor: "#c6c6c6",
                              //   borderRadius: "0.25rem",
                              //   paddingLeft: "2rem",
                              //   paddingRight: "2rem",
                              //   paddingTop: "0.75rem",
                              //   paddingBottom: "0.75rem",
                              //   fontWeight: "bold",
                              //   fontSize: "0.875rem",
                            }}
                            disabled={true}
                          >
                            Proceed
                          </SecondaryButton>
                        )}
                        {total > 0 && (
                          <PrimaryButton
                            style={{ cursor: "pointer" }}
                            onClick={handleClick}
                          >
                            Proceed
                          </PrimaryButton>
                        )}
                      </NavLinks>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginLeft: "1em",
                        }}
                      >
                        <ReactLoading type={"bubbles"} color="#ff9999" />
                      </div>
                    )}
                  </div>
                </div>
                <DecoratorBlob1 />
                <DecoratorBlob2 />
              </div>
            </section>
          </Container>
        </TextContent>
      </div>
    </Container>
  );
};
