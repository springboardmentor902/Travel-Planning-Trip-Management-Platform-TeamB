
import { useState } from "react";
import "../index.css";

const initialData = [
  {
    id: 1,
    icon: "✈️",
    color: "lavender",
    title: "Your Goa adventure is almost here!",
    message: "Your trip begins in 3 days. Review your itinerary and get ready for your adventure.",
    category: "Trip reminder",
    time: "10 min ago",
    read: false,
  },
  {
    id: 2,
    icon: "🏨",
    color: "mint",
    title: "Hotel booking confirmed",
    message: "Your accommodation in Goa has been confirmed. Your booking details are ready.",
    category: "Booking",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    icon: "👥",
    color: "pink",
    title: "A new traveler joined your group",
    message: "A new member joined your shared trip. Your travel group is growing!",
    category: "Group activity",
    time: "3 hours ago",
    read: false,
  },
  {
    id: 4,
    icon: "🎫",
    color: "peach",
    title: "Keep your travel documents ready",
    message: "Remember to keep your tickets and identification documents ready before departure.",
    category: "Reminder",
    time: "Yesterday",
    read: true,
  },
  {
    id: 5,
    icon: "🎉",
    color: "sky",
    title: "Welcome to TripNest!",
    message: "Your travel planning space is ready. Start organizing your next adventure.",
    category: "TripNest news",
    time: "Yesterday",
    read: true,
  },
];

const filters = ["All", "Unread", "Trips", "Reminders", "Groups"];

export default function NotificationCenter() {
  const [items, setItems] = useState(initialData);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const unread = items.filter((item) => !item.read).length;

  const visibleItems = items.filter((item) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Unread" && !item.read) ||
      (filter === "Trips" &&
        ["Trip reminder", "Booking"].includes(item.category)) ||
      (filter === "Reminders" &&
        ["Reminder", "Trip reminder"].includes(item.category)) ||
      (filter === "Groups" && item.category === "Group activity");

    const text =
      `${item.title} ${item.message} ${item.category}`.toLowerCase();

    return matchesFilter && text.includes(search.toLowerCase());
  });

  const markRead = (id) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllRead = () => {
    setItems((current) =>
      current.map((item) => ({ ...item, read: true }))
    );
  };

  const removeNotification = (id) => {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <main className="tn-notifications">
      <div className="tn-notification-wrap">
        <header className="tn-notification-hero">
          <div className="tn-hero-copy">
            <span className="tn-overline">YOUR TRAVEL COMPANION</span>
            <h1>Stay in the loop<span>.</span></h1>
            <p>
              Your journeys, reminders and travel group updates —
              all in one place.
            </p>
          </div>

          <div className="tn-hero-illustration" aria-hidden="true">
            <span className="tn-sparkle">✦</span>
            <div className="tn-hero-bell">🔔</div>
            <span className="tn-orbit-dot" />
          </div>
        </header>

        <section className="tn-stat-grid">
          <article className="tn-stat-card">
            <div className="tn-stat-icon tn-purple">▤</div>
            <div>
              <span>Total notifications</span>
              <strong>{items.length}</strong>
              <small>Updates in your inbox</small>
            </div>
          </article>

          <article className="tn-stat-card">
            <div className="tn-stat-icon tn-orange">✉</div>
            <div>
              <span>Unread notifications</span>
              <strong>{unread}</strong>
              <small>{unread ? "Waiting for your attention" : "All caught up!"}</small>
            </div>
          </article>

          <article className="tn-stat-card">
            <div className="tn-stat-icon tn-green">✓</div>
            <div>
              <span>Read notifications</span>
              <strong>{items.length - unread}</strong>
              <small>Already checked</small>
            </div>
          </article>
        </section>

        <section className="tn-inbox">
          <div className="tn-inbox-heading">
            <div>
              <div className="tn-heading-line">
                <h2>Your inbox</h2>
                {unread > 0 && (
                  <span className="tn-count">{unread} new</span>
                )}
              </div>
              <p>Important moments deserve your attention.</p>
            </div>

            {unread > 0 && (
              <button className="tn-text-action" onClick={markAllRead}>
                ✓ Mark all as read
              </button>
            )}
          </div>

          <div className="tn-toolbar">
            <div className="tn-filter-list">
              {filters.map((name) => (
                <button
                  key={name}
                  className={`tn-filter ${filter === name ? "selected" : ""}`}
                  onClick={() => setFilter(name)}
                >
                  {name}
                  {name === "Unread" && unread > 0 && (
                    <span className="tn-filter-number">{unread}</span>
                  )}
                </button>
              ))}
            </div>

            <label className="tn-search">
              <span>⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search notifications..."
                aria-label="Search notifications"
              />
            </label>
          </div>

          <div className="tn-list-heading">
            <span>RECENT ACTIVITY</span>
            <span>{visibleItems.length} notifications</span>
          </div>

          <div className="tn-notification-list">
            {visibleItems.length === 0 ? (
              <div className="tn-empty">
                <div>✦</div>
                <h3>No notifications found</h3>
                <p>Try changing the filter or search term.</p>
              </div>
            ) : (
              visibleItems.map((item) => (
                <article
                  key={item.id}
                  className={`tn-notification-row ${
                    !item.read ? "is-unread" : ""
                  }`}
                >
                  <div className={`tn-row-icon ${item.color}`}>
                    {item.icon}
                  </div>

                  <div className="tn-row-body">
                    <div className="tn-row-title">
                      <h3>{item.title}</h3>
                      {!item.read && <span className="tn-new-dot" />}
                    </div>

                    <p>{item.message}</p>

                    <div className="tn-row-meta">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </div>
                  </div>

                  <div className="tn-row-actions">
                    {!item.read && (
                      <button onClick={() => markRead(item.id)}>
                        Mark read
                      </button>
                    )}
                    <button
                      className="tn-dismiss"
                      onClick={() => removeNotification(item.id)}
                      aria-label={`Remove ${item.title}`}
                      title="Remove notification"
                    >
                      ×
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>

          <footer className="tn-inbox-footer">
            <span>✦ Making every journey count</span>
            <span>TripNest · Notification Center</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
