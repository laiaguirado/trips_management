import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AccommodationPage.css";
import Bar from "../../../components/Bar";
import Loading from "../../../components/Loading";
import * as api from "../../../api";
import AddAccommodationCard from "../../../components/tripInformation/Accommodation/AddAccommodationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faCirclePlus,
  faAngleLeft,
  faPen,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

function AccommodationPage() {
  const [accommodationList, setAccommodationList] = useState(null);
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
      setAccommodationList(null);
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
      window.scrollTo(0, 0);
      setMessage(error);
    }
  };

  function addAccommodationForm() {
    if (adding) {
      return (
        <AddAccommodationCard
          onAdd={addAccommodation}
          message={message}
          adding={() => {
            setAdding(false);
            setMessage(null);
          }}
          tripId={tripId}
        />
      );
    }
  }

  useEffect(() => {
    loadAccommodationList();
    window.scrollTo(0, 0);
  }, []);

  if (accommodationList === null) {
    return (
      <div>
        <Bar mode="login" />
        <Loading />
      </div>
    );
  }
  const rating = 3;

  return (
    <div className="accommodation-page">
      <Bar mode="login" />
      <div className="info-container">
        <div
          className="return-icon page-return-icon"
          onClick={() => navigate(`/trip/${tripId}`, { replace: false })}
        >
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <div className="error details-error">{message}</div>
        <div>
          <h1 className="details-title list-page">ACCOMMODATION</h1>
          <div>
            {addAccommodationForm()}{" "}
            <div className="add-info-button" onClick={() => setAdding(true)}>
              <FontAwesomeIcon icon={faCirclePlus} className="icon" />
            </div>
          </div>
          <div className="info-list">
            {accommodationList.map((accommodation) => (
              <div
                className="info"
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
                <h3 className="info-name">{accommodation.name}</h3>
                <div className="info-main">{accommodation.location}</div>
                <div className="rating">
                  {rating === null ? (
                    <FontAwesomeIcon icon={faStarRegular} className="icon" />
                  ) : (
                    <FontAwesomeIcon icon={faStar} className="icon" />
                  )}
                  {rating < 2 ? (
                    <FontAwesomeIcon icon={faStarRegular} className="icon" />
                  ) : (
                    <FontAwesomeIcon icon={faStar} className="icon" />
                  )}
                  {rating < 3 ? (
                    <FontAwesomeIcon icon={faStarRegular} className="icon" />
                  ) : (
                    <FontAwesomeIcon icon={faStar} className="icon" />
                  )}
                  {rating < 4 ? (
                    <FontAwesomeIcon icon={faStarRegular} className="icon" />
                  ) : (
                    <FontAwesomeIcon icon={faStar} className="icon" />
                  )}
                  {rating < 5 ? (
                    <FontAwesomeIcon icon={faStarRegular} className="icon" />
                  ) : (
                    <FontAwesomeIcon icon={faStar} className="icon" />
                  )}
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
