import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { destinationService } from "../services/destinationService";

function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const destData = await destinationService.getDestinationById(id);
        if (!isMounted) return;
        setDestination(destData);

        try {
          const attrData = await destinationService.getAttractionsByDestination(id);
          if (isMounted) setAttractions(attrData);
        } catch {
          if (isMounted) setAttractions([]);
        }
      } catch (err) {
        if (isMounted) setError(err.message || "Failed to load destination details.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const defaultImages = {
    // Metropolis (9)
    bangalore: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
    mumbai: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    delhi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    pune: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=1200&q=80",
    hyderabad: "https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=1200&q=80",
    chennai: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    gurgaon: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    noida: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    kolkata: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80",

    // Hill Stations (9)
    manali: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
    ooty: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    shimla: "https://images.unsplash.com/photo-1562670652-e5947bddb335?auto=format&fit=crop&w=1200&q=80",
    munnar: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    mussoorie: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    coorg: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    darjeeling: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    nainital: "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1200&q=80",
    kodaikanal: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",

    // Beaches (9)
    goa: "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=1200&q=80",
    gokarna: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    varkala: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80",
    "havelock island": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    havelock: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    puri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    kovalam: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80",
    pondicherry: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    diu: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    alibaug: "https://images.unsplash.com/photo-1520454974749-611a7248ffdb?auto=format&fit=crop&w=1200&q=80",

    // Heritage (9)
    jaipur: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    agra: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    varanasi: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80",
    hampi: "https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=1200&q=80",
    khajuraho: "https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=1200&q=80",
    udaipur: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
    amritsar: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80",
    mysore: "https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=1200&q=80",
    aurangabad: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",

    // Eco-Tourism (9)
    shillong: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    kaziranga: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80",
    sundarbans: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    wayanad: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    "spiti valley": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    spiti: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    "jim corbett": "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80",
    corbett: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80",
    ranthambore: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80",
    rishikesh: "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1200&q=80",
    "gir national park": "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80",
    gir: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80",
  };

  function getHeroImage() {
    if (destination?.imageUrl) return destination.imageUrl;
    const key = destination?.name?.toLowerCase().trim();
    return (
      defaultImages[key] ||
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
    );
  }

  if (loading) {
    return (
      <div className="content-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading destination guide...</p>
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="content-page">
        <div className="message error">
          <span>⚠️ {error || "Destination not found."}</span>
        </div>
        <Link to="/destinations" className="text-link">
          ← Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="destination-details-page">
      {/* Hero Banner */}
      <div
        className="dest-hero"
        style={{ backgroundImage: `url(${getHeroImage()})` }}
      >
        <div className="dest-hero-overlay">
          <div className="dest-hero-content">
            <Link to="/destinations" className="back-link">
              ← All Destinations
            </Link>
            <span className="hero-country">{destination.country}</span>
            <h1
              className="dest-hero-title"
              style={{
                color: "#ffffff",
                textShadow: "0 3px 14px rgba(0, 0, 0, 0.85)",
                fontWeight: 900,
              }}
            >
              {destination.name}
            </h1>
            {destination.type && (
              <span className="hero-type-tag">{destination.type}</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="content-page dest-content-container">
        <div className="dest-main-grid">
          {/* Left Column: Overview & Attractions */}
          <div className="dest-left-col">
            <section className="dest-overview-card">
              <h2>About {destination.name}</h2>
              <p className="lead-text">{destination.description}</p>

              <div className="quick-info-pills">
                {destination.bestTimeToVisit && (
                  <div className="quick-pill">
                    <span className="pill-icon">🌤️</span>
                    <div>
                      <strong>Best Season</strong>
                      <p>{destination.bestTimeToVisit}</p>
                    </div>
                  </div>
                )}
                {destination.travelInformation && (
                  <div className="quick-pill">
                    <span className="pill-icon">✈️</span>
                    <div>
                      <strong>Getting Around</strong>
                      <p>{destination.travelInformation}</p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Attractions List */}
            <section className="attractions-section">
              <div className="section-header">
                <h2>Top Sights & Attractions</h2>
                <span className="badge-count">
                  {attractions.length} Must-See Spots
                </span>
              </div>

              {attractions.length === 0 ? (
                <div className="empty-state-small">
                  <p>No attractions listed for this destination yet.</p>
                </div>
              ) : (
                <div className="attractions-grid">
                  {attractions.map((attraction) => (
                    <article
                      key={attraction.id || attraction.name}
                      className="attraction-card"
                    >
                      <div className="attraction-body">
                        <div className="attraction-top-row">
                          <h3>{attraction.name}</h3>
                          {attraction.category && (
                            <span className="category-tag">
                              {attraction.category}
                            </span>
                          )}
                        </div>

                        {attraction.location && (
                          <div className="attraction-location">
                            📍 <span>{attraction.location}</span>
                          </div>
                        )}

                        <p className="attraction-desc">
                          {attraction.description}
                        </p>

                        <div className="attraction-footer">
                          <span className="entry-fee">
                            🎟️{" "}
                            {attraction.entryFee != null &&
                            attraction.entryFee > 0
                              ? `₹${attraction.entryFee}`
                              : "Free Entry"}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column: CTA Card */}
          <aside className="dest-right-sidebar">
            <div className="trip-cta-card">
              <span className="cta-sparkle">✈️</span>
              <h3>Ready to visit {destination.name}?</h3>
              <p>
                Start building your personalized day-wise itinerary, schedule
                activities, and invite friends.
              </p>
              <button
                className="primary-btn full-btn"
                onClick={() =>
                  navigate("/trips", {
                    state: { prefillDestination: destination.name },
                  })
                }
              >
                Plan a Trip Here →
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default DestinationDetails;
