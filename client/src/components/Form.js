import React from "react";
import SelectAutoWidth from "./select";
import "./form.css";

const Form = ({ num, price }) => {
  if (num == 1) {
    return (
      <div className="formzz">
        <div style={{ marginLeft: "4em", display: "flex" }}>
          <span className="dot-yellow"></span>
          <span style={{ margin: "0.5em" }}></span>

          <p>Cat {num}</p>
        </div>
        <p>{price}</p>
        <div>
          <SelectAutoWidth>{/* disabled */}</SelectAutoWidth>
        </div>
      </div>
    );
  } else if (num == 2) {
    return (
      <div className="formzz">
        <div style={{ marginLeft: "4em", display: "flex" }}>
          <span className="dot-red"></span>
          <span style={{ margin: "0.5em" }}></span>

          <p>Cat {num}</p>
        </div>
        <p>{price}</p>
        <div>
          <SelectAutoWidth>{/* disabled */}</SelectAutoWidth>
        </div>
      </div>
    );
  } else {
    return (
      <div className="formzz">
        <div style={{ marginLeft: "4em", display: "flex" }}>
          <span className="dot-blue"></span>
          <span style={{ margin: "0.5em" }}></span>

          <p>Cat {num}</p>
        </div>
        <p>{price}</p>
        <div>
          <SelectAutoWidth>{/* disabled */}</SelectAutoWidth>
        </div>
      </div>
    );
  }
};

export default Form;
