import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="hero py-20">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">Manage Your Daily Expenses Easily</h1>
            <p className="py-6">
              A simple web application to add, view, update and delete your personal expenses.
            </p>
            <Link to="/register" className="btn btn-primary mr-2">Get Started</Link>
            <Link to="/login" className="btn">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}