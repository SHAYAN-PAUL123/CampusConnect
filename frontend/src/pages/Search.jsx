import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Usercard from "../components/Usercard";

const Search = () => {
  const [skill, setSkill] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!skill.trim()) return;

    try {
      setLoading(true);
      const res = await API.get(`/users/search?skill=${skill}`);

      setUsers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <>
      <Navbar />

      <div className=" flex flex-col items-center bg-transparent px-4 py-12 text-white">
        <div className="mx-auto flex w-full flex-col items-center gap-12">
          {/* Hero Section */}
          <div className="relative w-[50%] overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/85 px-8 py-14 text-center shadow-[0_0_35px_rgba(0,0,0,0.3)]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-3xl" />

            <div className="relative h-30 flex flex-col items-center justify-around gap-4">

              <h1 className="text-4xl font-bold md:text-5xl">
                Find Students
              </h1>

              <p className="max-w-2xl text-zinc-400">
                Search by skill and connect with the right people for your next
                idea.
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-5">
            <input
              type="text"
              placeholder="Search by skill, e.g. React, Figma, Python..."
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="w-100 h-15 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 text-white outline-none transition-all duration-200 focus:border-violet-500 focus:shadow-[0_0_20px_-6px_rgba(139,92,246,0.5)]"
            />

            <button
              onClick={handleSearch}
              disabled={loading}
              className="cursor-pointer h-10 w-20 rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-violet-500 hover:shadow-[0_0_20px_-4px_rgba(139,92,246,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Results */}
          {loading ? (
            <div className="space-y-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded-[2rem] border border-zinc-800 bg-zinc-950/60"
                />
              ))}
            </div>
          ) : searched && users.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-zinc-800 bg-zinc-950/50 p-12 text-center text-zinc-500">
              No students found with that skill — try a different keyword.
            </div>
          ) : (
            <div className="space-y-6">
              {users.map((user) => (
                <Usercard key={user._id} user={user} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;