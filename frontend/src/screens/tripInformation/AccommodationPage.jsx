import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Bar from "../../components/Bar";
import * as api from "../../api";
import "./AccommodationPage.css";
import AccommodationCard from "../../components/tripInformation/Accommodation/AccommodationCard";
import AddAccommodationCard from "../../components/tripInformation/Accommodation/AddAccommodationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AccommodationPage() {
  const [accommodationList, setAccommodationList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId } = useParams();

  const loadAccommodationList = async () => {
    const { success, accommodationList, error } =
      await api.getAccommodationList(tripId);
    if (success) {
      setAccommodationList(accommodationList);
      setMessage(null);
    } else {
      setAccommodationList([]);
      setMessage(error);
    }
  };

  const addAccommodation = async (tripId, newAccommodationData) => {
    const { success, added, error } = await api.addAccommodation(
      tripId,
      newAccommodationData
    );
    if (success) {
      setAccommodationList((accommodationList) => [
        ...accommodationList,
        added,
      ]);
      setAdding(false);
      setMessage(null);
    } else {
      setMessage(error);
    }
  };

  function addAccommodationForm() {
    if (adding === false) {
      return (
        <div
          className="add-accommodation-button"
          onClick={() => setAdding(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      );
    } else {
      return (
        <AddAccommodationCard
          onAdd={addAccommodation}
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
    loadAccommodationList();
  }, []);

  return (
    <div className="accommodation-page">
      <Bar mode="login" />
      <div className="flex-container">
        <div>{message}</div>
        <div>{addAccommodationForm()}</div>
        <div>
          <h1>ACCOMMODATIONS</h1>
          <div className="accommodation-list">
            {accommodationList.map((accommodation) => (
              <AccommodationCard
                key={accommodation._id}
                accommodation={accommodation}
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
          <img src="../../src/assets/accommodation.webp"></img>
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

export default AccommodationPage;
