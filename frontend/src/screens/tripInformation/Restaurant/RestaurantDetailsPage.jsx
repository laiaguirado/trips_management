import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RestaurantDetailsPage.css";
import * as api from "../../../api";
import Bar from "../../../components/Bar";
import Loading from "../../../components/Loading";
import CommentsCard from "../../../components/comment/CommentsCard";
import RestaurantCard from "../../../components/tripInformation/Restaurant/RestaurantCard";
import EditRestaurantCard from "../../../components/tripInformation/Restaurant/EditRestaurantCard.jsx";
import DeleteCard from "../../../components/DeleteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faAngleLeft,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function RestaurantDetailsPage() {
  const [restaurant, setRestaurant] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId, restaurantId } = useParams();
  const navigate = useNavigate();

  const loadRestaurant = async () => {
    const {
      success,
      result: restaurant,
      error,
    } = await api.getRestaurant(restaurantId);
    if (success) {
      setRestaurant(restaurant);
      setMessage(null);
    } else {
      setRestaurant(null);
      setMessage(error);
    }
  };

  const deleteRestaurant = async (restaurantId) => {
    const { success, error } = await api.deleteRestaurant(restaurantId);
    if (success) {
      navigate(`/trip/${tripId}/restaurant`, { replace: false });
    } else {
      setMessage(error);
    }
  };

  const onEdit = async (restaurantId, restaurantData, score) => {
    let idNewScoreAdded = null;
    if (restaurant.scores[0]) {
      if (score === "") {
        const {
          success: scoreSuccess,
          result: newScore,
          error: scoreError,
        } = await api.deleteScore(restaurant.scores[0]._id);
        if (scoreSuccess) {
          setMessage(null);
        } else {
          setMessage(scoreError);
        }
      } else {
        restaurantData.score = {
          _id: restaurant.scores[0]._id,
          score: score,
        };
      }
    } else if (score !== "") {
      const {
        success: scoreSuccess,
        result: newScore,
        error: scoreError,
      } = await api.addScore(tripId, restaurantId, "restaurant", {
        value: score,
      });
      if (scoreSuccess) {
        setMessage(null);
        idNewScoreAdded = newScore._id;
      } else {
        setMessage(scoreError);
      }
    }

    const {
      success,
      result: edited,
      error,
    } = await api.updateRestaurant(restaurantId, restaurantData);
    if (success) {
      setRestaurant(edited);
      setEditing(false);
      setMessage(null);
    } else {
      if (error.startsWith(" -  'email' is invalid.")) {
        setMessage("Not the correct email format");
      } else {
        setMessage(error);
      }
      if (idNewScoreAdded != null) {
        const {
          success: scoreSuccess,
          result: newScore,
          error: scoreError,
        } = await api.deleteScore(idNewScoreAdded);
      }
    }
    window.scrollTo(0, 0);
  };

  const returnEditing = () => {
    setEditing(false);
    setMessage(null);
  };

  function deleteButton() {
    if (deleting) {
      return (
        <DeleteCard
          onDelete={() => deleteRestaurant(restaurantId)}
          deleting={() => setDeleting(false)}
          deleteType={"restaurant"}
        />
      );
    }
  }

  useEffect(() => {
    loadRestaurant();
    window.scrollTo(0, 0);
  }, [restaurantId]);

  if (restaurant === null) {
    return (
      <div>
        <Bar mode="login" />
        <Loading />
      </div>
    );
  }

  function showComponentMode() {
    if (!editing) {
      return (
        <>
          <RestaurantCard restaurant={restaurant} />
          <div>
            <div
              className="delete-restaurant"
              onClick={() => {
                setDeleting(true);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} /> DELETE RESTAURANT
            </div>
            {deleteButton()}
          </div>
          <CommentsCard
            tripId={tripId}
            componentId={restaurantId}
            component="restaurant"
          />
        </>
      );
    } else {
      return (
        <EditRestaurantCard
          restaurant={restaurant}
          restaurantId={restaurantId}
          onEdit={onEdit}
        />
      );
    }
  }

  return (
    <div className="restaurant-details-page">
      <Bar mode="login" />
      {!editing ? (
        <div
          className="return-icon page-return-icon"
          onClick={() => window.history.go(-1)}
        >
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
      ) : (
        <div
          className="return-icon page-return-icon"
          onClick={() => returnEditing()}
        >
          <FontAwesomeIcon icon={faXmark} size="3x" />{" "}
        </div>
      )}
      {!editing && (
        <div className="edit-icon" onClick={() => setEditing(true)}>
          <FontAwesomeIcon icon={faPen} size="2x" />{" "}
        </div>
      )}
      <div className="flex-container">
        <div className="error details-error">{message}</div>
        {showComponentMode()}
      </div>
    </div>
  );
}

export default RestaurantDetailsPage;
