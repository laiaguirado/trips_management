import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bar from "../../components/Bar";
import "./AccomodationPage.css";

function AccomodationPage() {
  const editPage = () => {
    console.log("editing");
    //todo change displayed values for inputs
    //todosave input
  };

  return (
    <div className="accomodation-page">
      <Bar />
      <div className="flex-container">
        <div>
          <h1>ACCOMODATION</h1>

          <h2>
            Name: <span>Ruthensteiner</span>
          </h2>
          <h2>
            Dates: <span>10/10/2022 - 15/10/2022</span>
          </h2>
          <h2>
            Address:
            <span> Robert Hamerling Gasse 24, 1150 Vienna, Austria</span>
          </h2>
          <h2>
            Contact:
            <span>
              <a href="mailto:contact@gmail.com"> contact@gmail.com</a>
            </span>
          </h2>
        </div>
        <div>
          <img src="../../src/assets/accomodation.webp"></img>
        </div>
      </div>
      <h2>
        Notes:{" "}
        <span>
          You have to arrive after 14:00 if you want to get the keys to your
          room.
        </span>
      </h2>
      <h2>Files: </h2>
      <div className="upload">Upload file</div>
      <button onClick={() => window.history.go(-1)}>Go back</button>
      <button onClick={() => editPage()}>Edit</button>
    </div>
  );
}

export default AccomodationPage;
