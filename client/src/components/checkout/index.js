import React, { useEffect } from "react";
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

function CheckoutComponent({total,setProgress}) {
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

// the same effect but in a use effect
//   const handleChange = (e) => {

//     if(e.target.name === "number" && e.target.value.length === 16)
//         setProgress((prev) => prev + 10);

//     // if(e.target.name === "expiry" && e.target.value.length === 5)
//     //     setProgress((prev) => prev + 20);
//     // if(e.target.name === "cvc" && e.target.value.length === 3)
//     //     setProgress((prev) => prev + 20);
//     // if(e.target.name === "name" && e.target.value.length > 0)
//     //     setProgress((prev) => prev + 20);

//   };



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
                  disabled={true}
                  name="amount"
                  component="input"
                  type="number"
                  placeholder={total}
                />
                <Field
                  disabled={true}
                  name="email"
                  component="input"
                  type="text"
                  placeholder="a.abdo.mae@gmail.com"
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
                //   onChange={handleChange}
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
                //   onChange={handleChange}
                />
                <Field
                  name="cvc"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVC"
                  format={formatCVC}
                //   onChange={handleChange}
                />
              </div>
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Pay Now
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

export default CheckoutComponent;
