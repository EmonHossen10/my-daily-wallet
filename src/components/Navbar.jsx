import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";

export default function Navbar({ authed = false }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const linkClass =
    "relative px-2 py-1 font-medium text-base-content after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full";

  return (
    <div className="navbar bg-gradient-to-r from-primary/10 via-base-100 to-secondary/10 shadow-md sticky top-0 z-50 backdrop-blur">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          💰 Expense Manager
        </Link>
      </div>
      <div className="flex-none gap-2">
        {authed ? (
          <>
            <Link to="/dashboard" className={linkClass}>Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-primary">Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className={linkClass}>Home</Link>
            <Link to="/login" className={linkClass}>Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}