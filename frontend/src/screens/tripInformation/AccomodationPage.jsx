import React from "react";
import { useNavigate } from "react-router-dom";
import Bar from "../../components/Bar";
import "./AccomodationPage.css";

function AccomodationPage() {
  return (
    <div className="accomodation-page">
      <Bar />
      <h1>ACCOMODATION</h1>
      <h2>Dates: </h2>
      <h2>Address: </h2>
      <h2>Contact: </h2>
      <h2>Notes: </h2>
      <h2>Files: </h2>
      <button onClick={() => window.history.go(-1)}>Go back</button>
    </div>
  );
}

export default AccomodationPage;
