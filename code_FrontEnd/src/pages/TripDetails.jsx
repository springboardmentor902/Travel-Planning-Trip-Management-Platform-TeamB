import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { tripService } from "../services/tripService";
import { itineraryService } from "../services/itineraryService";
import { activityService } from "../services/activityService";

function TripDetails() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  // Core Trip State
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Itinerary & Activity State
  const [days, setDays] = useState([]);
  const [dayActivities, setDayActivities] = useState({}); // { [dayId]: [activities] }
  const [activeTab, setActiveTab] = useState("itinerary"); // "itinerary" or "overview"

  // Modals State
  const [isEditTripOpen, setIsEditTripOpen] = useState(false);
  const [isAddDayOpen, setIsAddDayOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [selectedDayForActivity, setSelectedDayForActivity] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");

  // Edit Trip Form
  const [tripForm, setTripForm] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    numberOfTravelers: 1,
    status: "PLANNED",
  });

  // Add Day Form
  const [dayForm, setDayForm] = useState({
    dayNumber: 1,
    date: "",
    title: "",
    description: "",
  });

  // Activity Form
  const [activityForm, setActivityForm] = useState({
    title: "",
    category: "SIGHTSEEING",
    startTime: "09:00",
    endTime: "11:00",
    location: "",
    description: "",
    bookingDetails: "",
    checklist: "",
  });

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const tripData = await tripService.getTripById(tripId);
        if (!isMounted) return;
        setTrip(tripData);
        setTripForm({
          title: tripData.title,
          destination: tripData.destination,
          startDate: tripData.startDate,
          endDate: tripData.endDate,
          numberOfTravelers: tripData.numberOfTravelers,
          status: tripData.status,
        });

        try {
          await itineraryService.ensureItinerary(tripId);
          const daysData = await itineraryService.getDays(tripId);
          if (!isMounted) return;
          setDays(daysData);

          const activitiesMap = {};
          for (const day of daysData) {
            try {
              const acts = await activityService.getActivitiesByDay(day.id);
              activitiesMap[day.id] = acts;
            } catch {
              activitiesMap[day.id] = [];
            }
          }
          if (isMounted) setDayActivities(activitiesMap);
        } catch (itineraryErr) {
          console.warn("Itinerary load notice:", itineraryErr.message);
        }
      } catch (err) {
        if (isMounted) setError(err.message || "Failed to load trip details");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [tripId]);

  // --- TRIP ACTIONS (Task 8) ---
  async function handleUpdateTrip(e) {
    e.preventDefault();
    setModalError("");
    setModalSubmitting(true);
    try {
      const updated = await tripService.updateTrip(tripId, tripForm);
      setTrip(updated);
      setIsEditTripOpen(false);
    } catch (err) {
      setModalError(err.message || "Failed to update trip");
    } finally {
      setModalSubmitting(false);
    }
  }

  async function handleDeleteTrip() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${trip.title}"? This will permanently delete its itinerary and all scheduled activities.`
    );
    if (!confirmed) return;

    try {
      await tripService.deleteTrip(tripId);
      navigate("/trips");
    } catch (err) {
      alert("Failed to delete trip: " + err.message);
    }
  }

  // --- ITINERARY DAY ACTIONS (Task 9) ---
  function openAddDayModal() {
    setModalError("");
    const nextDayNum = days.length + 1;

    // Auto-calculate exact date matching backend validation: startDate + (dayNumber - 1)
    let calculatedDate = trip.startDate;
    if (trip.startDate) {
      const start = new Date(trip.startDate);
      start.setDate(start.getDate() + (nextDayNum - 1));
      calculatedDate = start.toISOString().split("T")[0];
    }

    setDayForm({
      dayNumber: nextDayNum,
      date: calculatedDate,
      title: `Day ${nextDayNum} Exploration`,
      description: "",
    });
    setIsAddDayOpen(true);
  }

  async function handleAddDay(e) {
    e.preventDefault();
    setModalError("");
    setModalSubmitting(true);
    try {
      const newDay = await itineraryService.addDay(tripId, dayForm);
      setDays((prev) => [...prev, newDay]);
      setDayActivities((prev) => ({ ...prev, [newDay.id]: [] }));
      setIsAddDayOpen(false);
    } catch (err) {
      setModalError(err.message || "Failed to add itinerary day");
    } finally {
      setModalSubmitting(false);
    }
  }

  async function handleDeleteDay(dayId) {
    if (!window.confirm("Delete this day and all its scheduled activities?"))
      return;
    try {
      await itineraryService.deleteDay(tripId, dayId);
      setDays((prev) => prev.filter((d) => d.id !== dayId));
      setDayActivities((prev) => {
        const copy = { ...prev };
        delete copy[dayId];
        return copy;
      });
    } catch (err) {
      alert("Failed to delete day: " + err.message);
    }
  }

  // --- ACTIVITY ACTIONS (Task 10) ---
  function openAddActivityModal(day) {
    setSelectedDayForActivity(day);
    setEditingActivity(null);
    setActivityForm({
      title: "",
      category: "SIGHTSEEING",
      startTime: "09:00",
      endTime: "11:00",
      location: "",
      description: "",
      bookingDetails: "",
      checklist: "",
    });
    setModalError("");
    setIsActivityModalOpen(true);
  }

  function openEditActivityModal(day, activity) {
    setSelectedDayForActivity(day);
    setEditingActivity(activity);
    setActivityForm({
      title: activity.title,
      category: activity.category || "SIGHTSEEING",
      startTime: activity.startTime ? activity.startTime.slice(0, 5) : "09:00",
      endTime: activity.endTime ? activity.endTime.slice(0, 5) : "11:00",
      location: activity.location || "",
      description: activity.description || "",
      bookingDetails: activity.bookingDetails || "",
      checklist: activity.checklist || "",
    });
    setModalError("");
    setIsActivityModalOpen(true);
  }

  async function handleSaveActivity(e) {
    e.preventDefault();
    setModalError("");

    if (!activityForm.title.trim()) {
      setModalError("Activity title is required.");
      return;
    }

    setModalSubmitting(true);
    try {
      // Backend expects HH:mm:ss for LocalTime
      const formattedStartTime = activityForm.startTime.length === 5
        ? `${activityForm.startTime}:00`
        : activityForm.startTime;
      const formattedEndTime = activityForm.endTime.length === 5
        ? `${activityForm.endTime}:00`
        : activityForm.endTime;

      const payload = {
        title: activityForm.title,
        category: activityForm.category,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        location: activityForm.location,
        description: activityForm.description,
        bookingDetails: activityForm.bookingDetails,
        checklist: activityForm.checklist,
        itineraryDayId: selectedDayForActivity.id,
      };

      if (editingActivity) {
        // Update
        const updated = await activityService.updateActivity(
          editingActivity.id,
          payload
        );
        setDayActivities((prev) => ({
          ...prev,
          [selectedDayForActivity.id]: prev[selectedDayForActivity.id].map(
            (act) => (act.id === updated.id ? updated : act)
          ),
        }));
      } else {
        // Create
        const created = await activityService.createActivity(payload);
        setDayActivities((prev) => ({
          ...prev,
          [selectedDayForActivity.id]: [
            ...(prev[selectedDayForActivity.id] || []),
            created,
          ],
        }));
      }

      setIsActivityModalOpen(false);
    } catch (err) {
      setModalError(err.message || "Failed to save activity");
    } finally {
      setModalSubmitting(false);
    }
  }

  async function handleDeleteActivity(dayId, activityId) {
    if (!window.confirm("Remove this activity?")) return;
    try {
      await activityService.deleteActivity(activityId);
      setDayActivities((prev) => ({
        ...prev,
        [dayId]: prev[dayId].filter((act) => act.id !== activityId),
      }));
    } catch (err) {
      alert("Failed to delete activity: " + err.message);
    }
  }

  // Category Icon Helper
  const categoryIcons = {
    SIGHTSEEING: "🏛️ Sightseeing",
    TRANSPORTATION: "🚗 Transportation",
    ACCOMMODATION: "🏨 Accommodation",
    DINING: "🍽️ Dining & Food",
    ADVENTURE: "🏄‍♂️ Adventure",
    SHOPPING: "🛍️ Shopping",
  };

  if (loading) {
    return (
      <div className="content-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="content-page">
        <div className="message error">
          <span>⚠️ {error || "Trip not found."}</span>
        </div>
        <Link to="/trips" className="text-link">
          ← Back to Trips
        </Link>
      </div>
    );
  }

  return (
    <div className="content-page trip-details-page">
      {/* Navigation Breadcrumb */}
      <div className="trip-nav-breadcrumb">
        <Link to="/trips" className="text-link">
          ← Back to My Trips
        </Link>
      </div>

      {/* Hero Trip Banner & Header */}
      <section className="trip-hero-banner">
        <div className="trip-hero-main">
          <div className="trip-title-row">
            <span className={`status-pill ${trip.status.toLowerCase()}`}>
              {trip.status}
            </span>
            <h1>{trip.title}</h1>
          </div>

          <p className="trip-hero-destination">
            📍 <strong>{trip.destination}</strong>
          </p>

          <div className="trip-quick-stats">
            <div className="stat-pill">
              📅 {trip.startDate} to {trip.endDate}
            </div>
            <div className="stat-pill">
              👥 {trip.numberOfTravelers}{" "}
              {trip.numberOfTravelers === 1 ? "Traveler" : "Travelers"}
            </div>
            <div className="stat-pill">
              🗓️ {days.length} {days.length === 1 ? "Day Planned" : "Days Planned"}
            </div>
          </div>
        </div>

        {/* Edit / Delete Trip Controls */}
        <div className="trip-hero-actions">
          <button
            className="secondary-btn"
            onClick={() => setIsEditTripOpen(true)}
          >
            ✎ Edit Trip
          </button>
          <button
            className="outline-btn delete-btn"
            onClick={handleDeleteTrip}
          >
            🗑 Delete Trip
          </button>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="trip-tabs">
        <button
          className={`tab-btn ${activeTab === "itinerary" ? "active" : ""}`}
          onClick={() => setActiveTab("itinerary")}
        >
          🗓️ Day-wise Itinerary ({days.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          ℹ️ Trip Overview & Notes
        </button>
      </div>

      {/* TAB CONTENT 1: ITINERARY & ACTIVITIES (Tasks 9 & 10) */}
      {activeTab === "itinerary" && (
        <section className="itinerary-section">
          <div className="itinerary-header">
            <div>
              <h2>Day-by-Day Schedule</h2>
              <p>
                Organize places to visit, restaurants, travel times, and daily schedules.
              </p>
            </div>
            <button className="primary-btn" onClick={openAddDayModal}>
              + Add Day {days.length + 1}
            </button>
          </div>

          {days.length === 0 ? (
            <div className="empty-itinerary-card">
              <span className="empty-icon">🗓️</span>
              <h3>No itinerary days yet</h3>
              <p>
                Start building your vacation by adding Day 1. The date will be
                automatically synced with your trip start date ({trip.startDate}).
              </p>
              <button className="primary-btn" onClick={openAddDayModal}>
                + Add Day 1
              </button>
            </div>
          ) : (
            <div className="days-timeline">
              {days.map((day) => {
                const activities = dayActivities[day.id] || [];
                return (
                  <div key={day.id} className="itinerary-day-card">
                    <div className="day-card-header">
                      <div className="day-badge-title">
                        <span className="day-number-badge">Day {day.dayNumber}</span>
                        <div>
                          <h3>{day.title}</h3>
                          <span className="day-date-label">📅 {day.date}</span>
                        </div>
                      </div>

                      <div className="day-header-actions">
                        <button
                          className="small-btn add-act-btn"
                          onClick={() => openAddActivityModal(day)}
                        >
                          + Add Activity
                        </button>
                        <button
                          className="icon-btn delete-day-btn"
                          title="Delete Day"
                          onClick={() => handleDeleteDay(day.id)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {day.description && (
                      <p className="day-description">{day.description}</p>
                    )}

                    {/* Scheduled Activities List */}
                    <div className="activities-container">
                      {activities.length === 0 ? (
                        <div className="no-activities-box">
                          <p>No activities scheduled for this day yet.</p>
                          <button
                            className="text-link"
                            onClick={() => openAddActivityModal(day)}
                          >
                            + Schedule an activity (Sightseeing, Food, etc.)
                          </button>
                        </div>
                      ) : (
                        <div className="activities-list">
                          {activities.map((act) => (
                            <div key={act.id} className="activity-card">
                              <div className="activity-left">
                                <span
                                  className={`category-badge ${act.category?.toLowerCase()}`}
                                >
                                  {categoryIcons[act.category] || act.category}
                                </span>

                                <div className="activity-main-info">
                                  <h4>{act.title}</h4>
                                  {act.location && (
                                    <span className="activity-location">
                                      📍 {act.location}
                                    </span>
                                  )}
                                  {act.description && (
                                    <p className="activity-notes">
                                      {act.description}
                                    </p>
                                  )}
                                  {act.bookingDetails && (
                                    <div className="booking-info-box">
                                      🎫 <strong>Booking:</strong>{" "}
                                      {act.bookingDetails}
                                    </div>
                                  )}
                                  {act.checklist && (
                                    <div className="checklist-box">
                                      ✓ <strong>Notes / Checklist:</strong>{" "}
                                      {act.checklist}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="activity-right">
                                {act.startTime && (
                                  <div className="time-chip">
                                    ⏰ {act.startTime.slice(0, 5)}
                                    {act.endTime && ` – ${act.endTime.slice(0, 5)}`}
                                  </div>
                                )}
                                <div className="activity-actions">
                                  <button
                                    className="icon-action-btn"
                                    title="Edit Activity"
                                    onClick={() =>
                                      openEditActivityModal(day, act)
                                    }
                                  >
                                    ✎
                                  </button>
                                  <button
                                    className="icon-action-btn delete"
                                    title="Delete Activity"
                                    onClick={() =>
                                      handleDeleteActivity(day.id, act.id)
                                    }
                                  >
                                    🗑
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* TAB CONTENT 2: TRIP OVERVIEW */}
      {activeTab === "overview" && (
        <section className="trip-overview-section">
          <div className="overview-card">
            <h3>Vacation Summary</h3>
            <div className="overview-grid">
              <div>
                <strong>Destination</strong>
                <p>{trip.destination}</p>
              </div>
              <div>
                <strong>Trip Status</strong>
                <p>{trip.status}</p>
              </div>
              <div>
                <strong>Travel Dates</strong>
                <p>
                  {trip.startDate} to {trip.endDate}
                </p>
              </div>
              <div>
                <strong>Travelers</strong>
                <p>{trip.numberOfTravelers} People</p>
              </div>
              <div>
                <strong>Itinerary Days</strong>
                <p>{days.length} Days Configured</p>
              </div>
              <div>
                <strong>Total Scheduled Activities</strong>
                <p>
                  {Object.values(dayActivities).reduce(
                    (acc, curr) => acc + curr.length,
                    0
                  )}{" "}
                  Activities
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- MODAL 1: EDIT TRIP MODAL --- */}
      {isEditTripOpen && (
        <div className="modal-overlay" onClick={() => setIsEditTripOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Edit Trip Details</h2>
              <button
                className="close-modal-btn"
                onClick={() => setIsEditTripOpen(false)}
              >
                ✕
              </button>
            </div>

            {modalError && <div className="message error">{modalError}</div>}

            <form onSubmit={handleUpdateTrip} className="trip-form">
              <label>
                Trip Title *
                <input
                  type="text"
                  value={tripForm.title}
                  onChange={(e) =>
                    setTripForm({ ...tripForm, title: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                Destination *
                <input
                  type="text"
                  value={tripForm.destination}
                  onChange={(e) =>
                    setTripForm({ ...tripForm, destination: e.target.value })
                  }
                  required
                />
              </label>

              <div className="form-row">
                <label>
                  Start Date *
                  <input
                    type="date"
                    value={tripForm.startDate}
                    onChange={(e) =>
                      setTripForm({ ...tripForm, startDate: e.target.value })
                    }
                    required
                  />
                </label>

                <label>
                  End Date *
                  <input
                    type="date"
                    value={tripForm.endDate}
                    onChange={(e) =>
                      setTripForm({ ...tripForm, endDate: e.target.value })
                    }
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Travelers
                  <input
                    type="number"
                    min="1"
                    value={tripForm.numberOfTravelers}
                    onChange={(e) =>
                      setTripForm({
                        ...tripForm,
                        numberOfTravelers: Number(e.target.value),
                      })
                    }
                    required
                  />
                </label>

                <label>
                  Status
                  <select
                    value={tripForm.status}
                    onChange={(e) =>
                      setTripForm({ ...tripForm, status: e.target.value })
                    }
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
                  onClick={() => setIsEditTripOpen(false)}
                  disabled={modalSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-btn"
                  disabled={modalSubmitting}
                >
                  {modalSubmitting ? "Saving..." : "Update Trip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: ADD ITINERARY DAY MODAL --- */}
      {isAddDayOpen && (
        <div className="modal-overlay" onClick={() => setIsAddDayOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Add Itinerary Day</h2>
              <button
                className="close-modal-btn"
                onClick={() => setIsAddDayOpen(false)}
              >
                ✕
              </button>
            </div>

            {modalError && <div className="message error">{modalError}</div>}

            <form onSubmit={handleAddDay} className="trip-form">
              <div className="form-row">
                <label>
                  Day Number *
                  <input
                    type="number"
                    min="1"
                    value={dayForm.dayNumber}
                    readOnly
                    className="readonly-input"
                  />
                </label>

                <label>
                  Date *
                  <input
                    type="date"
                    value={dayForm.date}
                    readOnly
                    className="readonly-input"
                    title="Automatically aligned with trip schedule"
                  />
                </label>
              </div>

              <label>
                Day Title / Focus *
                <input
                  type="text"
                  placeholder="e.g., Beach Exploration & Sunset Walk"
                  value={dayForm.title}
                  onChange={(e) =>
                    setDayForm({ ...dayForm, title: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                Description & Notes
                <textarea
                  placeholder="Key notes, reminders, or general plan for this day..."
                  rows="3"
                  value={dayForm.description}
                  onChange={(e) =>
                    setDayForm({ ...dayForm, description: e.target.value })
                  }
                />
              </label>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setIsAddDayOpen(false)}
                  disabled={modalSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-btn"
                  disabled={modalSubmitting}
                >
                  {modalSubmitting ? "Adding..." : "Add to Itinerary"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: ADD / EDIT ACTIVITY MODAL --- */}
      {isActivityModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsActivityModalOpen(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>
                {editingActivity ? "Edit Activity" : "Schedule New Activity"}
              </h2>
              <button
                className="close-modal-btn"
                onClick={() => setIsActivityModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {modalError && <div className="message error">{modalError}</div>}

            <form onSubmit={handleSaveActivity} className="trip-form">
              <label>
                Activity Title *
                <input
                  type="text"
                  placeholder="e.g., Visit Fort Aguada, Lunch at Cafe, Scuba Diving"
                  value={activityForm.title}
                  onChange={(e) =>
                    setActivityForm({ ...activityForm, title: e.target.value })
                  }
                  required
                />
              </label>

              <div className="form-row">
                <label>
                  Category
                  <select
                    value={activityForm.category}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="SIGHTSEEING">🏛️ Sightseeing</option>
                    <option value="DINING">🍽️ Dining & Food</option>
                    <option value="TRANSPORTATION">🚗 Transportation</option>
                    <option value="ACCOMMODATION">🏨 Accommodation</option>
                    <option value="ADVENTURE">🏄‍♂️ Adventure</option>
                    <option value="SHOPPING">🛍️ Shopping</option>
                  </select>
                </label>

                <label>
                  Location / Address
                  <input
                    type="text"
                    placeholder="e.g., Old Goa, Candolim Beach"
                    value={activityForm.location}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
                        location: e.target.value,
                      })
                    }
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Start Time
                  <input
                    type="time"
                    value={activityForm.startTime}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
                        startTime: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  End Time
                  <input
                    type="time"
                    value={activityForm.endTime}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
                        endTime: e.target.value,
                      })
                    }
                  />
                </label>
              </div>

              <label>
                Description & Notes
                <textarea
                  placeholder="Brief details about what to do, what to expect..."
                  rows="2"
                  value={activityForm.description}
                  onChange={(e) =>
                    setActivityForm({
                      ...activityForm,
                      description: e.target.value,
                    })
                  }
                />
              </label>

              <div className="form-row">
                <label>
                  Booking / Ticket Details
                  <input
                    type="text"
                    placeholder="e.g., Ticket #AB123, table reserved at 7:30"
                    value={activityForm.bookingDetails}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
                        bookingDetails: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Checklist / What to bring
                  <input
                    type="text"
                    placeholder="e.g., Camera, Sunscreen, ID proof"
                    value={activityForm.checklist}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
                        checklist: e.target.value,
                      })
                    }
                  />
                </label>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setIsActivityModalOpen(false)}
                  disabled={modalSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-btn"
                  disabled={modalSubmitting}
                >
                  {modalSubmitting
                    ? "Saving..."
                    : editingActivity
                    ? "Save Changes"
                    : "Schedule Activity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TripDetails;
