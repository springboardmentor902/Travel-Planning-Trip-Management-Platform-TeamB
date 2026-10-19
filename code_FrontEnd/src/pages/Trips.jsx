import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tripService } from "../services/tripService";

function Trips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    numberOfTravelers: 1,
    status: "PLANNED",
  });

  useEffect(() => {
    loadTrips();
  }, []);

  async function loadTrips() {
    setLoading(true);
    setError("");
    try {
      const data = await tripService.getMyTrips();
      setTrips(data);
    } catch (err) {
      setError(err.message || "Failed to load trips");
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numberOfTravelers" ? Number(value) : value,
    }));
  }

  async function handleCreateTrip(e) {
    e.preventDefault();
    setFormError("");

    // Client validations
    if (!formData.title.trim()) {
      setFormError("Trip title is required.");
      return;
    }
    if (!formData.destination.trim()) {
      setFormError("Destination is required.");
      return;
    }
    if (!formData.startDate) {
      setFormError("Start date is required.");
      return;
    }
    if (!formData.endDate) {
      setFormError("End date is required.");
      return;
    }
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setFormError("End date cannot be earlier than start date.");
      return;
    }
    if (formData.numberOfTravelers < 1) {
      setFormError("At least 1 traveler is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newTrip = await tripService.createTrip(formData);
      setTrips((prev) => [newTrip, ...prev]);
      setIsModalOpen(false);
      // Reset form
      setFormData({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
        numberOfTravelers: 1,
        status: "PLANNED",
      });
      // Navigate directly to the new trip's details and itinerary
      navigate(`/trips/${newTrip.id}`);
    } catch (err) {
      setFormError(err.message || "Failed to create trip.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Filter trips by status and search
  const filteredTrips = trips.filter((trip) => {
    const matchesStatus =
      statusFilter === "ALL" || trip.status === statusFilter;
    const matchesSearch =
      trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate duration in days
  function calculateDays(start, end) {
    if (!start || !end) return 1;
    const diffTime = Math.abs(new Date(end) - new Date(start));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }

  return (
    <div className="content-page trips-page">
      {/* Page Heading & Action */}
      <section className="trips-header-section">
        <div>
          <span className="eyebrow">TRAVEL BLUEPRINTS</span>
          <h1>My Trips</h1>
          <p>Organize, schedule, and view all your planned adventures.</p>
        </div>

        <button
          className="primary-btn add-trip-btn"
          onClick={() => setIsModalOpen(true)}
        >
          + Plan a New Trip
        </button>
      </section>

      {/* Filter and Search Bar */}
      <div className="trips-toolbar">
        <div className="status-filter-group">
          {["ALL", "PLANNED", "ONGOING", "COMPLETED", "CANCELLED"].map(
            (status) => (
              <button
                key={status}
                className={`filter-chip ${
                  statusFilter === status ? "active" : ""
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            )
          )}
        </div>

        <div className="trip-search-box">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search by trip or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="message error">
          <span>⚠️ {error}</span>
          <button className="small-link-btn" onClick={loadTrips}>
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your trips...</p>
        </div>
      ) : filteredTrips.length === 0 ? (
        /* Empty State */
        <div className="empty-trips-card">
          <span className="empty-icon">🗺️</span>
          <h2>No trips found</h2>
          <p>
            {searchTerm || statusFilter !== "ALL"
              ? "No trips match your current filter or search criteria."
              : "You haven't created any trips yet. Start planning your next journey today!"}
          </p>
          <button
            className="primary-btn"
            onClick={() => setIsModalOpen(true)}
          >
            + Create Your First Trip
          </button>
        </div>
      ) : (
        /* Trip Cards Grid */
        <div className="trips-grid">
          {filteredTrips.map((trip) => {
            const days = calculateDays(trip.startDate, trip.endDate);
            return (
              <div key={trip.id} className="trip-summary-card">
                <div className="trip-card-header">
                  <span className={`status-pill ${trip.status.toLowerCase()}`}>
                    {trip.status}
                  </span>
                  <span className="duration-tag">{days} {days === 1 ? "Day" : "Days"}</span>
                </div>

                <h3 className="trip-card-title">{trip.title}</h3>

                <p className="trip-destination">
                  📍 <strong>{trip.destination}</strong>
                </p>

                <div className="trip-meta-info">
                  <div className="meta-item">
                    <span className="meta-label">DATES</span>
                    <span>
                      {trip.startDate} → {trip.endDate}
                    </span>
                  </div>

                  <div className="meta-item">
                    <span className="meta-label">TRAVELERS</span>
                    <span>👥 {trip.numberOfTravelers}</span>
                  </div>
                </div>

                <div className="trip-card-actions">
                  <Link
                    to={`/trips/${trip.id}`}
                    className="primary-btn full-btn"
                  >
                    View Details & Itinerary →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Trip Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Plan a New Trip</h2>
              <button
                className="close-modal-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {formError && <div className="message error">{formError}</div>}

            <form onSubmit={handleCreateTrip} className="trip-form">
              <label>
                Trip Title *
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Summer in Goa, Parisian Getaway"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Destination *
                <input
                  type="text"
                  name="destination"
                  placeholder="e.g., Goa, Paris, Tokyo, Manali"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <div className="form-row">
                <label>
                  Start Date *
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <label>
                  End Date *
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Number of Travelers *
                  <input
                    type="number"
                    name="numberOfTravelers"
                    min="1"
                    value={formData.numberOfTravelers}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <label>
                  Initial Status
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="PLANNED">Planned</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </label>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Save Trip & Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Trips;
