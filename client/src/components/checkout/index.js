import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
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
import { auth } from "../../firebase/config";
import { SectionHeading } from "../misc/Headings";
import { NavLink, PrimaryLink } from "../headers/light";

axios.defaults.baseURL = "/api";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function CheckoutComponent({ sessionId, setProgress }) {
  const navigate = useNavigate();
  // get the data from the location
  const location = useLocation();
  const { choices, total, match, totalChoices, email, time } = location.state;

  const [purchase, setPurchase] = React.useState(false);
  const [pop, setPop] = React.useState(true);
  const [error, setError] = React.useState("");
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
    const { data } = await axios.get(
      `https://user-blush.vercel.app/api/users/mail/${email}`
    );
    const id = data.data;
    // if no id
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
          if (status === 200) {
            axios
              .post("https://payment-eosin.vercel.app/api/pay", {
                token: response,
                email: email,
                amount: total,
                holdId: sessionId,
                uid: id,
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
            setPop(false);
            setError(response.error.message);
          }
        }
      );
    } catch (error) {}
  };
  const [loading, setLoading] = React.useState(false);

  const handelCancel = async () => {
    setLoading(true);
    const body = {
      session: sessionId,
    };

    const res = await axios.post(
      "https://reservation-two.vercel.app/api/reservation/cancel",
      body
    );

    console.log(res);
    setLoading(false);
    navigate("/", {
      state: {
        success: "Session Cancelled",
      },
    });
  };

  const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;
  const SecondaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100`;

  return (
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
            <form onSubmit={handleSubmit}>
              <Card
                number={values.number || ""}
                name={values.name || ""}
                expiry={values.expiry || ""}
                cvc={values.cvc || ""}
                focused={active}
              />
              <div style={{ flexWrap: "wrap" }}>
                <Field
                  disabled={true}
                  name="amount"
                  component="input"
                  type="text"
                  placeholder={total}
                />
                <Field
                  disabled={true}
                  name="email"
                  component="input"
                  type="text"
                  placeholder={email}
                />
              </div>
              <div style={{ flexWrap: "wrap" }}>
                <Field
                  name="number"
                  component="input"
                  type="text"
                  pattern="[\d| ]{16,22}"
                  placeholder="Card Number"
                  format={formatCreditCardNumber}
                  onBlur={(e) => {
                    if (e.target.value.length > 15) {
                      setProgress((prev) => prev + 12);
                    }
                  }}
                />
              </div>
              <div style={{ flexWrap: "wrap" }}>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Name"
                  onBlur={(e) => {
                    if (e.target.value.length > 5) {
                      setProgress((prev) => prev + 12);
                    }
                  }}
                />
              </div>
              <div style={{ flexWrap: "wrap" }}>
                <Field
                  name="expiry"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d"
                  placeholder="Valid Thru"
                  format={formatExpirationDate}
                  onBlur={(e) => {
                    if (e.target.value.length > 2) {
                      setProgress((prev) => prev + 12);
                    }
                  }}
                />
                <Field
                  name="cvc"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVC"
                  format={formatCVC}
                  onBlur={(e) => {
                    if (e.target.value.length > 2) {
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
                      onClick={onSubmit}
                    >
                      Pay Now
                    </PrimaryButton>
                  )
                ) : (
                  <ReactLoading type={"bubbles"} color="#ff9999" />
                )}

                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
                {!loading ? (
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
                onClick={() => navigate("/")}
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
    </Styles>
  );
}

export default CheckoutComponent;
