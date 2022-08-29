import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bar.css";
import * as api from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignsPost,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { ModelContext } from "../model";
import { useContext } from "react";

const Bar = ({ mode }) => {
  const { userData, logout } = useContext(ModelContext);
  const navigate = useNavigate();

  if (mode === "logout") {
    return (
      <div className="nav-bar">
        <div className="nav-bar-title">
          <FontAwesomeIcon icon={faSignsPost} className="nav-logo" />
          <h1 className="nav-title">MY TRIPS</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="nav-bar">
        <div
          className="nav-bar-title nav-bar-redirect"
          onClick={() => navigate(`/`, { replace: false })}
        >
          <FontAwesomeIcon icon={faSignsPost} size="5x" className="nav-logo" />
          <h1 className="nav-title">MY TRIPS</h1>
        </div>

        <div className="nav-info">
          <div className="nav-username">
            <FontAwesomeIcon icon={faUser} className="icon" />
            {userData !== undefined && userData !== null
              ? userData.username
              : "User name"}
          </div>
          <div className="nav-logout" onClick={logout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="icon" />{" "}
            Logout
          </div>
        </div>
      </div>
    );
  }
};

export default Bar;
