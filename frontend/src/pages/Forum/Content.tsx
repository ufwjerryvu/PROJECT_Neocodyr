import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  User,
  Search,
  Plus,
  ArrowLeft,
  MessageSquare,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Heart,
} from "lucide-react";

import Dropdown from "../../components/Dropdown";
import RichTextEditor from "../../components/Editor";
import { CommentThread, CommentType } from "../../components/CommentThread";

const ForumContentPage = () => {
  const [posts] = useState([
    {
      id: 1,
      title: "Quadratic equation",
      author: "Anonymous",
      created_at: "2 hours ago",
      category: "Lectures · W1",
      content: "Hi all,\n\nHow do we solve ax² + bx + c = 0?",
      comments: [
        {
          id: 1,
          author: "Scott Maxwell (STAFF)",
          likes: 3,
          body: "You can use the quadratic formula: x = (-b ± √(b² − 4ac)) / 2a",
          replies: [
            {
              id: 3,
              author: "Anonymous",
              likes: 10,
              body: "Thanks! But what if the discriminant is negative?",
              replies: [
                {
                  id: 5,
                  author: "Scott Maxwell (STAFF)",
                  likes: 0,
                  body: "Great question! If b² - 4ac < 0, you get complex solutions with imaginary numbers.",
                  replies: [],
                },
              ],
            },
            {
              id: 4,
              author: "Jane Doe",
              likes: 900,
              body: "This is really helpful, thank you!",
              replies: [],
            },
          ],
        },
        {
          id: 2,
          author: "John Smith",
          likes: 5,
          body: "You can also complete the square if you want to derive the formula yourself.",
          replies: [],
        },
      ],
    },
    {
      id: 2,
      title: "Supersonic flow",
      author: "Anonymous",
      created_at: "Yesterday",
      category: "Assignments · A1",
      content: "Can someone explain the intuition behind supersonic flow?",
      comments: [],
    },
  ]);

  const [activePost, setActivePost] = useState(posts[0]);
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [threadListWidth, setThreadListWidth] = useState(384);
  const [isResizing, setIsResizing] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [editorCollapsed, setEditorCollapsed] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const commentsEndRef = useRef(null);
  const [role, setRole] = useState("");

  const options = [
    { value: "", label: "All Users" },
    { value: "student", label: "Students" },
    { value: "staff", label: "Staff" },
  ];

  useEffect(() => {
    const handleMove = (e: any) => {
      if (!isResizing) return;
      const newWidth = e.clientX - 256;
      if (newWidth >= 280 && newWidth <= 600) setThreadListWidth(newWidth);
    };
    const handleUp = () => setIsResizing(false);
    if (isResizing) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
      return () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);
      };
    }
  }, [isResizing]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingComments)
          console.log("Load more comments");
      },
      { threshold: 1.0 }
    );
    if (commentsEndRef.current) observer.observe(commentsEndRef.current);
    return () => observer.disconnect();
  }, [loadingComments]);

  const handleAddComment = (content: string) => {
    const newComment = {
      id: Date.now(),
      author: "Anonymous",
      likes: 0,
      body: content,
      replies: [],
    };
    setActivePost((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
    }));
  };

  const handleAddReply = (commentId: number, content: string) => {
    const addReply = (comments: any) =>
      comments.map((c: CommentType) =>
        c.id === commentId
          ? {
              ...c,
              replies: [
                ...(c.replies || []),
                {
                  id: Date.now(),
                  author: "Anonymous",
                  likes: 0,
                  body: content,
                  replies: [],
                },
              ],
            }
          : c.replies
          ? { ...c, replies: addReply(c.replies) }
          : c
      );
    setActivePost((prev) => ({ ...prev, comments: addReply(prev.comments) }));
    setReplyingTo(null);
  };

  return (
    <main className="flex flex-col h-screen lg:flex-row text-slate-100 relative overflow-hidden">
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <aside className="hidden lg:flex flex-col w-72 border-r border-slate-800/50 p-6 space-y-8 backdrop-blur-xl bg-slate-900/30 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/30 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.15)]">
          <Sparkles className="w-4 h-4 text-blue-300" />
          <span className="text-sm font-medium bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Systems Programming
          </span>
        </div>
        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all rounded-xl py-3 text-sm font-semibold shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] hover:scale-[1.02] active:scale-[0.98]">
          <Plus size={18} /> New Thread
        </button>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-slate-400" />
            <h4 className="text-sm uppercase font-semibold text-slate-400 tracking-wider">
              Filters
            </h4>
          </div>
          <Dropdown options={options} onChange={setRole} />
          <div className="flex flex-col mt-4 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-2 block">
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="bg-slate-900/80 text-slate-100 border border-slate-700/50 rounded-lg px-4 py-2.5 text-sm w-full backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-2 block">
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="bg-slate-900/80 text-slate-100 border border-slate-700/50 rounded-lg px-4 py-2.5 text-sm w-full backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>
        </div>
      </aside>

      <section
        className={`${
          showMobileDetail ? "hidden" : "flex"
        } md:flex border-r border-slate-800/50 flex-col w-full md:relative backdrop-blur-xl bg-slate-900/20 z-10`}
        style={{
          width: window.innerWidth >= 768 ? `${threadListWidth}px` : "100%",
        }}
      >
        <div className="p-4 sm:p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-2 sm:gap-3 bg-slate-900/80 backdrop-blur-sm rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-700/50 focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <Search
              size={16}
              className="text-slate-400 sm:w-[18px] sm:h-[18px]"
            />
            <input
              placeholder="Search threads..."
              className="bg-transparent text-sm outline-none w-full text-slate-200 placeholder:text-slate-500"
            />
          </div>
        </div>
        <div className="flex-1 scrollview overflow-y-auto">
          {posts.map((post) => (
            <button
              key={post.id}
              onClick={() => {
                setActivePost(post);
                setShowMobileDetail(true);
              }}
              className={`w-full text-left px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-800/50 hover:bg-slate-800/30 transition-all group ${
                activePost.id === post.id
                  ? "bg-gradient-to-r from-slate-800/50 to-blue-900/20 border-l-4 border-l-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                  : ""
              }`}
            >
              <h4 className="text-sm sm:text-base font-semibold mb-1.5 sm:mb-2 text-slate-100 group-hover:text-blue-300 transition-colors">
                {post.title}
              </h4>
              <p className="text-xs text-slate-400 font-medium">
                {post.category}
              </p>
            </button>
          ))}
        </div>
      </section>

      <div
        className="hidden md:block w-1 bg-slate-800/50 hover:bg-blue-500 cursor-col-resize transition-all relative group z-10"
        onMouseDown={() => setIsResizing(true)}
      >
        <div className="absolute inset-y-0 -left-1 -right-1" />
      </div>

      <section
        className={`${
          showMobileDetail ? "flex" : "hidden"
        } md:flex flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-12 lg:px-16 lg:py-16 max-w-full lg:max-w-6xl mx-auto w-full scrollview overflow-y-auto relative z-10 border-slate-800/50`}
      >
        <button
          onClick={() => setShowMobileDetail(false)}
          className="md:hidden mb-6 flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700/80 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border border-slate-700/50"
        >
          <ArrowLeft size={18} /> Back to Threads
        </button>

        <div className="flex flex-col gap-6 sm:gap-8 pb-32">
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-800/20 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl hover:shadow-blue-500/5 transition-all">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 rounded-full mb-4 sm:mb-6 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300" />
              <span className="text-[10px] sm:text-xs font-semibold text-purple-300 uppercase tracking-wider">
                {activePost.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent leading-tight">
              {activePost.title}
            </h1>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-slate-700/50 flex-wrap">
              <span className="flex items-center gap-1.5 sm:gap-2 font-medium">
                <User size={14} className="text-slate-500 sm:w-4 sm:h-4" />{" "}
                {activePost.author}
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2 font-medium">
                <Clock size={14} className="text-slate-500 sm:w-4 sm:h-4" />{" "}
                {activePost.created_at}
              </span>
            </div>
            <p className="whitespace-pre-line text-slate-300 text-base sm:text-lg leading-relaxed">
              {activePost.content}
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/40 to-slate-800/20 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
              Answers
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {activePost.comments.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 italic text-base sm:text-lg">
                    No answers yet. Be the first to help!
                  </p>
                </div>
              )}
              {activePost.comments.map((comment) => (
                <CommentThread
                  key={comment.id}
                  comment={comment}
                  handleAddReply={handleAddReply}
                  handleLike={() => {}}
                  setReplyingTo={setReplyingTo}
                  replyingTo={replyingTo}
                />
              ))}
              <div ref={commentsEndRef} className="h-4" />
            </div>
          </div>
        </div>

        <div
          className={`sticky w-full bottom-10 md:bottom-3 left-0 right-0 rounded-xl bg-gradient-to-t from-violet-900 via-violet-900/50 to-transparent backdrop-blur-xl border-t border-slate-800/50 transition-all duration-300 z-20 ${
            editorCollapsed ? "translate-y-[calc(100%-56px)]" : "translate-y-0"
          }`}
        >
          <button
            onClick={() => setEditorCollapsed(!editorCollapsed)}
            className="w-full flex items-center justify-center gap-2 py-4 text-md font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            {editorCollapsed ? (
              <>
                <ChevronUp size={18} />
                <span>Show Editor</span>
              </>
            ) : (
              <>
                <ChevronDown size={18} />
                <span>Hide Editor</span>
              </>
            )}
          </button>
          {!editorCollapsed && (
            <div className="max-w-6xl mx-auto px-1 sm:px-2 md:px-4 lg:px-8 pb-6 scrollview">
              <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
                <h4 className="text-lg sm:text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  Share Your Knowledge
                </h4>
                <RichTextEditor
                  onSubmit={handleAddComment}
                  placeholder="Write a detailed answer to help others..."
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ForumContentPage;
