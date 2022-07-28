import React from "react";
import "./Bar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignsPost,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Bar = ({ mode, userData, onLogout }) => {
  if (mode === "logout") {
    return (
      <div className="top-bar">
        <FontAwesomeIcon icon={faSignsPost} size="5x" />
        <h1>MY TRIPS</h1>
      </div>
    );
  } else {
    return (
      <div className="top-bar">
        <FontAwesomeIcon icon={faSignsPost} size="5x" />
        <h1>MY TRIPS</h1>
        <div className="top-info">
          <FontAwesomeIcon icon={faUser} />
          {userData !== undefined && userData !== null
            ? userData.username
            : "User name"}
        </div>
        <div className="logout-button top-info" onClick={onLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
        </div>
      </div>
    );
  }
};

export default Bar;
