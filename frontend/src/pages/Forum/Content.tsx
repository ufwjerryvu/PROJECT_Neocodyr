import React, { useState } from "react";
import {
  MessageSquare,
  Clock,
  User,
  Search,
  Plus,
  ArrowLeft,
} from "lucide-react";

const Dropdown = () => {
  const [value, setValue] = useState("");

  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="
        bg-slate-900
        text-slate-100
        border border-slate-700
        rounded-md
        px-3 py-2
        focus:outline-none
        focus:ring-2
        focus:ring-slate-600
        text-xs
        w-full 
      "
    >
      <option value="" disabled className="bg-slate-900">
        All
      </option>
      <option value="frontend" className="bg-slate-900">
        Student
      </option>
      <option value="backend" className="bg-slate-900">
        Staff
      </option>
    </select>
  );
};

const ForumContentPage = () => {
  interface Comment {
    id: number;
    author: string;
    body: string;
    replies?: Comment[];
  }

  interface Post {
    id: number;
    title: string;
    author: string;
    created_at: string;
    category: string;
    content: string;
    comments: Comment[];
  }

  const [posts] = useState<Post[]>([
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
          body: "You can use the quadratic formula: x = (-b ± √(b² − 4ac)) / 2a",
          replies: [
            {
              id: 3,
              author: "Anonymous",
              body: "Thanks! But what if the discriminant is negative?",
              replies: [
                {
                  id: 5,
                  author: "Scott Maxwell (STAFF)",
                  body: "Great question! If b² - 4ac < 0, you get complex solutions with imaginary numbers.",
                },
              ],
            },
            {
              id: 4,
              author: "Jane Doe",
              body: "This is really helpful, thank you!",
            },
            {
              id: 3,
              author: "Anonymous",
              body: "Thanks! But what if the discriminant is negative?",
              replies: [
                {
                  id: 5,
                  author: "Scott Maxwell (STAFF)",
                  body: "Great question! If b² - 4ac < 0, you get complex solutions with imaginary numbers.",
                },
              ],
            },
            {
              id: 4,
              author: "Jane Doe",
              body: "This is really helpful, thank you!",
            },
            {
              id: 3,
              author: "Anonymous",
              body: "Thanks! But what if the discriminant is negative?",
              replies: [
                {
                  id: 5,
                  author: "Scott Maxwell (STAFF)",
                  body: "Great question! If b² - 4ac < 0, you get complex solutions with imaginary numbers.",
                },
              ],
            },
            {
              id: 4,
              author: "Jane Doe",
              body: "This is really helpful, thank you!",
            },
            {
              id: 3,
              author: "Anonymous",
              body: "Thanks! But what if the discriminant is negative?",
              replies: [
                {
                  id: 5,
                  author: "Scott Maxwell (STAFF)",
                  body: "Great question! If b² - 4ac < 0, you get complex solutions with imaginary numbers.",
                },
              ],
            },
            {
              id: 4,
              author: "Jane Doe",
              body: "This is really helpful, thank you!",
            },
            {
              id: 3,
              author: "Anonymous",
              body: "Thanks! But what if the discriminant is negative?",
              replies: [
                {
                  id: 5,
                  author: "Scott Maxwell (STAFF)",
                  body: "Great question! If b² - 4ac < 0, you get complex solutions with imaginary numbers.",
                },
              ],
            },
            {
              id: 4,
              author: "Jane Doe",
              body: "This is really helpful, thank you!",
            },
          ],
        },
        {
          id: 2,
          author: "John Smith",
          body: "You can also complete the square if you want to derive the formula yourself.",
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

  const [activePost, setActivePost] = useState<Post>(posts[0]);
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [showSidebar, setShowSidebar] = useState(true);
  const [showThreadList, setShowThreadList] = useState(true);
  const [threadListWidth, setThreadListWidth] = useState(384); // 96 * 4 = 384px (lg:w-96)
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = e.clientX - (showSidebar ? 256 : 0); // Subtract sidebar width if visible
      if (newWidth >= 280 && newWidth <= 600) {
        setThreadListWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, showSidebar]);

  const CommentThread = ({
    comment,
    depth = 0,
  }: {
    comment: Comment;
    depth?: number;
  }) => {
    const isStaff = comment.author.includes("STAFF");
    const borderColor = isStaff ? "border-green-500" : "border-slate-700";

    return (
      <div className={depth > 0 ? "ml-6 mt-4 max-h-screen" : ""}>
        <div className={`border-l-4 ${borderColor} pl-4 pb-4`}>
          <p
            className={`text-sm font-medium ${
              isStaff ? "text-green-400" : "text-slate-200"
            }`}
          >
            {comment.author}
          </p>
          <p className="text-slate-300 mt-1">{comment.body}</p>

          {/* Reply button placeholder */}
          <button className="text-xs text-slate-400 hover:text-blue-400 mt-2">
            Reply
          </button>
        </div>

        {/* Render nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-0">
            {comment.replies.map((reply) => (
              <CommentThread key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="h-screen flex flex-col lg:flex-row bg-gradient-to-b from-slate-900/0 to-slate-900/200 text-slate-100">
      {/* Left sidebar */}
      {showSidebar && (
        <aside className="hidden lg:block w-64 border-r border-slate-800 p-4 space-y-6">
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition rounded-lg py-2 text-sm font-medium">
            <Plus size={16} /> New Thread
          </button>

          <div>
            <h4 className="text-md uppercase text-slate-400 mb-2">Filters</h4>
            <Dropdown />
            <div className="flex flex-col mt-3 gap-2">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">
                  From
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="bg-slate-900 text-slate-100 border border-slate-700 rounded-md px-3 py-2 text-xs w-full"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">To</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="bg-slate-900 text-slate-100 border border-slate-700 rounded-md px-3 py-2 text-xs w-full"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-md uppercase text-slate-400 mb-2">
              Categories
            </h4>
            <ul className="space-y-1 scrollview overflow-y-auto h-screen text-sm">
              <li className="text-slate-300">General</li>
              <li className="text-green-400">Tutorials</li>
              <li className="text-yellow-400">Assignments</li>
            </ul>
          </div>
        </aside>
      )}

      {/* Middle column: thread list */}
      {showThreadList && (
        <>
          <section
            className={`${
              showMobileDetail ? "hidden" : "flex"
            } md:flex border-r border-slate-800 flex-col w-full md:relative`}
            style={{
              width: window.innerWidth >= 768 ? `${threadListWidth}px` : "100%",
            }}
          >
            <div className="p-4 border-b border-slate-800">
              <div className="flex items-center gap-2 bg-slate-900 rounded-lg px-3 py-2">
                <Search size={16} className="text-slate-400" />
                <input
                  placeholder="Search"
                  className="bg-transparent text-sm outline-none w-full"
                />
              </div>
            </div>

            <div className="flex-1 bg-slate-900/10 scrollview overflow-y-auto">
              {posts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => {
                    setActivePost(post);
                    setShowMobileDetail(true);
                  }}
                  className={`w-full text-left px-4 py-3 border-b border-slate-800 hover:bg-slate-900 transition ${
                    activePost.id === post.id ? "bg-slate-900" : ""
                  }`}
                >
                  <h4 className="text-sm font-medium">{post.title}</h4>
                  <p className="text-xs text-slate-400">{post.category}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Resize handle - only on desktop */}
          <div
            className="hidden md:block w-1 bg-slate-800 hover:bg-blue-500 cursor-col-resize transition-colors relative group"
            onMouseDown={handleMouseDown}
          >
            <div className="absolute inset-y-0 -left-1 -right-1" />
          </div>
        </>
      )}

      {/* Right column: active post */}
      <section
        className={`${
          showMobileDetail ? "flex" : "hidden"
        } md:flex flex-1 flex-col scrollview overflow-y-auto p-4 md:p-8 lg:p-10 max-w-full lg:max-w-6xl mx-auto w-full`}
      >
        {/* Mobile back button */}
        <button
          onClick={() => setShowMobileDetail(false)}
          className="md:hidden mb-6 flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <ArrowLeft size={18} /> Back to Threads
        </button>
        <div className="flex flex-col gap-2">
          <div className="bg-slate-900/80 p-5 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-semibold">{activePost.title}</h1>
              {/* <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => setShowSidebar((v) => !v)}
                  className="px-3 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700"
                >
                  Toggle Sidebar
                </button>
                <button
                  onClick={() => setShowThreadList((v) => !v)}
                  className="px-3 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700"
                >
                  Toggle Threads
                </button>
              </div> */}
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
              <span className="flex items-center gap-1">
                <User size={14} /> {activePost.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {activePost.created_at}
              </span>
            </div>

            <p className="whitespace-pre-line text-slate-300 mb-10">
              {activePost.content}
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Answers</h3>

            <div className="space-y-4">
              {activePost.comments.length === 0 && (
                <p className="text-slate-400 italic">No answers yet.</p>
              )}

              {activePost.comments.map((comment) => (
                <CommentThread key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForumContentPage;
