import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Bar from "../../components/Bar";
import * as api from "../../api";
import "./AccommodationPage.css";
import AccommodationCard from "../../components/tripInformation/Accommodation/AccommodationCard";
import AddAccommodationCard from "../../components/tripInformation/Accommodation/AddAccommodationCard";
import CommentCard from "../../components/comment/CommentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function AccommodationPage() {
  const [accommodationList, setAccommodationList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId } = useParams();

  const loadAccommodationList = async () => {
    const {
      success,
      result: accommodationList,
      error,
    } = await api.getAccommodationList(tripId);
    if (success) {
      setAccommodationList(accommodationList);
      setMessage(null);
    } else {
      setAccommodationList([]);
      setMessage(error);
    }
  };

  const addAccommodation = async (tripId, newAccommodationData) => {
    const {
      success,
      result: added,
      error,
    } = await api.addAccommodation(tripId, newAccommodationData);
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
    //todo save input
  };

  useEffect(() => {
    loadAccommodationList();
  }, []);

  return (
    <div className="accommodation-page">
      <Bar mode="login" />
      <div className="flex-container">
        <div className="return-icon" onClick={() => window.history.go(-1)}>
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <div>{message}</div>
        <div>
          <h1>ACCOMMODATIONS</h1>
          <div>{addAccommodationForm()}</div>
          <div className="accommodation-list">
            {accommodationList.map((accommodation) => (
              <AccommodationCard
                key={accommodation._id}
                tripId={tripId}
                accommodation={accommodation}
                modifyAccommodationList={setAccommodationList}
              />
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => editPage()}>Edit</button>
    </div>
  );
}

export default AccommodationPage;
