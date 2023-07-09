import { useState, useEffect } from "react";
import "./CommentWidget.css";

// Comment component

// CommentForm component
export default function CommentForm({ onAddComment, currentUser }) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation, handle empty comment, etc.

    const newComment = {
      id: generateUniqueId(),
      content: comment,
      timestamp: new Date().toISOString(),
      parentId: null,
      userId: currentUser.id
    };

    // Perform add comment logic, update comments state or call anAPI
    onAddComment(newComment);

    setComment("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="comment-input"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button className="btn-comment" type="submit">
        Add Comment
      </button>
    </form>
  );
}
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
