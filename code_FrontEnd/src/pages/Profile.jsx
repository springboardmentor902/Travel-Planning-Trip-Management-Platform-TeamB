
import "./Profile.css";

function Profile() {
  return (
    <div className="profile-page">

      {/* Profile Hero */}
      <section className="profile-hero">

        <div className="cover-pattern"></div>

        <div className="profile-main">
          <div className="large-avatar">
            AT
          </div>

          <div className="profile-identity">
            <div className="name-row">
              <h1>Alex Traveler</h1>
              <span className="verified">✓ Verified</span>
            </div>

            <p className="email">
              alex@example.com
            </p>

            <p className="location">
              📍 India · Exploring the world one trip at a time
            </p>
          </div>

          <button className="edit-profile-btn">
            ✎ Edit Profile
          </button>
        </div>

      </section>


      {/* Stats */}
      <section className="stats-grid">

        <div className="stat-box">
          <span className="stat-icon">🌍</span>
          <div>
            <h2>8</h2>
            <p>Countries Visited</p>
          </div>
        </div>

        <div className="stat-box">
          <span className="stat-icon">✈️</span>
          <div>
            <h2>12</h2>
            <p>Trips Planned</p>
          </div>
        </div>

        <div className="stat-box">
          <span className="stat-icon">❤️</span>
          <div>
            <h2>24</h2>
            <p>Saved Places</p>
          </div>
        </div>

        <div className="stat-box">
          <span className="stat-icon">⭐</span>
          <div>
            <h2>4.8</h2>
            <p>Traveler Rating</p>
          </div>
        </div>

      </section>


      {/* Main Content */}
      <div className="profile-layout">

        {/* Left */}
        <div>

          <section className="profile-section">
            <div className="section-heading">
              <div>
                <h2>About Me</h2>
                <p>Tell fellow travelers a little about yourself.</p>
              </div>
            </div>

            <p className="about-text">
              Passionate traveler who loves discovering new destinations,
              exploring local culture and creating memorable experiences.
              Always looking for the next adventure.
            </p>
          </section>


          <section className="profile-section">

            <div className="section-heading">
              <div>
                <h2>Travel Preferences</h2>
                <p>Your travel personality and interests</p>
              </div>

              <button className="small-edit">
                Edit
              </button>
            </div>

            <div className="preference-group">

              <div className="preference-item">
                <span className="preference-icon">🏔️</span>
                <div>
                  <small>Travel Style</small>
                  <strong>Adventure & Exploration</strong>
                </div>
              </div>

              <div className="preference-item">
                <span className="preference-icon">💰</span>
                <div>
                  <small>Budget</small>
                  <strong>Budget Friendly</strong>
                </div>
              </div>

              <div className="preference-item">
                <span className="preference-icon">🏖️</span>
                <div>
                  <small>Favorite Experience</small>
                  <strong>Beaches & Nature</strong>
                </div>
              </div>

            </div>

            <div className="interest-tags">
              <span>🏔️ Hiking</span>
              <span>📸 Photography</span>
              <span>🍜 Food</span>
              <span>🏖️ Beaches</span>
              <span>🏛️ Culture</span>
            </div>

          </section>

        </div>


        {/* Right */}
        <div>

          <section className="profile-section">

            <div className="section-heading">
              <div>
                <h2>Recent Trips</h2>
                <p>Your latest adventures</p>
              </div>
            </div>

            <div className="trip-card">
              <div className="trip-image paris">
                🇫🇷
              </div>

              <div className="trip-info">
                <h3>Paris, France</h3>
                <p>5 days · May 2026</p>
                <span>Completed</span>
              </div>
            </div>

            <div className="trip-card">
              <div className="trip-image japan">
                🇯🇵
              </div>

              <div className="trip-info">
                <h3>Tokyo, Japan</h3>
                <p>7 days · March 2026</p>
                <span>Completed</span>
              </div>
            </div>

            <div className="trip-card">
              <div className="trip-image goa">
                🇮🇳
              </div>

              <div className="trip-info">
                <h3>Goa, India</h3>
                <p>4 days · January 2026</p>
                <span>Completed</span>
              </div>
            </div>

          </section>


          <section className="profile-section travel-level">

            <div className="level-icon">
              🧭
            </div>

            <div>
              <p>TRAVELER LEVEL</p>
              <h2>Explorer</h2>
              <span>You've unlocked 72% of the Explorer journey.</span>

              <div className="progress">
                <div></div>
              </div>
            </div>

          </section>

        </div>

      </div>

    </div>
  );
}

export default Profile;


// -----------------------
// function Profile() {
//   return (
//     <div>
//       <h1>My Profile 👤</h1>

//       <p><strong>Name:</strong> TripNest User</p>
//       <p><strong>Email:</strong> Logged-in user</p>
//       <p><strong>Travel Style:</strong> Adventure</p>
//       <p><strong>Favorite Destination:</strong> Paris</p>
//     </div>
//   );
// }

// export default Profile;