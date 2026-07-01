
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Field = ({
  label,
  editing,
  value,
  onChange,
  multiline,
  children,
}) => (
  <div className="card-hover rounded-2xl border border-zinc-800 bg-black p-5 transition-all duration-200 hover:border-zinc-700">
    <p className="text-sm uppercase tracking-wider text-zinc-500">
      {label}
    </p>

    {editing ? (
      multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={3}
          className="mt-3 w-full resize-none rounded-xl border border-zinc-700 bg-[#09090B] p-3 text-white outline-none transition focus:border-violet-500"
        />
      ) : (
        <input
          value={value}
          onChange={onChange}
          className="mt-3 w-full rounded-xl border border-zinc-700 bg-[#09090B] p-3 text-white outline-none transition focus:border-violet-500"
        />
      )
    ) : (
      <div className="mt-2">{children}</div>
    )}
  </div>
);

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    year: "",
    bio: "",
    skills: "",
    resume: "",
  });

  const getProfile = async () => {
    try {
      const res = await API.get("/auth/me");

      setUser(res.data);

      setFormData({
        name: res.data.name || "",
        branch: res.data.branch || "",
        year: res.data.year || "",
        bio: res.data.bio || "",
        skills: res.data.skills?.join(", ") || "",
        resume: res.data.resume || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      setSaving(true);

      await API.put("/auth/profile", {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      alert("Profile Updated");

      setEdit(false);
      getProfile();
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const updateField = (key) => (e) =>
    setFormData({
      ...formData,
      [key]: e.target.value,
    });

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center bg-transparent text-white">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-violet-500" />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen items-center justify-center bg-transparent px-4 py-10 text-white">
        <div className="flex w-[90%] max-w-5xl flex-col gap-5 rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-10 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
          {/* Profile Header */}
          <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-4xl font-bold shadow-[0_0_30px_-6px_rgba(139,92,246,0.6)]">
                {user.name?.[0]?.toUpperCase()}
              </div>

              <div>
                <h1 className="text-4xl font-bold">{user.name}</h1>

                <p className="mt-2 text-zinc-400">
                  {user.branch || "No Branch"} • Year{" "}
                  {user.year || "Not Added"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setEdit(!edit)}
                className="cursor-pointer rounded-lg bg-violet-600 px-6 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-[0_0_20px_-4px_rgba(139,92,246,0.6)]"
              >
                {edit ? "Cancel" : "Edit Profile"}
              </button>

              <button
                onClick={handleLogout}
                className="cursor-pointer rounded-lg bg-red-600 px-6 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-[0_0_20px_-4px_rgba(239,68,68,0.6)]"
              >
                Logout
              </button>
            </div>
          </div>

          <Field
            label="Name"
            editing={edit}
            value={formData.name}
            onChange={updateField("name")}
          >
            <h2 className="text-2xl font-semibold">{user.name}</h2>
          </Field>

          <Field label="Email" editing={false}>
            <h2 className="text-lg text-zinc-300">{user.email}</h2>
          </Field>

          <Field
            label="Branch"
            editing={edit}
            value={formData.branch}
            onChange={updateField("branch")}
          >
            <h2 className="text-lg">{user.branch || "Not Added"}</h2>
          </Field>

          <Field
            label="Year"
            editing={edit}
            value={formData.year}
            onChange={updateField("year")}
          >
            <h2 className="text-lg">{user.year || "Not Added"}</h2>
          </Field>

          <Field
            label="Bio"
            editing={edit}
            value={formData.bio}
            onChange={updateField("bio")}
            multiline
          >
            <p className="text-lg text-zinc-300">
              {user.bio || "No bio added yet."}
            </p>
          </Field>

          <Field
            label="Skills"
            editing={edit}
            value={formData.skills}
            onChange={updateField("skills")}
          >
            <div className="flex flex-wrap gap-3">
              {user.skills?.length > 0 ? (
                user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex min-h-10 items-center rounded-full border border-violet-500/30 bg-violet-600/10 px-4 py-2 font-medium text-violet-300 transition-colors duration-200 hover:border-violet-500/60 hover:bg-violet-600/20"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-zinc-400">No skills added yet.</p>
              )}
            </div>
          </Field>

          <Field
            label="Resume"
            editing={edit}
            value={formData.resume}
            onChange={updateField("resume")}
          >
            {user.resume ? (
              <a
                href={user.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-500"
              >
                View Resume
              </a>
            ) : (
              <p className="text-zinc-400">No resume added yet.</p>
            )}
          </Field>

          {edit && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="cursor-pointer rounded-xl bg-emerald-600 px-6 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-[0_0_20px_-4px_rgba(16,185,129,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
