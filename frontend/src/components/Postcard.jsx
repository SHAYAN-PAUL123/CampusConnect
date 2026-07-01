const getCurrentUserId = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored)?._id : null;
  } catch {
    return null;
  }
};

const timeAgo = (dateString) => {
  if (!dateString) return null;

  const seconds = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000
  );

  if (Number.isNaN(seconds)) return null;
  if (seconds < 60) return "just now";

  const units = [
    ["y", 31536000],
    ["mo", 2592000],
    ["d", 86400],
    ["h", 3600],
    ["m", 60],
  ];

  for (const [label, secondsInUnit] of units) {
    const value = Math.floor(seconds / secondsInUnit);
    if (value >= 1) return `${value}${label} ago`;
  }

  return "just now";
};

const Postcard = ({
  post,
  commentValue,
  onCommentChange,
  onCommentSubmit,
  onLike,
}) => {
  const currentUserId = getCurrentUserId();
  const liked = currentUserId && post.likes?.includes(currentUserId);
  const postedAgo = timeAgo(post.createdAt);

  return (
    <div className="card-hover h-150 flex flex-col items-center justify-around rounded-[2rem] border border-zinc-800 bg-black  p-6 shadow-[0_0_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40">
      <div className="flex h-auto w-180 items-center justify-around gap-4">
        <div className="flex h-15 w-15 shrink-0 text-2xl items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 font-bold text-white shadow-[0_0_18px_-4px_rgba(139,92,246,0.5)]">
          {post.author?.name?.[0]?.toUpperCase() || "?"}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h2 className="truncate text-2xl font-bold text-white">
              {post.author?.name}
            </h2>
            {postedAgo && (
              <span className="shrink-0 text-xs text-zinc-500">
                {postedAgo}
              </span>
            )}
          </div>
          <p className="truncate text-sm text-zinc-500">
            {post.author?.email}
          </p>
        </div>
      </div>

      <p className="mt-5 text-5xl leading-relaxed text-zinc-100">
        {post.content}
      </p>

      {/* Like & Comment Count */}
      <div className="mt-6 flex items-center gap-8 border-zinc-800/80 pt-4 text-zinc-400">
        <button
          onClick={() => onLike(post._id)}
          className={`group flex cursor-pointer items-center gap-2 text-lg font-medium transition-colors duration-200 ${
            liked ? "text-rose-500" : "hover:text-rose-500"
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-active:scale-75"
          >
            <path d="M19 14c1.5-1.5 3-3.5 3-6a4.5 4.5 0 0 0-8-2.8 4.5 4.5 0 0 0-8 2.8c0 4 4 7 9 12 2.5-2.5 3-3 4-4z" />
          </svg>
          {post.likes?.length || 0}
        </button>

        <span className="mt-6 flex items-center gap-1 border-zinc-800/80 pt-4 text-zinc-400">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          {post.comments?.length || 0}
        </span>
      </div>

      {/* Add Comment */}
      <div className="mt-6 w-[80%] flex flex-col items-center gap-8 border-zinc-800/80 pt-4 text-zinc-400">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentValue || ""}
          onChange={(e) => onCommentChange(post._id, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onCommentSubmit(post._id);
          }}
          className="w-full h-10 text-center rounded-2xl border border-zinc-800 bg-black p-3 text-white outline-none transition focus:border-violet-500"
        />

        <button
          onClick={() => onCommentSubmit(post._id)}
          className="shrink-0 cursor-pointer h-10 w-15 rounded-xl bg-violet-600 px-5 py-2 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-500"
        >
          Post
        </button>
      </div>

      {/* Display Comments */}
      {post.comments?.length > 0 && (
        <div className="mt-5 space-y-2.5">
          {post.comments.map((c) => (
            <div
              key={c._id}
              className="text-xl overflow-auto border-zinc-800/80 bg-black/60 p-3.5 text-zinc-300"
            >
              {c.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Postcard;