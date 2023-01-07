import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import { useMediaQuery } from "react-responsive";
import Card from "./Card";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./cardUtils";
import axios from "axios";
import tw from "twin.macro";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import ReactLoading from "react-loading";
import { SectionHeading } from "../misc/Headings";
import { NavLink, PrimaryLink } from "../headers/light";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function CheckoutComponent({ sessionId, setProgress }) {
  //responsive styling
  const isDesktop = useMediaQuery({
    query: "(min-aspect-ratio: 1/1)",
  });
  let logo = {};
  let fieldCSS = {};
  if (isDesktop) {
    logo = {
      height: "585px",
      padding: "0 30px",
      float: "left",
      backgroundColor: "#f4f5f9",
      marginTop: "0px",
      marginBottom: "0px",
      border: "0px",
      boxShadow: "0 15px 24px rgba(37,44,65,0.16)",
    };
  } else {
    fieldCSS = {
      marginLeft: "0px",
    };
    logo = {
      border: "0px",
      boxShadow: "none",
      height: "700px",
      padding: "30px",
      width: "450px",
    };
  }

  const navigate = useNavigate();
  // get the data from the location
  const location = useLocation();
  const {
    choices,
    total,
    match,
    totalChoices,
    email,
    tickets,
    kafka
  } = location.state;


  const [purchase, setPurchase] = React.useState(false);
  const [pop, setPop] = React.useState(true);
  const [error, setError] = React.useState("");
  const [mapOfInputs, setMapOfInputs] = React.useState({});

  useEffect(() => {
    //! when ever the page load it creates a stipe script
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v2/";
      s.onload = () => {
        window["Stripe"].setPublishableKey(
          "pk_test_51MItmuKwGmHCcom1T30lAQjObt0fm0JuffypABBqmKYntZnLjonxvysmniSFRcVEP0jDwk5v1QHwCyctp38NQ6uG00j7XJNquE"
        );
      };
      window.document.body.appendChild(s);
    }
  }, []);

  const onSubmit = async (values) => {
    // setProgress(95);
    const { data } = await axios.get(
      `https://user-blush.vercel.app/api/users/mail/${email}`
    );
    const id = data.data;
    if (!id) {
      toast.error("Please Login to continue");
      return;
    }

    setPurchase(true);
    try {
      window.Stripe.card.createToken(
        {
          number: values.number,
          exp_month: values.expiry.split("/")[0],
          exp_year: values.expiry.split("/")[1],
          cvc: values.cvc,
          name: values.name,
        },
        (status, response) => {
          console.log("sending");
          if (status === 200) {
            axios
              .post("https://payment-eosin.vercel.app/api/pay", {
                token: response,
                email: email,
                amount: total,
                holdId: sessionId,
                uid: id,
                kafka: kafka,
              })
              .then((res) => {
                navigate("/payment/success");
              })
              .catch((err) => {
                setPop(false);
                setError(response.error.message);
              });
          } else {
            console.log(response.error.message);
            // navigate("/payment/fail");
            setPurchase(false);
            setPop(false);
            setError(response.error.message);
          }
        }
      );
    } catch (error) {
      setPurchase(false);
      setPop(false);
      setError(response.error.message);
      console.log(error);
    }
  };

  const [loading, setLoading] = React.useState(false);

  const handelCancel = async () => {
    setLoading(true);
    const body = {
      session: sessionId,
      kafka: kafka,
    };

    const res = await axios.post(
      "https://reservation-two.vercel.app/api/reservation/cancel",
      body
    );

    setLoading(false);
    navigate("/", {
      state: {
        success: "Session Cancelled",
      },
    });
  };

  const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;
  const SecondaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100`;
  const Value = tw.span`font-bold text-primary-500`;
  const Key = tw.div`font-medium text-gray-700`;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <div style={{ width: "300px" }} className="overview">
        <div style={{ backgroundColor: "#6415ff" }}>
          <SecondaryButton
            style={{ hover: "none", padding: "20px" }}
            className="overview-item"
          >
            Your Order Details
          </SecondaryButton>
        </div>
        <div style={{ padding: "20px" }} className="overview-item">
          <Key>
            Match:{" "}
            <Value>
              {match.homeTeam} vs {match.awayTeam}
            </Value>
          </Key>
          <br />
          Date: <Value>{match.Date}</Value>
          <br />
          <br />
          Location: <Value>{match.location}</Value>
          <br />
          <br />
          <Key>
            Group: <Value>{match.group}</Value> Round:{" "}
            <Value>{match.roundNumber}</Value>
          </Key>
          <br />
          <Key>
            Side: <Value> {choices.side}</Value> Team:
            <Value> {choices.team}</Value>
          </Key>
        </div>
        <div style={{ borderBottom: "1px solid #dfdfe0" }}></div>

        <div style={{ padding: "20px" }} className="overview-item">
          {tickets.tickets.map((ticket) => {
            return (
              <Key>
                <Value>{ticket.category} </Value>- Count:{" "}
                <Value> {ticket.quantity}</Value>
              </Key>
            );
          })}
        </div>

        <div style={{ borderBottom: "1px solid #dfdfe0" }}></div>
        <div style={{ padding: "20px" }} className="overview-item">
          Total number of tickets: <Value>{totalChoices}</Value>
          <br />
          <br />
          Total price: <Value>${total}</Value>
        </div>
      </div>
      <Styles>
        <Form
          onSubmit={onSubmit}
          render={({
            handleSubmit,
            form,
            submitting,
            pristine,
            values,
            active,
          }) => {
            return (
              <form style={logo}>
                <Card
                  number={values.number || ""}
                  name={values.name || ""}
                  expiry={values.expiry || ""}
                  cvc={values.cvc || ""}
                  focused={active}
                />
                <div style={{ flexWrap: "wrap" }}>
                  <Field
                    style={fieldCSS}
                    disabled={true}
                    name="amount"
                    component="input"
                    type="text"
                    placeholder={total}
                  />
                  <Field
                    style={fieldCSS}
                    disabled={true}
                    name="email"
                    component="input"
                    type="text"
                    placeholder={email}
                  />
                </div>
                <div style={{ flexWrap: "wrap" }}>
                  <Field
                    style={fieldCSS}
                    name="number"
                    component="input"
                    type="text"
                    pattern="[\d| ]{16,22}"
                    placeholder="Card Number"
                    format={formatCreditCardNumber}
                    onBlur={(e) => {
                      console.log(e);
                      if (e.target.value.length > 15 && !mapOfInputs.number) {
                        const prev = { ...mapOfInputs };
                        prev.number = true;
                        setMapOfInputs(prev);
                        setProgress((prev) => prev + 12);
                      }
                    }}
                  />
                </div>
                <div style={{ flexWrap: "wrap" }}>
                  <Field
                    style={fieldCSS}
                    name="name"
                    component="input"
                    type="text"
                    placeholder="Name"
                    onBlur={(e) => {
                      if (e.target.value.length > 0 && !mapOfInputs.name) {
                        const prev = { ...mapOfInputs };
                        prev.name = true;
                        setMapOfInputs(prev);
                        setProgress((prev) => prev + 12);
                      }
                    }}
                  />
                </div>
                <div style={{ flexWrap: "wrap" }}>
                  <Field
                    style={fieldCSS}
                    name="expiry"
                    component="input"
                    type="text"
                    pattern="\d\d/\d\d"
                    placeholder="Valid Thru"
                    format={formatExpirationDate}
                    onBlur={(e) => {
                      if (e.target.value.length > 2 && !mapOfInputs.expiry) {
                        const prev = { ...mapOfInputs };
                        prev.expiry = true;
                        setMapOfInputs(prev);
                        setProgress((prev) => prev + 12);
                      }
                    }}
                  />
                  <Field
                    style={fieldCSS}
                    name="cvc"
                    component="input"
                    type="text"
                    pattern="\d{3,4}"
                    placeholder="CVC"
                    format={formatCVC}
                    onBlur={(e) => {
                      if (e.target.value.length > 2 && !mapOfInputs.cvc) {
                        const prev = { ...mapOfInputs };
                        prev.cvc = true;
                        setMapOfInputs(prev);
                        setProgress((prev) => prev + 12);
                      }
                    }}
                  />
                </div>

                <div className="buttons">
                  {(!values.number ||
                    !values.name ||
                    !values.expiry ||
                    !values.cvc) && (
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
                      // onClick={handleClick}
                    >
                      Pay Now
                    </SecondaryButton>
                  )}

                  {!purchase ? (
                    values.number &&
                    values.name &&
                    values.expiry &&
                    values.cvc && (
                      <PrimaryButton
                        style={{ cursor: "pointer" }}
                        onClick={handleSubmit}
                      >
                        Pay Now
                      </PrimaryButton>
                    )
                  ) : (
                    <ReactLoading type={"bubbles"} color="#6415ff" />
                  )}
                  <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </button>
                  {!loading || !purchase ? (
                    <button
                      type="button"
                      onClick={handelCancel}
                      disabled={submitting || loading}
                    >
                      Cancel
                    </button>
                  ) : (
                    <ReactLoading type={"bubbles"} color="#ff9999" />
                  )}
                </div>
              </form>
            );
          }}
        />
      </Styles>
      {pop === false && (
        <div className="popup">
          <div className="popup_inner">
            <SectionHeading>{error}</SectionHeading>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NavLink
                style={{ cursor: "pointer", marginRight: "1rem" }}
                onClick={async () => {
                    const body = {
                        session: sessionId,
                        kafka: kafka,
                      };
                  
                      const res = await axios.post(
                        "https://reservation-two.vercel.app/api/reservation/cancel",
                        body
                      );
                    navigate("/")
                }}
              >
                Go Back
              </NavLink>
              <PrimaryButton
                style={{ marginBottom: "1rem" }}
                onClick={() => window.location.reload()}
              >
                Try Again
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutComponent;
