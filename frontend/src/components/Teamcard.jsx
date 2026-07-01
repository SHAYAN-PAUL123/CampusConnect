const Teamcard = ({ team, onApply }) => {
  return (
    <div className="card-hover h-50 w-full group flex flex-col items-center justify-around relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/85 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/60 hover:shadow-[0_0_40px_-8px_rgba(139,92,246,0.35)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-violet-600/0 blur-3xl transition-all duration-500 group-hover:bg-violet-600/20" />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-2xl font-bold text-white">{team.title}</h2>

        <span className="inline-flex w-22 items-center gap-2 rounded border border-zinc-700 bg-black/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-300">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-violet-400"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          {team.teamSize} {Number(team.teamSize) === 1 ? "spot" : "spots"}
        </span>
      </div>

      <p className="relative mt-4 text-zinc-300">{team.description}</p>

      {team.requiredSkills?.length > 0 && (
        <div className="relative mt-5 flex flex-wrap gap-2">
          {team.requiredSkills.map((skill, index) => (
            <span
              key={index}
              className="rounded w-10 border border-violet-500/30 bg-violet-600/10 px-3.5 py-1.5 text-sm font-medium text-violet-300 transition-colors duration-200 hover:border-violet-500/60 hover:bg-violet-600/20"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <button
        onClick={() => onApply(team._id)}
        className="relative  h-10 mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-[0_0_20px_-4px_rgba(16,185,129,0.6)]"
      >
        Apply to join
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Teamcard;