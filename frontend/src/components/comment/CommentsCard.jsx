import React, { useState, useEffect } from "react";
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
    <div className="accommodation-comments">
      <div>{message}</div>
      <h4>Comments: </h4>
      <div className="comments-list">
        {commentList.map((comment) => (
          <CommentCard
            key={comment._id}
            componentId={componentId}
            comment={comment}
            modifyCommentList={setCommentList}
          />
        ))}
      </div>
      <form className="add-comment" onSubmit={addComment}>
        <input
          type="text"
          placeholder="Post your comment here..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <input type="submit" value="POST" />
      </form>
    </div>
  );
}

export default CommentsCard;
