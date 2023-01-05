import React, { useState, useEffect } from "react";
import "./payment.scss";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const PaymentFail = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft === 0) {
      navigate("/");
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);
  return (
    <>
      <Helmet>
        <style>{"body { background-color: #EBF0F5; }"}</style>
      </Helmet>
      <div
        style={{
          textAlign: "center",
          padding: " 40px 0",
          background: "#EBF0F5",
          height: "100%",
          position: "relative",
        }}
      >
        <div className="cardddd">
          <div
            style={{
              margin: "0 auto",
            }}
          >
            <svg
              style={{
                width: "200px",
                display: "block",
                margin: "40px auto 0",
                marginTop: "0px",
              }}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 130.2 130.2"
            >
              <circle
                class="path circle"
                fill="none"
                stroke="#D06079"
                stroke-width="6"
                stroke-miterlimit="10"
                cx="65.1"
                cy="65.1"
                r="62.1"
              />
              <line
                class="path line"
                fill="none"
                stroke="#D06079"
                stroke-width="6"
                stroke-linecap="round"
                stroke-miterlimit="10"
                x1="34.4"
                y1="37.9"
                x2="95.8"
                y2="92.3"
              />
              <line
                class="path line"
                fill="none"
                stroke="#D06079"
                stroke-width="6"
                stroke-linecap="round"
                stroke-miterlimit="10"
                x1="95.8"
                y1="38"
                x2="34.4"
                y2="92.2"
              />
            </svg>
          </div>
          <div className="hk1">Payment Failed</div>
          <div className="ppp">
            Please try again later...
            <br /> You'll be redirected in: {timeLeft} seconds
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentFail;
