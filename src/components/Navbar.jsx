import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";

export default function Navbar({ authed = false }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-200 shadow">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Personal Expense Manager
        </Link>
      </div>
      <div className="flex-none gap-2">
        {authed ? (
          <>
            <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-primary">Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="btn btn-ghost">Home</Link>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}