import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import Navbar from "../components/Navbar.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErr(error.message);
    else navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="flex justify-center py-12 px-4">
        <div className="card w-full max-w-md bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            {err && <div className="alert alert-error">{err}</div>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input input-bordered w-full" required />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input input-bordered w-full" required />
              <button type="submit" className="btn btn-primary w-full">Login</button>
            </form>
            <p className="text-sm mt-2">
              No account? <Link to="/register" className="link">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}