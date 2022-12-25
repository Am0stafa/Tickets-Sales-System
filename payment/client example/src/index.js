import React, { useEffect } from "react";
import { render } from "react-dom";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import Card from "./Card";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./cardUtils";
import axios from "axios";
axios.defaults.baseURL = "/api";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
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
    //! when we submit the form it will wait for 300ms and then it will create a token and then it will send the token to the server

    await sleep(300);
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
              .post("/pay", {
                token: response,
                email: values.email,
                amount: values.amount, //TODO: this will be changed
              })
              .then((res) => window.alert(JSON.stringify(res.data, 0, 2))) //TODO: redirect to success page
              .catch((err) => console.log(err));
          } else {
            console.log(response.error.message); //TODO: use async hook and display error message
          }
        }
      );
    } catch (error) {}
  };

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
              <div>
                <Field
                  name="amount"
                  component="input"
                  type="number"
                  placeholder="Amount"
                />
                <Field
                  name="email"
                  component="input"
                  type="text"
                  placeholder="Your email"
                />
              </div>
              <div>
                <Field
                  name="number"
                  component="input"
                  type="text"
                  pattern="[\d| ]{16,22}"
                  placeholder="Card Number"
                  format={formatCreditCardNumber}
                />
              </div>
              <div>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div>
                <Field
                  name="expiry"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d"
                  placeholder="Valid Thru"
                  format={formatExpirationDate}
                />
                <Field
                  name="cvc"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVC"
                  format={formatCVC}
                />
              </div>
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          );
        }}
      />
    </Styles>
  );
}

render(<App />, document.getElementById("root"));
