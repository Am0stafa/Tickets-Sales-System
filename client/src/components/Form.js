// rather than == parseInt(num) and use === instead
import React from "react";
import SelectAutoWidth from "./select";
import "./form.css";
import tw from "twin.macro";
import styled from "styled-components";

const Form = ({ num, price, setProgress, progress }) => {
  const Value = tw.div`font-bold text-primary-500`;
  const Key = tw.div`font-medium text-gray-700`;
  if (parseInt(num) === 1) {
    return (
      <div className="user-card" style={{ marginLeft: "4em" }}>
        <div style={{ display: "flex" }}>
          <span className="dot-yellow"></span>
          <div style={{ marginLeft: "10px" }}></div>
          <Key>CAT {num}</Key>
        </div>
        <Value>{price}</Value>
        <div>
          <SelectAutoWidth
            num={num}
            setProgress={setProgress}
            progress={progress}
          >
            {/* disabled */}
          </SelectAutoWidth>
        </div>
      </div>
    );
  } else if (parseInt(num) === 2) {
    return (
      <div className="user-card" style={{ marginLeft: "4em" }}>
        <div style={{ display: "flex" }}>
          <span className="dot-red"></span>
          <div style={{ marginLeft: "10px" }}></div>
          <Key>CAT {num}</Key>
        </div>
        <Value>{price}</Value>
        <div>
          <SelectAutoWidth
            num={num}
            setProgress={setProgress}
            progress={progress}
          >
            {/* disabled */}
          </SelectAutoWidth>
        </div>
      </div>
    );
  } else if (parseInt(num) === 3) {
    return (
      <div className="user-card" style={{ marginLeft: "4em" }}>
        <div style={{ display: "flex" }}>
          <span className="dot-blue"></span>
          <div style={{ marginLeft: "10px" }}></div>
          <Key>CAT {num}</Key>
        </div>
        <Value>{price}</Value>
        <div>
          <SelectAutoWidth
            num={num}
            setProgress={setProgress}
            progress={progress}
          >
            {/* disabled */}
          </SelectAutoWidth>
        </div>
      </div>
    );
  } else {
    return (
      <div className="user-card" style={{ marginLeft: "4em" }}>
        <div style={{ display: "flex" }}>
          <span className="dot-purple"></span>
          <div style={{ marginLeft: "10px" }}></div>
          <Key>CAT {num}</Key>
        </div>
        <Value>{price}</Value>
        <div>
          <SelectAutoWidth
            num={num}
            setProgress={setProgress}
            progress={progress}
          >
            {/* disabled */}
          </SelectAutoWidth>
        </div>
      </div>
    );
  }
};

export default Form;
