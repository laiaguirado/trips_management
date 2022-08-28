import React from "react";
import "./RestorationCard.css";

function RestorationCard({ restoration }) {
  document.body.style.overflow = "unset";
  function getHours() {
    const openingHour =
      restoration.openingHour === null || restoration.openingHour === ""
        ? "-"
        : restoration.openingHour + "h";

    const closingHour =
      restoration.closingHour === null || restoration.closingHour === ""
        ? "-"
        : restoration.closingHour + "h";

    return openingHour + " / " + closingHour;
  }

  function getPrices() {
    const minPriceWithCurrency =
      restoration.minPriceWithCurrency === null ||
      restoration.minPriceWithCurrency === ""
        ? "-"
        : restoration.minPriceWithCurrency;

    const maxPriceWithCurrency =
      restoration.maxPriceWithCurrency === null ||
      restoration.maxPriceWithCurrency === ""
        ? "-"
        : restoration.maxPriceWithCurrency;

    return minPriceWithCurrency + " / " + maxPriceWithCurrency;
  }

  return (
    <div className="restoration-card">
      <h1 className="details-title">RESTORATION</h1>
      <div className="restoration-info">
        <div className="restoration-name restoration-detail">
          <h3>Name: </h3>
          <div>{restoration.name}</div>
        </div>
        <div className="restoration-location restoration-detail">
          <h3>Location: </h3>
          <div>{restoration.location}</div>
        </div>
        {restoration.kindOfFood && (
          <div className="restoration-kindOfFood restoration-detail">
            <h3>Kind of Food: </h3>
            <div>{restoration.kindOfFood}</div>
          </div>
        )}
        {(restoration.minPriceWithCurrency ||
          restoration.maxPriceWithCurrency) && (
          <div className="restoration-price restoration-detail">
            <h3>Price (min - max):</h3>
            <div>{getPrices()}</div>
          </div>
        )}
        {(restoration.openingHour || restoration.closingHour) && (
          <div className="restoration-hours restoration-detail">
            <h3>Opening hour - Closing Hour:</h3>
            <div>{getHours()}</div>
          </div>
        )}
        {restoration.closed && (
          <div className="restoration-closed restoration-detail">
            <h3>Closed: </h3>
            <div>{restoration.closed}</div>
          </div>
        )}
        {restoration.speciality && (
          <div className="restoration-speciality restoration-detail">
            <h3>Speciality of the restaurant: </h3>
            <div>{restoration.speciality}</div>
          </div>
        )}
        {restoration.takeAway !== null && (
          <div className="restoration-takeAway restoration-detail">
            <h3>Take Away: </h3>
            <div>
              {restoration.takeAway !== null &&
              restoration.takeAway !== undefined
                ? restoration.takeAway === true
                  ? "Yes"
                  : "No"
                : ""}
            </div>
          </div>
        )}
        {restoration.reserved !== null && (
          <div className="restoration-reserved restoration-detail">
            <h3>Reservation required: </h3>
            <div>
              {restoration.reserved !== null &&
              restoration.reserved !== undefined
                ? restoration.reserved === true
                  ? "Yes"
                  : "No"
                : ""}
            </div>
          </div>
        )}
        {restoration.web && (
          <div className="restoration-web restoration-detail">
            <h3>Web page: </h3>
            <div>
              {restoration !== "" ? (
                !restoration.web.startsWith("https://") &&
                !restoration.web.startsWith("http://") &&
                restoration.web !== null &&
                restoration.web !== "" ? (
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
        )}
        {restoration.phone && (
          <div className="restoration-phone restoration-detail">
            <h3>Phone number: </h3>
            <div>{restoration.phone}</div>
          </div>
        )}
        {restoration.email && (
          <div className="restoration-email restoration-detail">
            <h3>Email: </h3>
            <div>
              <a href={"mailto:" + restoration.email}>{restoration.email}</a>
            </div>
          </div>
        )}
        {restoration.notation && (
          <div className="restoration-notation restoration-detail">
            <h3>Notation: </h3>
            <div className="notation-text">{restoration.notation}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestorationCard;
