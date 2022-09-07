import React from "react";
import "./CommentCard.css";
import * as helper from "../../helper";
import * as api from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function CommentCard({ comment, modifyCommentList }) {
  const deleteComment = async (commentId) => {
    const { success, error } = await api.deleteComment(commentId);
    if (success) {
      modifyCommentList((prevList) =>
        prevList.filter((t) => t._id !== commentId)
      );
    } else {
      setMessage(error);
    }
  };

  let differenceObject = helper.published(comment.createdAt);
  let difference = differenceObject.seconds;
  let time = " seconds";
  if (differenceObject.minutes !== 0) {
    difference = differenceObject.minutes;
    time = " minutes";
    if (differenceObject.hours !== 0) {
      difference = differenceObject.hours;
      time = " hours";
      if (differenceObject.days !== 0) {
        difference = differenceObject.days;
        time = " days";
        if (differenceObject.months !== 0) {
          difference = differenceObject.months;
          time = " months";
          if (differenceObject.years != 0) {
            difference = differenceObject.years;
            time = " years";
          }
        }
      }
    }
  }

  return (
    <div className="comment-card">
      <div className="comment-info">
        <div className="comment-user">
          {comment.idUser.username}
          <span className="comment-published-time">
            Published {difference + time} ago
          </span>
        </div>
        <div className="id">
          <div className="comment-text">{comment.comment}</div>
          <div
            className="delete-comment"
            onClick={() => {
              deleteComment(comment._id);
            }}
          >
            <FontAwesomeIcon
              className="icon-delete-comment"
              icon={faTrashCan}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
