import React, { useState } from "react";
import RichTextEditor from "./Editor";

export type CommentType = {
  id: number;
  author: string;
  avatar?: string;
  body: string;
  replies?: CommentType[];
};

export const CommentThread: React.FC<{
  handleAddReply: (parentId: number, content: string) => void;
  setReplyingTo: (commentId: number | null) => void;
  replyingTo: number | null;
  comment: CommentType;
  depth?: number;
  isLastChild?: boolean;
}> = ({
  handleAddReply,
  setReplyingTo,
  replyingTo,
  comment,
  depth = 0,
  isLastChild = false,
}) => {
  const isStaff = comment.author.includes("STAFF");
  const borderColor = isStaff ? "border-emerald-500" : "border-slate-700/50";
  const glowColor = isStaff ? "shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "";

  return (
    <div className={`relative ${depth > 0 ? "ml-4 sm:ml-8 mt-4" : ""}`}>
      {/* The Vertical Connector Line - only extends to end of current comment if it's the last child */}
      {depth > 0 && (
        <div
          className={`absolute -left-4 sm:-left-8 -top-2 w-px bg-slate-700 ${
            isLastChild ? "h-14" : "h-full"
          }`}
        />
      )}

      <div
        className={`relative border-l-4 ${borderColor} ${glowColor} pl-3 sm:pl-5 pb-4 sm:pb-5 pt-4 sm:pt-5 bg-slate-900/20 rounded-r-lg`}
      >
        {/* Curved connector from parent line to comment */}
        {depth > 0 && (
          <div
            className="absolute -left-5 sm:-left-9 top-6 w-4 sm:w-8 h-8"
            style={{
              borderLeft: "1px solid rgb(51, 65, 85)",
              borderBottom: "1px solid rgb(51, 65, 85)",
              borderBottomLeftRadius: "12px",
            }}
          />
        )}

        {/* Header with avatar and author */}
        <div className="flex items-center mb-1">
          <img
            src={comment.avatar || "/default-avatar.png"}
            alt={`${comment.author} avatar`}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 object-cover"
          />
          <p
            className={`text-xs sm:text-sm font-semibold ${
              isStaff ? "text-emerald-400" : "text-slate-200"
            }`}
          >
            {comment.author}
          </p>
        </div>

        <div
          className="text-slate-300 mt-2 text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: comment.body }}
        />

        <button
          onClick={() => setReplyingTo(comment.id)}
          className="text-xs text-slate-400 hover:text-blue-400 mt-2 sm:mt-3 font-medium transition-colors"
        >
          Reply
        </button>

        {replyingTo === comment.id && (
          <div className="mt-4 sm:mt-5">
            <RichTextEditor
              onSubmit={(content) => handleAddReply(comment.id, content)}
              onCancel={() => setReplyingTo(null)}
              placeholder="Write your reply..."
            />
          </div>
        )}
      </div>

      {/* Replies Container */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-0 mb-3">
          {comment.replies.map((reply: typeof comment, index: number) => (
            <CommentThread
              handleAddReply={handleAddReply}
              setReplyingTo={setReplyingTo}
              replyingTo={replyingTo}
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              isLastChild={index === comment.replies!.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
