import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Home() {
  const { isAuthenticated } = useAuth();

  const featuredDestinations = [
    {
      id: "goa",
      name: "Goa",
      country: "India",
      type: "Beaches & Heritage",
      image:
        "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=700&q=80",
      bestTime: "Nov - Feb",
      tag: "Trending Beach",
    },
    {
      id: "jaipur",
      name: "Jaipur",
      country: "India",
      type: "Royal Heritage",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=700&q=80",
      bestTime: "Oct - Mar",
      tag: "Royal Heritage",
    },
    {
      id: "manali",
      name: "Manali",
      country: "India",
      type: "Himalayan Escape",
      image:
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=700&q=80",
      bestTime: "Oct - Jun",
      tag: "Top Mountain",
    },
    {
      id: "munnar",
      name: "Munnar",
      country: "India",
      type: "Misty Tea Hills",
      image:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=700&q=80",
      bestTime: "Sep - Mar",
      tag: "Nature Escape",
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-copy">
          <div className="hero-badge-pill">
            <span className="badge-icon">✈️</span>
            <span>YOUR ULTIMATE TRAVEL COMPANION</span>
          </div>
          <h1>
            Smart Plan with AI.<br />
            <span className="gradient-text">Save Time. Travel more.</span>
          </h1>
          <p>
            Turn your wanderlust into reality. Discover handpicked destinations,
            curate day-wise itineraries, manage activity schedules, and keep every detail
            of your journey organized in one place.
          </p>
          <div className="hero-actions">
            <Link className="primary-btn hero-cta-btn" to="/destinations">
              <span>Explore Destinations</span>
              <span className="btn-arrow">→</span>
            </Link>
            {isAuthenticated ? (
              <Link className="secondary-btn hero-secondary-btn" to="/trips">
                <span>View My Trips</span>
              </Link>
            ) : (
              <Link className="secondary-btn hero-secondary-btn" to="/register">
                <span>Start Planning Free</span>
              </Link>
            )}
          </div>
          <div className="hero-trust">
            <span>✓ 120+ Curated Escapes</span>
            <span>✓ Smart Day-Wise Timelines</span>
            <span>✓ 100% Free Travel Planner</span>
          </div>
        </div>

        {/* Hero Visual Card Showcase */}
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
              alt="Tropical travel destination"
              className="hero-main-img"
            />
            <div className="hero-img-overlay">
              <span className="hero-dest-name">Havelock Island, India</span>
              <span className="hero-dest-sub">Tropical Sanctuary • Turquoise Waters</span>
            </div>
          </div>

          {/* Floating Feature Cards */}
          <div className="floating-card hero-rating-float">
            <span className="float-icon">⭐</span>
            <div>
              <strong>4.9 / 5 Explorer Rating</strong>
              <span>Trusted by 1,500+ happy travelers</span>
            </div>
          </div>

          <div className="floating-card hero-itinerary-float">
            <span className="float-icon">🗓️</span>
            <div>
              <strong>Day 1 • Sunset Beach Walk</strong>
              <span className="float-tag">Seminyak Coast • Scheduled</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Value Strip */}
      <section className="feature-strip">
        <div className="feature-box">
          <div className="feature-number">01</div>
          <span className="feature-icon-tag">🗺️ EXPLORE</span>
          <strong>Discover Dream Places</strong>
          <p>Find hidden gems, top tourist spots, seasonal recommendations, and entry guidelines.</p>
        </div>
        <div className="feature-box">
          <div className="feature-number">02</div>
          <span className="feature-icon-tag">📅 ITINERARY</span>
          <strong>Build Day-Wise Plans</strong>
          <p>Structure your trip timeline day by day with flexible scheduling and personal notes.</p>
        </div>
        <div className="feature-box">
          <div className="feature-number">03</div>
          <span className="feature-icon-tag">🎒 ACTIVITIES</span>
          <strong>Schedule Activities</strong>
          <p>Coordinate sightseeing, dining, transport, and bookings with zero stress.</p>
        </div>
      </section>

      {/* Trending Destinations Section */}
      <section className="home-destinations-section">
        <div className="section-header-centered">
          <span className="eyebrow">CURATED TRAVEL INSPIRATION</span>
          <h2>Trending Destinations</h2>
          <p>Explore some of the world's most sought-after holiday and adventure spots.</p>
        </div>

        <div className="home-dest-grid">
          {featuredDestinations.map((dest) => (
            <div key={dest.id} className="home-dest-card">
              <div className="home-dest-image-wrap">
                <img src={dest.image} alt={dest.name} loading="lazy" />
                <span className="home-dest-badge">{dest.tag}</span>
                <span className="home-dest-country">{dest.country}</span>
              </div>
              <div className="home-dest-body">
                <div className="home-dest-header">
                  <h3>{dest.name}</h3>
                  <span className="home-dest-season">🗓️ {dest.bestTime}</span>
                </div>
                <p className="home-dest-type">{dest.type}</p>
                <Link to="/destinations" className="home-dest-link">
                  <span>Explore Guides</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="destinations-action-center">
          <Link to="/destinations" className="primary-btn view-all-btn">
            View All Destinations ({">"} 120 places)
          </Link>
        </div>
      </section>

      {/* How TripNest Works */}
      <section className="how-it-works-section">
        <div className="section-header-centered">
          <span className="eyebrow">SIMPLE 4-STEP WORKFLOW</span>
          <h2>How TripNest Makes Travel Easy</h2>
          <p>From initial inspiration to your final flight home, everything stays in sync.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-badge">1</div>
            <div className="step-emoji">📍</div>
            <h3>Pick a Destination</h3>
            <p>Browse rich destination guides and discover top tourist attractions.</p>
          </div>
          <div className="step-card">
            <div className="step-badge">2</div>
            <div className="step-emoji">📝</div>
            <h3>Create Your Trip</h3>
            <p>Set your travel dates, budget estimates, and number of companions.</p>
          </div>
          <div className="step-card">
            <div className="step-badge">3</div>
            <div className="step-emoji">🧭</div>
            <h3>Organize Days</h3>
            <p>Add day-by-day itineraries with morning, afternoon, and evening slots.</p>
          </div>
          <div className="step-card">
            <div className="step-badge">4</div>
            <div className="step-emoji">🧳</div>
            <h3>Travel & Enjoy</h3>
            <p>Access your itinerary on any device, update activities, and enjoy every moment.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="cta-banner">
        <div className="cta-content">
          <span className="cta-eyebrow">START YOUR ADVENTURE TODAY</span>
          <h2>Ready to plan your next unforgettable trip?</h2>
          <p>
            Join thousands of travelers planning stress-free getaways with TripNest.
            Free to use, fast to set up, and made for seamless travel memories.
          </p>
          <div className="cta-buttons">
            <Link to="/destinations" className="primary-btn cta-primary">
              Discover Destinations
            </Link>
            {isAuthenticated ? (
              <Link to="/dashboard" className="secondary-btn cta-secondary">
                Go to Dashboard
              </Link>
            ) : (
              <Link to="/register" className="secondary-btn cta-secondary">
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
