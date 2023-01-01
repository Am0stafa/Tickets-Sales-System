import React from 'react'
import './payment.scss';

const PaymentFail = () => {
  return (
    <>
    <div>
      <div id="container">
        <div id="error-box">
          <div className="dot" />
          <div className="dot two" />
          <div className="face2">
            <div className="eye" />
            <div className="eye right" />
            <div className="mouth sad" />
          </div>
          <div className="shadow move" />
          <div className="message">
            <h1 className="alert h1">Error!</h1>
            <p className="p">oh no, something went wrong.</p>
          </div>
          <button className="button-box">
            <h1 className="red h1">try again</h1>
          </button>
        </div>
      </div>
    </div>
  </>
  )
}

export default PaymentFail