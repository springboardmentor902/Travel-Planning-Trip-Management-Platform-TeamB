
import { Link } from "react-router-dom";

function GroupMember() {
  return (
    <div className="content-page group-page">

      {/* Welcome */}
      <section className="group-welcome">
        <div>
          <span className="eyebrow">GROUP MANAGEMENT</span>
          <h1>Welcome, Group Admin! 👋</h1>
          <p>
            Your travel group has been created successfully.
            You can now organize members, itineraries and expenses in one place.
          </p>
        </div>

        <div className="admin-badge">
          👑 Group Admin
        </div>
      </section>


      {/* Group Information */}
      <section className="group-info-card">
        <div>
          <span className="card-label">YOUR TRAVEL GROUP</span>
          <h2>Weekend Wanderers</h2>
          <p>
            A group created for planning unforgettable trips together.
          </p>
        </div>

        <div className="group-stats">
          <div>
            <strong>1</strong>
            <span>Members</span>
          </div>

          <div>
            <strong>0</strong>
            <span>Trips</span>
          </div>

          <div>
            <strong>₹0</strong>
            <span>Expenses</span>
          </div>
        </div>
      </section>


      {/* Group Actions */}
      <section className="group-section">
        <div className="section-title">
          <span className="eyebrow">GROUP ACTIONS</span>
          <h2>Manage your trip</h2>
        </div>

        <div className="group-action-grid">

          <div className="group-action-card">
            <span className="action-icon">👥</span>
            <h3>Add Members</h3>
            <p>
              Invite friends and fellow travelers to join your group.
            </p>
            <button
              className="outline-btn"
              onClick={() => alert("Member invitation feature coming soon!")}
            >
              + Add User
            </button>
          </div>


          <div className="group-action-card">
            <span className="action-icon">🗺️</span>
            <h3>Plan Itinerary</h3>
            <p>
              Create a day-wise travel plan and organize activities,
              places and schedules.
            </p>
            <button
              className="outline-btn"
              onClick={() => alert("Itinerary planning feature coming soon!")}
            >
              Plan Itinerary →
            </button>
          </div>


          <div className="group-action-card">
            <span className="action-icon">💰</span>
            <h3>Manage Expenses</h3>
            <p>
              Track shared expenses and keep everyone's travel spending
              organized.
            </p>
            <button
              className="outline-btn"
              onClick={() => alert("Expense management feature coming soon!")}
            >
              Add Expense →
            </button>
          </div>


          <div className="group-action-card">
            <span className="action-icon">📄</span>
            <h3>Trip Documents</h3>
            <p>
              Keep important travel documents and booking information
              organized for the group.
            </p>
            <button
              className="outline-btn"
              onClick={() => alert("Document management feature coming soon!")}
            >
              Manage Documents →
            </button>
          </div>

        </div>
      </section>


      {/* Members */}
      <section className="members-card">
        <div className="members-header">
          <div>
            <span className="eyebrow">GROUP MEMBERS</span>
            <h2>Travel companions</h2>
          </div>

          <button
            className="primary-btn"
            onClick={() => alert("Invite member feature coming soon!")}
          >
            + Invite Member
          </button>
        </div>

        <div className="member-row">
          <div className="member-avatar">A</div>

          <div className="member-details">
            <strong>You</strong>
            <span>Group Admin</span>
          </div>

          <span className="status-pill">Admin</span>
        </div>
      </section>


      {/* Back */}
      <Link to="/dashboard" className="text-link group-back">
        ← Back to Dashboard
      </Link>

    </div>
  );
}

export default GroupMember;

