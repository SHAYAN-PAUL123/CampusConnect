import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Teamcard from "../components/Teamcard";

const TeamFinder = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [teamSize, setTeamSize] = useState("");

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const getTeams = async () => {
    try {
      const res = await API.get("/team");
      setTeams(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  const handleCreate = async () => {
    if (!title.trim() || !description.trim()) return;

    try {
      setCreating(true);

      await API.post("/team", {
        title,
        description,
        requiredSkills: requiredSkills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        teamSize,
      });

      setTitle("");
      setDescription("");
      setRequiredSkills("");
      setTeamSize("");

      getTeams();
    } catch (err) {
      console.log(err);
    } finally {
      setCreating(false);
    }
  };

  const handleApply = async (id) => {
    const message = prompt("Why do you want to join?");

    if (!message) return;

    try {
      await API.post(`/team/${id}/apply`, {
        message,
      });

      alert("Applied Successfully");
    } catch (err) {
      console.log(err);
    }
  };

return (
  <>
    <Navbar />

    <div className="flex flex-col items-center justify-around bg-transparent px-4 py-10 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
        {/* Hero */}
        <div className="relative flex flex-col items-center justify-around h-40 w-[75%] overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/85 p-8 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative flex flex-col items-center justify-center gap-3">
            <h1 className="text-center text-4xl font-bold md:text-5xl">
              Team Finder
            </h1>

            <p className="text-center text-zinc-400">
              Create a team, share your needs, and find collaborators that
              match your vision.
            </p>
          </div>
        </div>

        {/* Create Team */}
        <div className="card-hover h-auto flex flex-col justify-around items-center gap-3 w-full rounded-[2rem] border border-zinc-800 bg-zinc-950/85 p-6 shadow-[0_0_30px_rgba(0,0,0,0.25)]">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Create Team
          </h2>

          <div className="w-[90%] flex flex-col items-center justify-around gap-3">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 text-center rounded-2xl border border-zinc-800 bg-black/70 p-4 text-white outline-none transition focus:border-violet-500"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-10 text-center rounded-2xl border border-zinc-800 bg-black/70 p-4 text-white outline-none transition focus:border-violet-500"
            />

            <input
              type="text"
              placeholder="Required skills (comma separated)"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
              className="w-full h-10 text-center rounded-2xl border border-zinc-800 bg-black/70 p-4 text-white outline-none transition focus:border-violet-500"
            />

            <input
              type="number"
              placeholder="Team size"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="w-full h-10 text-center rounded-2xl border border-zinc-800 bg-black/70 p-4 text-white outline-none transition focus:border-violet-500"
            />

            <div className="flex justify-end">
              <button
                onClick={handleCreate}
                disabled={
                  creating || !title.trim() || !description.trim()
                }
                className="cursor-pointer h-10 w-25 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-[0_0_20px_-4px_rgba(139,92,246,0.6)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {creating ? "Creating..." : "Create Team"}
              </button>
            </div>
          </div>
        </div>

        {/* Teams */}
        {loading ? (
          <div className=" w-full space-y-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-[2rem] border border-zinc-800 bg-zinc-950/60"
              />
            ))}
          </div>
        ) : teams.length === 0 ? (
          <div className="w-full rounded-[2rem] border border-dashed border-zinc-800 bg-zinc-950/50 p-12 text-center text-zinc-500">
            No teams yet — create the first one above and start
            recruiting.
          </div>
        ) : (
          <div className="w-full h-auto flex gap-2 flex-col space-y-6">
            {teams.map((team) => (
              <Teamcard
                key={team._id}
                team={team}
                onApply={handleApply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </>
);

};

export default TeamFinder;