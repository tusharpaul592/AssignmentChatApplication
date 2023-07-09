import React, { useState, useEffect } from "react";
import ReplyList from "./ReplyList";

// Comment component
export default function Comment({
  comment,
  replies,
  onDelete,
  onEdit,
  onReply
}) {
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleEdit = () => {
    setEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = () => {
    // Perform save logic, update comment content in state or call an API
    onEdit(comment.id, editedContent);
    setEditing(false);
  };

  const handleDelete = () => {
    // Perform delete logic, delete comment and its replies in state or call an API
    onDelete(comment.id);
  };

  const handleReply = () => {
    onReply(comment.id);
  };

  return (
    <div className="comment">
      <div className="comment-content">
        <p>{comment.content}</p>
        <p className="comment-timestamp">Timestamp: {comment.timestamp}</p>
      </div>

      <div className="comment-buttons">
        {editing ? (
          <div>
            <input
              type="text"
              className="comment-input"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button className="btn-save" onClick={handleSave}>
              Save
            </button>
          </div>
        ) : (
          <div className="comment-actions">
            <button className="btn-edit" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn-reply" onClick={handleReply}>
              Reply
            </button>
          </div>
        )}
      </div>

      <ReplyList
        replies={replies}
        onDelete={onDelete}
        onEdit={onEdit}
        onReply={onReply}
        parentId={comment.id}
      />
    </div>
  );
}
