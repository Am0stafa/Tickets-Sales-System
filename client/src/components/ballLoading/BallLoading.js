import React from "react";
import "./ball.css";

const BallLoading = () => {
  return (
    <div className="contanier">
      <div className="progress">
        <div className="ball" />
      </div>
        <h1>Checking availability</h1>
    </div>
  );
};

export default BallLoading;
