import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import Navbar from "../components/Navbar.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) {
      setErr(error.message);
      return;
    }
    if (data.session) navigate("/dashboard");
    else setMsg("Registration successful. Please check your email or login.");
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="flex justify-center py-12 px-4">
        <div className="card w-full max-w-md bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Register</h2>
            {err && <div className="alert alert-error">{err}</div>}
            {msg && <div className="alert alert-success">{msg}</div>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="input input-bordered w-full" required />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input input-bordered w-full" required />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input input-bordered w-full" required minLength={6} />
              <button type="submit" className="btn btn-primary w-full">Register</button>
            </form>
            <p className="text-sm mt-2">
              Have an account? <Link to="/login" className="link">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}