import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Bar from "../../components/Bar";
import * as api from "../../api";
import "./AccomodationPage.css";
import AccomodationCard from "../../components/AccomodationCard";
import AddAccomodationCard from "../../components/AddAccomodationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AccomodationPage() {
  const [accomodationList, setAccomodationList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId } = useParams();

  const loadAccomodationList = async () => {
    const { success, accomodationList, error } = await api.getAccomodationList(
      tripId
    );
    if (success) {
      setAccomodationList(accomodationList);
      setMessage(null);
    } else {
      setAccomodationList([]);
      setMessage(error);
    }
  };

  const addAccomodation = async (tripId, newAccomodationData) => {
    const { success, added, error } = await api.addAccomodation(
      tripId,
      newAccomodationData
    );
    if (success) {
      setAccomodationList((accomodationList) => [...accomodationList, added]);
      setAdding(false);
      setMessage(null);
    } else {
      setMessage(error);
    }
  };

  function addAccomodationForm() {
    if (adding === false) {
      return (
        <div
          className="add-accomodation-button"
          onClick={() => setAdding(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      );
    } else {
      return (
        <AddAccomodationCard
          onAdd={addAccomodation}
          adding={() => {
            setAdding(false);
            setMessage(null);
          }}
          tripId={tripId}
        />
      );
    }
  }

  const editPage = () => {
    console.log("editing");
    //todo change displayed values for inputs
    //todosave input
  };

  useEffect(() => {
    loadAccomodationList();
  }, []);

  return (
    <div className="accomodation-page">
      <Bar mode="login" />
      <div className="flex-container">
        <div>{message}</div>
        <div>{addAccomodationForm()}</div>
        <div>
          <h1>ACCOMODATIONS</h1>
          <div className="accomodation-list">
            {accomodationList.map((accomodation) => (
              <AccomodationCard
                key={accomodation._id}
                accomodation={accomodation}
              />
            ))}
          </div>
          {/*<h2>
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
            </h2>*/}
        </div>
        {/*<div>
          <img src="../../src/assets/accomodation.webp"></img>
          </div>*/}
      </div>
      {/*<h2>
        Notes:{" "}
        <span>
          You have to arrive after 14:00 if you want to get the keys to your
          room.
        </span>
      </h2>
      <h2>Files: </h2>
        <div className="upload">Upload file</div>*/}
      <button onClick={() => window.history.go(-1)}>Go back</button>
      <button onClick={() => editPage()}>Edit</button>
    </div>
  );
}

export default AccomodationPage;
