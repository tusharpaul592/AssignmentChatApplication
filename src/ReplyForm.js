import React, { useState, useEffect } from "react";

export default function ReplyForm({ parentId, onAddReply, currentUser }) {
  const [reply, setReply] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation, handle empty reply, etc.

    const newReply = {
      id: generateUniqueId(),
      content: reply,
      timestamp: new Date().toISOString(),
      parentId: parentId,
      userId: currentUser.id
    };

    // Perform add reply logic, update comments state or call an API
    onAddReply(newReply);

    setReply("");
  };

  return (
    <form className="reply-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="reply-input"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write a reply..."
      />
      <button className="btn-reply" type="submit">
        Reply
      </button>
    </form>
  );
}
// Utility function to generate a unique ID
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
