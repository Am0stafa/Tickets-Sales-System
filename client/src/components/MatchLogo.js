import React, { useState } from "react";
import left from "../images/stadium-left.png";
import right from "../images/stadium-right.png";
import empty from "../images/stadium-empty.png";

const pos = { left, right, empty };
const MatchLogo = ({
  myRef,
  user,
  setProgress,
  progress,
  choices,
  setChoices,
}) => {
  const [selected, setSelected] = useState(pos.empty);

  const handleClick = (e) => {
    document.getElementsByClassName("type1")[0].style.display = "block";
    myRef.current.scrollIntoView({ behavior: "smooth" });
    const img1 = document.getElementsByClassName("pic1");
    const img2 = document.getElementsByClassName("pic2");
    if (progress < 25) {
      setProgress((prev) => prev + 25);
    }

    if (e.target.src.includes(user.homeTeam)) {
      setChoices({ ...choices, team: user.homeTeam, side: "home" });
      setSelected(pos.left);
      img2[0].classList.remove("my-border");
      e.target.classList.add("my-border");
    } else {
      setChoices({ ...choices, team: user.awayTeam, side: "away" });
      setSelected(pos.right);
      img1[0].classList.remove("my-border");
      e.target.classList.add("my-border");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        marginLeft: "8em",
        marginRight: "8em",
        justifyContent: "space-around",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{ cursor: "pointer", minWidth: "100px", width: "100px" }}
          className="pic1"
          src={`/assets/${user.homeTeam}.png`}
          alt="avatar"
          size="xxl"
          onClick={handleClick}
        ></img>
        <h2>{user.homeTeam}</h2>
      </div>
      <div style={{ margin: "0.5em" }}></div>
      <img
        style={{
          width: "auto",
          height: "auto",
          minWidth: "148px",
          minHeight: "114px",
        }}
        src={selected}
        alt="st"
      />

      <div style={{ margin: "0.5em" }}></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{ cursor: "pointer", minWidth: "100px", width: "100px" }}
          className="pic2"
          src={`/assets/${user.awayTeam}.png`}
          alt="avatar"
          size="xxl"
          onClick={handleClick}
        />
        <h2>{user.awayTeam}</h2>
      </div>
    </div>
  );
};

export default MatchLogo;
