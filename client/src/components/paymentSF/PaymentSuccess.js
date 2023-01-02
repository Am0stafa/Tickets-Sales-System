import React from "react";
import "./payment.scss";
const PaymentSuccess = () => {
  return (
    <div id="success-box">
      <div className="dot" />
      <div className="dot two" />
      <div className="face">
        <div className="eye" />
        <div className="eye right" />
        <div className="mouth happy" />
      </div>
      <div className="shadow scale" />
      <div className="message">
        <h1 className="alert h1">Success!</h1>
        <p className="p">yay, everything is working.</p>
      </div>
      <button className="button-box">
        <h1 className="green h1">continue</h1>
      </button>
    </div>
  );
};

export default PaymentSuccess;
