import React, { useEffect, useState } from "react";
import "./AccommodationCard.css";
import * as api from "../../../api";
import CommentCard from "../../comment/CommentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function AccommodationCard({ tripId, accommodation, modifyAccommodationList }) {
  const [commentList, setCommentList] = useState([]);
  const [message, setMessage] = useState(null);
  if (
    !accommodation.web.startsWith("https://") &&
    !accommodation.web.startsWith("http://") &&
    accommodation.web !== null
  ) {
    accommodation.web = "https://" + accommodation.web;
  }

  const deleteAccommodation = async (accommodationId) => {
    const { success, error } = await api.deleteAccommodation(accommodationId);
    if (success) {
      modifyAccommodationList((prevList) =>
        prevList.filter((t) => t._id !== accommodationId)
      );
    } else {
      setMessage(error);
    }
  };

  const loadCommentList = async () => {
    const {
      success,
      result: commentList,
      error,
    } = await api.getCommentList(tripId, accommodation._id);
    if (success) {
      setCommentList(commentList);
      setMessage(null);
    } else {
      setCommentList([]);
      setMessage(error);
    }
  };

  useEffect(() => {
    loadCommentList();
  }, []);

  return (
    <div className="accommodation-card">
      <h1>Accommodation card</h1>
      <div className="accommodation-basic-info">
        <div className="accommodation-web accommodation-info">
          <h3>Web page: </h3>
          <div>
            <a href={accommodation.web} target="_blank">
              {accommodation.web}
            </a>
          </div>
        </div>
        <div className="accommodation-description accommodation-info">
          <h3>Description: </h3>
          <div>{accommodation.description}</div>
        </div>
        <div className="accommodation-location accommodation-info">
          <h3>Location: </h3>
          <div>{accommodation.location}</div>
        </div>
        <div className="accommodation-dates accommodation-info">
          <h3>Dates:</h3>
          <div>
            {accommodation.startDate.substring(
              0,
              accommodation.startDate.length - 14
            ) +
              " / " +
              accommodation.endDate.substring(
                0,
                accommodation.startDate.length - 14
              )}
          </div>
        </div>
        <div className="accommodation-phone accommodation-info">
          <h3>Phone number: </h3>
          <div>{accommodation.phone}</div>
        </div>
        <div className="accommodation-email accommodation-info">
          <h3>Email: </h3>
          <div>{accommodation.email}</div>
        </div>
      </div>
      <div className="accommodation-comments">
        <h4>Comments: </h4>
        <div className="comments-list">
          {commentList.map((comment) => (
            <CommentCard
              key={comment._id}
              componentId={accommodation._id}
              comment={comment}
              modifyCommentList={setCommentList}
            />
          ))}
        </div>
      </div>
      <div
        className="delete-accommodation"
        onClick={() => {
          deleteAccommodation(accommodation._id);
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} /> DELETE ACCOMMODATION
      </div>
    </div>
  );
}

export default AccommodationCard;
