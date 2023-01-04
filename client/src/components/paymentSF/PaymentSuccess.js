import React, { useState, useEffect } from "react";
import "./payment.scss";
import { useNavigate } from "react-router-dom";
import {Helmet} from 'react-helmet';

const PaymentSuccess = () => {
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
                <style>{'body { background-color: #EBF0F5; }'}</style>
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
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <div className="iiii">✓</div>
        </div>
        <div className="hh1">Success</div>
        <div className="ppp">
          We received your purchase request!
          <br /> You'll be redirected in: {timeLeft} seconds
        </div>
      </div>
    </div>
    </>
  );
};

export default PaymentSuccess;
