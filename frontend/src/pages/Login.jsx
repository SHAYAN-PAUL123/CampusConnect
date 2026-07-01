import Particles from "../components/Particles";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-[#050505]">
      {/* Particle background — sits at the back within this isolated context */}
      <div className="absolute inset-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-40 left-1/4 h-[28rem] w-[28rem] rounded-full bg-violet-700/20 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[24rem] w-[24rem] rounded-full bg-fuchsia-700/10 blur-[120px]" />
        </div>

        <div className="card-hover flex w-130 h-68 flex-col gap-6 rounded-[2rem] border-2 border-zinc-800 bg-zinc-950/90 pt-20 pb-14 shadow-[0_0_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-violet-500/40">
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-4xl font-bold">CampusConnect</h1>
            <p className="text-center text-zinc-400">
              Connect • Collaborate • Build
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4"
          >
            <input
              type="email"
              placeholder="Email"
              className="w-[80%] h-8 text-center rounded-xl border border-zinc-700 bg-[#0A0A0A] px-4 py-3 outline-none transition focus:border-violet-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-[80%] h-8 text-center rounded-xl border border-zinc-700 bg-[#0A0A0A] px-4 py-7 outline-none transition focus:border-violet-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-[20%] h-7 cursor-pointer rounded-xl bg-violet-600 py-7 font-semibold transition duration-200 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-[0_0_20px_-4px_rgba(139,92,246,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <p className="text-center text-zinc-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-violet-500 transition hover:text-violet-400"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;