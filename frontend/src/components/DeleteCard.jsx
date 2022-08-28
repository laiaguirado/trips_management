import React from "react";
import "./DeleteCard.css";

//todo display delete button when delete
function DeleteCard({ onDelete, deleting, deleteType }) {
  document.body.style.overflow = "hidden";
  return (
    <div className="delete-card">
      <div className="background" onClick={deleting}></div>
      <div className="delete">
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
    </div>
  );
}

export default DeleteCard;
