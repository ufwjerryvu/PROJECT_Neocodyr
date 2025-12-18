import React, { useState } from "react";
import RichTextEditor from "./Editor";

export type CommentType = {
  id: number;
  author: string;
  body: string;
  replies?: CommentType[];
};

export const CommentThread: React.FC<{
  handleAddReply: (parentId: number, content: string) => void;
  setReplyingTo: (commentId: number | null) => void;
  replyingTo: number | null;
  comment: CommentType;
  depth?: number;
}> = ({ handleAddReply, setReplyingTo, replyingTo, comment, depth = 0 }) => {
  const isStaff = comment.author.includes("STAFF");
  const borderColor = isStaff ? "border-emerald-500" : "border-slate-700/50";
  const glowColor = isStaff ? "shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "";

  return (
    <div className={depth > 0 ? "ml-4 sm:ml-8 mt-4 sm:mt-5" : ""}>
      <div
        className={`border-l-4 ${borderColor} ${glowColor} pl-3 sm:pl-5 pb-4 sm:pb-5 bg-slate-900/20 rounded-r-lg`}
      >
        <p
          className={`text-xs sm:text-sm font-semibold mb-1 ${
            isStaff ? "text-emerald-400" : "text-slate-200"
          }`}
        >
          {comment.author}
        </p>
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

      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-0">
          {comment.replies.map((reply: typeof comment) => (
            <CommentThread
              handleAddReply={handleAddReply}
              setReplyingTo={setReplyingTo}
              replyingTo={replyingTo}
              key={reply.id}
              comment={reply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
