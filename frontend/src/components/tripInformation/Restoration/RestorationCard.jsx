import React from "react";
import "./RestorationCard.css";
import * as api from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function RestorationCard({ restoration }) {
  return (
    <div className="restoration-card">
      <h1>Restoration card</h1>
      {/*<div className="restoration-name restoration-info">
        <h3>Name: </h3>
        <div>{restoration.name}</div>
  </div>*/}
      <div className="restoration-description restoration-info">
        <h3>Description: </h3>
        <div>{restoration.description}</div>
      </div>
      <div className="restoration-kindOfFood restoration-info">
        <h3>Kind of Food: </h3>
        <div>{restoration.kindOfFood}</div>
      </div>
      <div className="restoration-location restoration-info">
        <h3>Location: </h3>
        <div>{restoration.location}</div>
      </div>
      <div className="restoration-price restoration-info">
        <h3>Price (min - max):</h3>
        <div>
          {restoration.minPrice +
            " - " +
            restoration.maxPrice +
            " " +
            restoration.currency}
        </div>
      </div>
      <div className="restoration-web restoration-info">
        <h3>Web page: </h3>
        <div>
          {restoration !== "" ? (
            !restoration.web.startsWith("https://") &&
            !restoration.web.startsWith("http://") &&
            restoration.web !== null ? (
              <a href={"https://" + restoration.web} target="_blank">
                {"https://" + restoration.web}
              </a>
            ) : (
              <a href={restoration.web} target="_blank">
                {restoration.web}
              </a>
            )
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div className="restoration-phone restoration-info">
        <h3>Phone number: </h3>
        <div>{restoration.phone}</div>
      </div>
      <div className="restoration-email restoration-info">
        <h3>Email: </h3>
        <div>{restoration.email}</div>
      </div>
      {/*<div className="restoration-notation restoration-info">
        <h3>Notation: </h3>
        <div>{restoration.notation}</div>
</div>*/}
    </div>
  );
}

export default RestorationCard;
