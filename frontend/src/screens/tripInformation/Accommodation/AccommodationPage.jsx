import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AccommodationPage.css";
import Bar from "../../../components/Bar";
import * as api from "../../../api";
import AddAccommodationCard from "../../../components/tripInformation/Accommodation/AddAccommodationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function AccommodationPage() {
  const [accommodationList, setAccommodationList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId } = useParams();
  const navigate = useNavigate();

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
      <div className="accommodation-info-container">
        <div
          className="return-icon"
          onClick={() => navigate(`/trip/${tripId}`, { replace: false })}
        >
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <button onClick={() => editPage()}>Edit</button>
        <div>{message}</div>
        <div>
          <h1>ACCOMMODATIONS</h1>
          <div>{addAccommodationForm()}</div>
          <div className="accommodation-list">
            {accommodationList.map((accommodation) => (
              <div
                className="accommodation"
                key={accommodation._id}
                onClick={() =>
                  navigate(
                    `/trip/${tripId}/accommodation/${accommodation._id}`,
                    {
                      replace: false,
                    }
                  )
                }
              >
                <div className="accommodation-name">
                  <h3>{accommodation.name}</h3>
                </div>
                <div className="accommodation-location">
                  <h3>Location:</h3>
                  <div>{accommodation.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccommodationPage;
