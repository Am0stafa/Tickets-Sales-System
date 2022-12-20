// rather than == parseInt(num) and use === instead
import React from "react";
import SelectAutoWidth from "./select";
import "./form.css";

const Form = ({ num, price,setProgress,progress }) => {
  if (parseInt(num) === 1) {
    return (
      <div className="formzz">
        <div style={{ marginLeft: "4em", display: "flex" }}>
          <span className="dot-yellow"></span>
          <span style={{ margin: "0.5em" }}></span>

          <p>Cat {num}</p>
        </div>
        <p>{price}</p>
        <div>
          <SelectAutoWidth num={num} setProgress={setProgress} progress={progress} >{/* disabled */}</SelectAutoWidth>
        </div>
      </div>
    );
  } else if (parseInt(num) === 2) {
    return (
      <div className="formzz">
        <div style={{ marginLeft: "4em", display: "flex" }}>
          <span className="dot-red"></span>
          <span style={{ margin: "0.5em" }}></span>

          <p>Cat {num}</p>
        </div>
        <p>{price}</p>
        <div>
          <SelectAutoWidth num={num} setProgress={setProgress} progress={progress} >{/* disabled */}</SelectAutoWidth>
        </div>
      </div>
    );
  } else if (parseInt(num) === 3) {
    return (
      <div className="formzz">
        <div style={{ marginLeft: "4em", display: "flex" }}>
          <span className="dot-blue"></span>
          <span style={{ margin: "0.5em" }}></span>

          <p>Cat {num}</p>
        </div>
        <p>{price}</p>
        <div>
          <SelectAutoWidth num={num} setProgress={setProgress} progress={progress}>{/* disabled */}</SelectAutoWidth>
        </div>
      </div>
    );
    } else {
        return (
        <div className="formzz">
            <div style={{ marginLeft: "4em", display: "flex" }}>
            <span className="dot-purple"></span>
            <span style={{ margin: "0.5em" }}></span>

            <p>Cat {num}</p>
            </div>
            <p>{price}</p>
            <div>
            <SelectAutoWidth num={num} setProgress={setProgress} progress={progress} >{/* disabled */}</SelectAutoWidth>
            </div>
        </div>
        );
    
  }
};

export default Form;
