import React from "react";
import { useNavigate } from "react-router-dom";
import Bar from "../../components/Bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Restoration() {
  return (
    <div>
      <Bar />
      <div> Restoration</div>
      <button onClick={() => window.history.go(-1)}>Go back</button>
      <div>
        {" "}
        <FontAwesomeIcon icon={faStar} /> Restoration 1
      </div>
    </div>
  );
}

export default Restoration;
