import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RestaurantPage.css";
import Loading from "../../../components/Loading";
import Bar from "../../../components/Bar";
import * as api from "../../../api";
import AddRestaurantCard from "../../../components/tripInformation/Restaurant/AddRestaurantCard";
import ScoreCard from "../../../components/score/ScoreCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faStar,
  faCirclePlus,
  faAngleLeft,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";

function RestaurantPage() {
  const [restaurantList, setRestaurantList] = useState(null);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId } = useParams();
  const navigate = useNavigate();

  const loadRestaurantList = async () => {
    const {
      success,
      result: restaurantList,
      error,
    } = await api.getRestaurantList(tripId);
    if (success) {
      setRestaurantList(restaurantList);
      setMessage(null);
    } else {
      setRestaurantList(null);
      setMessage(error);
    }
  };

  const addRestaurant = async (tripId, newRestaurantData) => {
    const {
      success,
      result: added,
      error,
    } = await api.addRestaurant(tripId, newRestaurantData);
    if (success) {
      setRestaurantList((restaurantList) => [...restaurantList, added]);
      setAdding(false);
      setMessage(null);
    } else {
      window.scrollTo(0, 0);
      setMessage(error);
    }
  };

  function addRestaurantForm() {
    if (adding) {
      return (
        <AddRestaurantCard
          onAdd={addRestaurant}
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
    loadRestaurantList();
    window.scrollTo(0, 0);
    document.body.style.overflow = "unset";
  }, []);

  if (restaurantList === null) {
    return (
      <div>
        <Bar mode="login" />
        <Loading />
      </div>
    );
  }

  return (
    <div className="restaurant-page">
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
          <h1 className="details-title list-page">RESTAURANTS</h1>
          <div>
            <div className="add-info-button" onClick={() => setAdding(true)}>
              <FontAwesomeIcon icon={faCirclePlus} className="icon" />
            </div>
          </div>
          <div className="info-list">
            {restaurantList.map((restaurant) => (
              <div
                className="info"
                key={restaurant._id}
                onClick={() =>
                  navigate(`/trip/${tripId}/restaurant/${restaurant._id}`, {
                    replace: false,
                  })
                }
              >
                <h3 className="info-name">{restaurant.name}</h3>
                <div className="info-main">{restaurant.location}</div>
                {restaurant.totalScore && restaurant.totalScore.average ? (
                  <ScoreCard totalScore={restaurant.totalScore} />
                ) : (
                  <div className="info-other-empty">
                    <FontAwesomeIcon icon={faStarRegular} className="icon" />
                    <FontAwesomeIcon icon={faStarRegular} className="icon" />
                    <FontAwesomeIcon icon={faStarRegular} className="icon" />
                    <FontAwesomeIcon icon={faStarRegular} className="icon" />
                    <FontAwesomeIcon icon={faStarRegular} className="icon" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {addRestaurantForm()}
    </div>
  );
}

export default RestaurantPage;
