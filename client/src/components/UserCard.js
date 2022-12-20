import { useNavigate } from "react-router-dom";
import React from "react";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="user-card">
      <div style={{ display: "flex" }}>
        <img
          className="avatar"
          src={`/assets/${user.homeTeam}.png`}
          alt={user.homeTeam}
        />

        <img
          className="avatar"
          src={`/assets/${user.awayTeam}.png`}
          alt={user.awayTeam}
        />
      </div>

      <div>
        <h2>
          {user.homeTeam} vs {user.awayTeam}
        </h2>
      </div>

      <div style={{ display: "flex" }}>
        <img
          alt=""
          src="/assets/calendar.svg"
          style={{ height: "40px", width: "40px" }}
        />

        <span style={{ margin: "0.5em" }}></span>

        <h3>{user.Date}</h3>
      </div>
      <span style={{ margin: "1em" }}></span>
      <div style={{ display: "flex" }}>
        <img
          alt=""
          src="/assets/stadium.svg"
          style={{ height: "40px", width: "40px" }}
        />
      </div>

      <div style={{ display: "flex" }}>
        <h3>{user.location} </h3>
      </div>
      <span style={{ margin: "1em" }}></span>
      {/* <p>
          Score: {user.homeTeamScore} - {user.awayTeamScore}
        </p> */}
      <div style={{ display: "flex" }}>
        <button
          className="button button-green width-auto"
          onClick={() => navigate(`/book/${user.id}`, { state: { ...user } })}
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
};
export default UserCard;
