import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <Navbar />

      {/* Hero */}
      <section className="hero py-20 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <div className="text-6xl mb-4">💸</div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Manage Your Daily Expenses Easily
            </h1>
            <p className="py-6 text-lg opacity-80">
              A simple, colorful web app to add, view, update, and delete your
              personal expenses — all in one place.
            </p>
            <Link to="/register" className="btn btn-primary mr-2">Get Started</Link>
            <Link to="/login" className="btn btn-outline btn-secondary">Login</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Why Use Our App?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "📝", title: "Add Expenses", desc: "Quickly record what you spend every day." },
            { icon: "📊", title: "Track Totals", desc: "See your total spending at a glance." },
            { icon: "🔒", title: "Secure & Private", desc: "Your data is protected by user login." },
          ].map((f) => (
            <div key={f.title} className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-2">{f.icon}</div>
                <h3 className="card-title">{f.title}</h3>
                <p className="opacity-80">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-base-200 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          <ul className="steps steps-vertical md:steps-horizontal w-full">
            <li className="step step-primary">Create Account</li>
            <li className="step step-primary">Login Securely</li>
            <li className="step step-primary">Add Expenses</li>
            <li className="step step-primary">Manage Anytime</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to take control?</h2>
        <p className="opacity-80 mb-6">Sign up and start tracking your expenses in seconds.</p>
        <Link to="/register" className="btn btn-primary btn-wide">Get Started Free</Link>
      </section>

      <Footer />
    </div>
  );
}