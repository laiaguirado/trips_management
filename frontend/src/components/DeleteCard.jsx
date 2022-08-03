import React from "react";
import "./DeleteCard.css";

function DeleteTripCard({ onDelete, deleting, deleteType }) {
  return (
    <div className="delete-trip-card">
      <h2> Delete {deleteType}</h2>
      <h4>Are you sure?</h4>
      <div className="options">
        <div className="option option-no" onClick={deleting}>
          No
        </div>
        <div className="option option-yes" onClick={onDelete}>
          Yes
        </div>
      </div>
    </div>
  );
}

export default DeleteTripCard;
