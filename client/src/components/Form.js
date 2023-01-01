// rather than == parseInt(num) and use === instead
import React from "react";
import SelectAutoWidth from "./select";
import "./form.css";
import tw from "twin.macro";

const Form = ({ num, price, setProgress, progress,catagories }) => {
  const Value = tw.div`font-bold text-primary-500`;
  const Key = tw.div`font-medium text-gray-700`;
  if (parseInt(num) === 1) {
    return (
      <>
        <div className="user-card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              marginLeft: "1em",
            }}
          >
            <div className="dot-yellow"></div>
            <div style={{ marginLeft: "1em" }}></div>
            <Key style={{ textAlign: "center" }}>CAT {num}</Key>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            <Value>{price}</Value>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
          >
            <SelectAutoWidth
              style={{ justifyContent: "right" }}
              num={num}
              setProgress={setProgress}
              progress={progress}
              remaining={catagories.category1}
            >
              {/* disabled */}
            </SelectAutoWidth>
          </div>
        </div>
      </>
    );
  } else if (parseInt(num) === 2) {
    return (
      <div className="user-card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            marginLeft: "1em",
          }}
        >
          <div className="dot-red"></div>
          <div style={{ marginLeft: "1em" }}></div>
          <Key style={{ textAlign: "center" }}>CAT {num}</Key>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <Value>{price}</Value>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <SelectAutoWidth
            style={{ justifyContent: "right" }}
            num={num}
            setProgress={setProgress}
            progress={progress}
            remaining={catagories.category2}
          >
            {/* disabled */}
          </SelectAutoWidth>
        </div>
      </div>
    );
  } else if (parseInt(num) === 3) {
    return (
      <div className="user-card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            marginLeft: "1em",
          }}
        >
          <div className="dot-blue"></div>
          <div style={{ marginLeft: "1em" }}></div>
          <Key style={{ textAlign: "center" }}>CAT {num}</Key>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <Value>{price}</Value>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <SelectAutoWidth
            style={{ justifyContent: "right" }}
            num={num}
            setProgress={setProgress}
            progress={progress}
            remaining={catagories.category3}

          >
            {/* disabled */}
          </SelectAutoWidth>
        </div>
      </div>
    );
  } else {
    return (
      <div className="user-card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            marginLeft: "1em",
          }}
        >
          <div className="dot-purple"></div>
          <div style={{ marginLeft: "1em" }}></div>
          <Key style={{ textAlign: "center" }}>CAT {num}</Key>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <Value>{price}</Value>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <SelectAutoWidth
            style={{ justifyContent: "right" }}
            num={num}
            setProgress={setProgress}
            progress={progress}
            remaining={catagories.category4}
          >
            {/* disabled */}
          </SelectAutoWidth>
        </div>
      </div>
    );
  }
};

export default Form;
