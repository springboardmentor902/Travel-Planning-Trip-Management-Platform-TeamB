import { registerUser } from "../services/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (name.length < 2) { setError("Name must be at least 2 characters"); return; }
    if (email === "") { setError("Email is required"); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return; }

    try {
      const data = await registerUser({ name, email, password });
      if (data === "Email already registered") {
        setError("Email already registered");
        return;
      }
      setSuccess("Account created successfully! Redirecting to sign in...");
      setTimeout(() => {
        navigate("/login", { state: { email, registered: true } });
      }, 700);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-side register-side">
        <span>✦</span>
        <h2>Build trips you'll remember.</h2>
        <p>Create your TripNest account and start organizing your travel plans in one place.</p>
      </div>
      <div className="auth-card">
        <div className="auth-brand">✈️</div>
        <span className="eyebrow">GET STARTED</span>
        <h1>Create your account</h1>
        <p className="auth-subtitle">Join TripNest and start planning smarter.</p>

        {error && <div className="message error">{error}</div>}
        {success && <div className="message success">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Full name
            <input type="text" placeholder="Your name" value={name}
              onChange={(event) => setName(event.target.value)} />
          </label>
          <label>Email address
            <input type="email" placeholder="you@example.com" value={email}
              onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>Password
            <input type="password" placeholder="At least 8 characters" value={password}
              onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button className="primary-btn full-btn" type="submit">Create account</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
}

export default Register;
