import React, { useState, useEffect } from "react";
import Reply from "./Reply";
export default function ReplyList({
  replies,
  onDelete,
  onEdit,
  onReply,
  parentId
}) {
  const nestedReplies = replies.filter((reply) => reply.parentId === parentId);

  return (
    <div className="reply-list">
      {nestedReplies.map((reply) => (
        <Reply
          key={reply.id}
          reply={reply}
          replies={replies}
          onDelete={onDelete}
          onEdit={onEdit}
          onReply={onReply}
        />
      ))}
    </div>
  );
}
