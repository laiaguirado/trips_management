import React from "react";
import "./CommentCard.css";
import * as helper from "../../helper";

function CommentCard({ comment }) {
  /*const deleteComment = async (commentId) => {
      const { success, error } = await api.deleteComment(commentId);
      if (success) {
        modifyCommentList((prevList) =>
          prevList.filter((t) => t._id !== commentId)
        );
      } else {
        setMessage(error);
      }
    };*/

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
        <div className="comment-user">{comment.idUser.username}</div>
        <div className="comment-published-time">
          Published {difference + time} ago
        </div>
        <div className="comment-text">{comment.comment}</div>
      </div>
      {/*<div
          className="delete-comment"
          onClick={() => {
            deleteComment(comment._id);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} /> DELETE COMMENT
        </div>*/}
    </div>
  );
}

export default CommentCard;
