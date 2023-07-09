import { useState, useEffect } from "react";
import "./CommentWidget.css";
import ReplyList from "./ReplyList";

// Comment component
export default function Reply({ reply, replies, onDelete, onEdit, onReply }) {
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(reply.content);

  const handleEdit = () => {
    setEditing(true);
    setEditedContent(reply.content);
  };

  const handleSave = () => {
    // Perform save logic, update reply content in state or call an API
    onEdit(reply.id, editedContent);
    setEditing(false);
  };

  const handleDelete = () => {
    // Perform delete logic, delete reply in state or call an API
    onDelete(reply.id);
  };

  const handleReply = () => {
    onReply(reply.id);
  };

  return (
    <div className="reply">
      <div className="reply-content">
        <p>{reply.content}</p>
        <p className="reply-timestamp">Timestamp: {reply.timestamp}</p>
      </div>

      <div className="reply-buttons">
        {editing ? (
          <div>
            <input
              type="text"
              className="reply-input"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button className="btn-save" onClick={handleSave}>
              Save
            </button>
          </div>
        ) : (
          <div className="reply-actions">
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
        parentId={reply.id}
      />
    </div>
  );
}
