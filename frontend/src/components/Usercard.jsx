const GRADIENTS = [
  "from-violet-500 to-fuchsia-500",
  "from-sky-500 to-violet-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-rose-500",
  "from-rose-500 to-violet-500",
  "from-teal-500 to-sky-500",
];

const gradientFor = (seed = "") => {
  const sum = seed
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return GRADIENTS[sum % GRADIENTS.length];
};

const Usercard = ({ user }) => {
  return (
    <div className="card-hover group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/85 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/60 hover:shadow-[0_0_40px_-8px_rgba(139,92,246,0.35)]">
      {/* ambient corner glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-600/0 blur-3xl transition-all duration-500 group-hover:bg-violet-600/20" />

      <div className="relative flex items-start gap-5">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradientFor(
            user.name
          )} text-2xl font-bold text-white shadow-[0_0_20px_-4px_rgba(139,92,246,0.5)] transition-transform duration-300 group-hover:scale-105`}
        >
          {user.name?.[0]?.toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-bold text-white">
            {user.name}
          </h2>
          <p className="truncate text-sm text-zinc-400">{user.email}</p>
          {user.branch && (
            <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-zinc-500">
              <span className="h-1 w-1 rounded-full bg-violet-500" />
              {user.branch}
            </p>
          )}
        </div>
      </div>

      {user.skills?.length > 0 && (
        <div className="relative mt-5 flex flex-wrap gap-2">
          {user.skills.map((skill, index) => (
            <span
              key={index}
              className="rounded-full border border-violet-500/30 bg-violet-600/10 px-3.5 py-1.5 text-sm font-medium text-violet-300 transition-colors duration-200 hover:border-violet-500/60 hover:bg-violet-600/20"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {user.resume && (
        <a
          href={user.resume}
          target="_blank"
          rel="noreferrer"
          className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-[0_0_20px_-4px_rgba(139,92,246,0.6)]"
        >
          View resume
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      )}
    </div>
  );
};

export default Usercard;