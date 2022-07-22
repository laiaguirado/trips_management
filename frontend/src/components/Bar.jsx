import React from "react";
import "./Bar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignsPost } from '@fortawesome/free-solid-svg-icons'

const Bar = () => {

  return (
    <div className="top-bar">
      <FontAwesomeIcon icon={faSignsPost} size="5x" />
      <h1>MY TRIPS</h1>
    </div>
  );
};

export default Bar;