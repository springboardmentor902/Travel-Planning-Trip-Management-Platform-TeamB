import { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (subscribedEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setSubscribedEmail("");
      }, 3000);
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-top-strip">
        <div className="footer-strip-content">
          <div className="strip-item">
            <span className="strip-icon">🌍</span>
            <div>
              <strong>120+ Curated Escapes</strong>
              <p>Top destinations across India & the globe</p>
            </div>
          </div>
          <div className="strip-item">
            <span className="strip-icon">🗓️</span>
            <div>
              <strong>Smart Day-Wise Itineraries</strong>
              <p>Effortlessly organize your travel plans</p>
            </div>
          </div>
          <div className="strip-item">
            <span className="strip-icon">⚡</span>
            <div>
              <strong>Instant Activity Scheduling</strong>
              <p>Sightseeing, dining & stay checklists</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-inner">
        {/* Column 1: Brand & Bio */}
        <div className="footer-col footer-about">
          <div className="footer-brand">
            <span className="footer-brand-mark">✈️</span>
            <span>TripNest</span>
          </div>
          <p className="footer-tagline">
            Your all-in-one travel planning companion. Discover breathtaking destinations,
            craft day-by-day itineraries, and make every journey seamless and memorable.
          </p>
          <div className="footer-version-tag">
            <span>v2.0 • Milestone 2 Edition</span>
          </div>
          <div className="footer-socials">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter / X" aria-label="Twitter">
              🐦
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram" aria-label="Instagram">
              📸
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub">
              💻
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn">
              💼
            </a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-col">
          <div className="footer-heading">Explore TripNest</div>
          <div className="footer-links">
            <Link to="/">Home Overview</Link>
            <Link to="/destinations">All Destinations</Link>
            <Link to="/trips">My Planned Trips</Link>
            <Link to="/dashboard">Travel Dashboard</Link>
            <Link to="/profile">Traveler Profile</Link>
            <Link to="/settings">Account Settings</Link>
          </div>
        </div>

        {/* Column 3: Top Destinations */}
        <div className="footer-col">
          <div className="footer-heading">Popular Escapes</div>
          <div className="footer-links">
            <Link to="/destinations">Goa, India <span className="dest-tag">Beach</span></Link>
            <Link to="/destinations">Jaipur, Rajasthan <span className="dest-tag">Heritage</span></Link>
            <Link to="/destinations">Munnar, Kerala <span className="dest-tag">Hills</span></Link>
            <Link to="/destinations">Bangalore, Karnataka <span className="dest-tag">Metropolis</span></Link>
            <Link to="/destinations">Kaziranga, Assam <span className="dest-tag">Eco-Tourism</span></Link>
            <Link to="/destinations">Coorg, Karnataka <span className="dest-tag">Hills</span></Link>
          </div>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer-col footer-newsletter-col">
          <div className="footer-heading">Stay Inspired</div>
          <p className="newsletter-desc">
            Subscribe for curated travel itineraries, hidden gems, and seasonal travel alerts.
          </p>

          {isSubscribed ? (
            <div className="newsletter-success">
              ✅ Thank you! Check your inbox soon for travel inspiration.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={subscribedEmail}
                onChange={(e) => setSubscribedEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                Join
              </button>
            </form>
          )}
          <span className="newsletter-reassurance">🔒 No spam. Unsubscribe anytime.</span>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <div className="footer-copy">
            © 2026 TripNest Inc. Built for adventurers & dreamers. All rights reserved.
          </div>
          <div className="footer-status-pill">
            <span className="status-dot"></span>
            <span>API & Services Online</span>
          </div>
          <div className="footer-legal-links">
            <Link to="/">Privacy Policy</Link>
            <span className="divider">•</span>
            <Link to="/">Terms of Service</Link>
            <span className="divider">•</span>
            <Link to="/">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
