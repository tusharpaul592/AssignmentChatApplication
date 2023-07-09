import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import ReplyForm from "./ReplyForm";

export default function CommentWidget({ currentUser }) {
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    // Load comments from localStorage or API on component mount
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(savedComments);
  }, []);

  useEffect(() => {
    // Save comments to localStorage whenever comments state changes
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleAddComment = (newComment) => {
    // Perform add comment logic, update comments state or call an API
    setComments([...comments, newComment]);
  };

  const handleEditComment = (commentId, editedContent) => {
    // Perform edit comment logic, update comment content in state or call an API
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: editedContent }
          : comment
      )
    );
  };

  const handleDeleteComment = (commentId) => {
    // Perform delete comment logic, delete comment and its replies in state or call an API
    const filteredComments = comments.filter(
      (comment) => comment.id !== commentId && comment.parentId !== commentId
    );
    setComments(filteredComments);
  };

  const handleReplyToComment = (commentId) => {
    setReplyingTo(commentId);
  };

  const handleAddReply = (newReply) => {
    setComments([...comments, newReply]);
    setReplyingTo(null);
  };

  return (
    <div className="comment-widget">
      <CommentForm onAddComment={handleAddComment} currentUser={currentUser} />

      {comments
        .filter((comment) => !comment.parentId)
        .map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            replies={comments}
            onDelete={handleDeleteComment}
            onEdit={handleEditComment}
            onReply={handleReplyToComment}
          />
        ))}

      {replyingTo !== null && (
        <ReplyForm
          parentId={replyingTo}
          onAddReply={handleAddReply}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}
