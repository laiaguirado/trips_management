import React, { useState, useEffect } from "react";
import "./CommentsCard.css";
import CommentCard from "./CommentCard";
import * as api from "../../api";

function CommentsCard({ tripId, componentId, component }) {
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState(null);

  const loadCommentList = async () => {
    const {
      success,
      result: commentList,
      error,
    } = await api.getCommentList(tripId, componentId);
    if (success) {
      setCommentList(commentList);
      setMessage(null);
    } else {
      setCommentList([]);
      setMessage(error);
    }
  };

  const addComment = async (e) => {
    console.log(comment);
    e.preventDefault();
    const {
      success,
      result: newComment,
      error,
    } = await api.addComment(tripId, componentId, component, {
      comment_text: comment,
    });
    if (success) {
      setCommentList((commentList) => [...commentList, newComment]);
      setComment("");
    } else {
      setMessage(error);
    }
  };

  useEffect(() => {
    loadCommentList();
  }, [componentId]);
  return (
    <div className="comments">
      <div className="error">{message}</div>
      <h4>Comments: </h4>
      <div className="comments-list">
        {commentList.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
      </div>
      <form className="add-comment" onSubmit={addComment}>
        <div className="comment-user">New comment:</div>
        <textarea
          className="input"
          rows="3"
          cols="30"
          placeholder="Write your comment here..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></textarea>
        <input type="submit" value="POST" className="post-button" />
      </form>
    </div>
  );
}

export default CommentsCard;
