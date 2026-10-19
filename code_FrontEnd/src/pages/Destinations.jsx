import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { destinationService } from "../services/destinationService";

// Verified high-definition Unsplash photography for all 45 destinations
const defaultImages = {
  // Metropolis (9)
  bangalore: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
  mumbai: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
  delhi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
  pune: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
  hyderabad: "https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=800&q=80",
  chennai: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
  gurgaon: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  noida: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
  kolkata: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80",

  // Hill Stations (9)
  manali: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
  ooty: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
  shimla: "https://images.unsplash.com/photo-1562670652-e5947bddb335?auto=format&fit=crop&w=800&q=80",
  munnar: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
  mussoorie: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
  coorg: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
  darjeeling: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
  nainital: "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
  kodaikanal: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",

  // Beaches (9)
  goa: "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80",
  gokarna: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  varkala: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80",
  "havelock island": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  havelock: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  puri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  kovalam: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80",
  pondicherry: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
  diu: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  alibaug: "https://images.unsplash.com/photo-1520454974749-611a7248ffdb?auto=format&fit=crop&w=800&q=80",

  // Heritage (9)
  jaipur: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
  agra: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
  varanasi: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80",
  hampi: "https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=800&q=80",
  khajuraho: "https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=800&q=80",
  udaipur: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80",
  amritsar: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=800&q=80",
  mysore: "https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=800&q=80",
  aurangabad: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",

  // Eco-Tourism (9)
  shillong: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
  kaziranga: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80",
  sundarbans: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
  wayanad: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
  "spiti valley": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
  spiti: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
  "jim corbett": "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80",
  corbett: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80",
  ranthambore: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80",
  rishikesh: "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
  "gir national park": "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80",
  gir: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80",
};

// Curated 45 Indian destinations (9 in each category) as static fallback
const FALLBACK_DESTINATIONS = [
  // Metropolis (9)
  { id: 1, name: "Bangalore", country: "India", type: "Metropolis", bestTimeToVisit: "October to March", description: "India's vibrant tech capital known for historic palaces, botanical gardens, lively cafe culture, and craft microbreweries." },
  { id: 2, name: "Mumbai", country: "India", type: "Metropolis", bestTimeToVisit: "October to March", description: "India's dynamic commercial capital and Bollywood hub, famous for British colonial heritage, Marine Drive, and street food." },
  { id: 3, name: "Delhi", country: "India", type: "Metropolis", bestTimeToVisit: "October to March", description: "India's historic capital blending Mughal fortresses, Lutyens' grand boulevards, vibrant bazaars, and culinary trails." },
  { id: 4, name: "Pune", country: "India", type: "Metropolis", bestTimeToVisit: "July to February", description: "Maharashtra's cultural and IT metropolis nestled by the Sahyadris, famous for historic forts, colleges, and cafes." },
  { id: 5, name: "Hyderabad", country: "India", type: "Metropolis", bestTimeToVisit: "October to March", description: "The City of Pearls and Cyberabad, celebrated for Nizami architectural grandeur, world-famous biryani, and tech campuses." },
  { id: 6, name: "Chennai", country: "India", type: "Metropolis", bestTimeToVisit: "November to February", description: "Cultural gateway to South India along the Coromandel Coast, famous for Dravidian temples, Marina Beach, and Carnatic music." },
  { id: 7, name: "Gurgaon", country: "India", type: "Metropolis", bestTimeToVisit: "October to March", description: "India's Millennium City, showcasing futuristic glass skyscrapers, high-end culinary hubs, luxury malls, and corporate headquarters." },
  { id: 8, name: "Noida", country: "India", type: "Metropolis", bestTimeToVisit: "October to March", description: "Planned modern metropolis in the NCR with wide avenues, tech corporate towers, entertainment hubs, and verdant public parks." },
  { id: 9, name: "Kolkata", country: "India", type: "Metropolis", bestTimeToVisit: "October to March", description: "The City of Joy and cultural capital of India, revered for grand colonial palaces, yellow taxis, tramcars, and literary heritage." },

  // Hill Station (9)
  { id: 10, name: "Manali", country: "India", type: "Hill Station", bestTimeToVisit: "October to June", description: "Nestled along the Beas River, Manali is renowned for snow-clad peaks, cedar forests, thrilling adventure sports, and Solang Valley." },
  { id: 11, name: "Ooty", country: "India", type: "Hill Station", bestTimeToVisit: "October to June", description: "The Queen of Nilgiris, famous for sprawling tea gardens, eucalyptus groves, the UNESCO Nilgiri Mountain Railway, and tranquil lakes." },
  { id: 12, name: "Shimla", country: "India", type: "Hill Station", bestTimeToVisit: "March to June & Dec to Feb", description: "Historic colonial summer capital of British India with pedestrian Mall Road, neo-Gothic Christ Church, and snow-capped ridges." },
  { id: 13, name: "Munnar", country: "India", type: "Hill Station", bestTimeToVisit: "September to March", description: "Emerald rolling tea estates, mist-covered mountain valleys, and cascading waterfalls tucked in the Western Ghats." },
  { id: 14, name: "Mussoorie", country: "India", type: "Hill Station", bestTimeToVisit: "March to June & Dec to Feb", description: "The Queen of the Hills perched high on a ridge facing snow-capped Himalayan peaks and the lush Doon Valley." },
  { id: 15, name: "Coorg", country: "India", type: "Hill Station", bestTimeToVisit: "October to April", description: "Mist-cloaked hills, fragrant Arabica coffee estates, spice plantations, and the warm hospitality of the Kodava community." },
  { id: 16, name: "Darjeeling", country: "India", type: "Hill Station", bestTimeToVisit: "March to May & Sept to Nov", description: "The Champagne of Teas, celebrated for breathtaking golden sunrises over Mt. Kanchenjunga and heritage toy train rides." },
  { id: 17, name: "Nainital", country: "India", type: "Hill Station", bestTimeToVisit: "March to June & Sept to Nov", description: "Enchanting Himalayan lake city centered around emerald Naini Lake, enveloped by seven verdant pine and oak hills." },
  { id: 18, name: "Kodaikanal", country: "India", type: "Hill Station", bestTimeToVisit: "October to March", description: "The Princess of Hill Stations in Palani Hills with mist-covered cliffs, star-shaped lakes, and cool pine forests." },

  // Beaches (9)
  { id: 19, name: "Goa", country: "India", type: "Beaches", bestTimeToVisit: "November to February", description: "Sun-kissed beaches, coastal cuisine, Portuguese architecture, water sports, and tranquil backwaters." },
  { id: 20, name: "Gokarna", country: "India", type: "Beaches", bestTimeToVisit: "October to March", description: "Serene temple town along the Arabian Sea celebrated for pristine secluded beaches, palm cliffs, and bohemian coastal vibes." },
  { id: 21, name: "Varkala", country: "India", type: "Beaches", bestTimeToVisit: "October to March", description: "Dramatic red laterite cliffs bordering the Arabian Sea, dotted with rooftop cafes, Ayurvedic spas, and golden sands." },
  { id: 22, name: "Havelock Island", country: "India", type: "Beaches", bestTimeToVisit: "October to May", description: "Tropical paradise in Andaman & Nicobar with turquoise lagoons, powdery white sands, and world-class scuba diving." },
  { id: 23, name: "Puri", country: "India", type: "Beaches", bestTimeToVisit: "October to February", description: "Holy coastal city along the Bay of Bengal, revered for Lord Jagannath Temple, wide golden surf beaches, and sand art." },
  { id: 24, name: "Kovalam", country: "India", type: "Beaches", bestTimeToVisit: "September to March", description: "Famous crescent beach destination marked by a vintage striped lighthouse, calm shallow waters, and coconut groves." },
  { id: 25, name: "Pondicherry", country: "India", type: "Beaches", bestTimeToVisit: "October to March", description: "Charming coastal French enclave featuring cobblestone boulevards, pastel villas, golden beaches, and bohemian cafes." },
  { id: 26, name: "Diu", country: "India", type: "Beaches", bestTimeToVisit: "October to April", description: "Peaceful island off the Gujarat coast renowned for golden crescent beaches, Portuguese sea forts, and sea caves." },
  { id: 27, name: "Alibaug", country: "India", type: "Beaches", bestTimeToVisit: "November to March", description: "Coastal weekend getaway near Mumbai known for clean coconut-lined beaches, historic sea fortresses, and fresh seafood." },

  // Heritage (9)
  { id: 28, name: "Jaipur", country: "India", type: "Heritage", bestTimeToVisit: "October to March", description: "The Pink City, a UNESCO World Heritage gem adorned with hilltop fortresses, royal Rajput palaces, and colorful bazaars." },
  { id: 29, name: "Agra", country: "India", type: "Heritage", bestTimeToVisit: "October to March", description: "Immortal Mughal capital on the banks of Yamuna, home to the Taj Mahal—the world's most famous monument of love." },
  { id: 30, name: "Varanasi", country: "India", type: "Heritage", bestTimeToVisit: "October to March", description: "One of the world's oldest continuously inhabited cities, revered for sacred Ganges ghats, temples, and evening aartis." },
  { id: 31, name: "Hampi", country: "India", type: "Heritage", bestTimeToVisit: "October to March", description: "Surreal UNESCO World Heritage ruins of Vijayanagara Empire strewn across a landscape of giant boulders and rivers." },
  { id: 32, name: "Khajuraho", country: "India", type: "Heritage", bestTimeToVisit: "October to March", description: "UNESCO World Heritage temple group acclaimed for exquisite Nagara-style architecture and intricate stone carvings." },
  { id: 33, name: "Udaipur", country: "India", type: "Heritage", bestTimeToVisit: "October to March", description: "The City of Lakes and Venice of the East, surrounded by the Aravalli Hills with floating royal marble palaces." },
  { id: 34, name: "Amritsar", country: "India", type: "Heritage", bestTimeToVisit: "October to March", description: "Spiritual and cultural epicenter of Sikhism, world-famous for the sublime Golden Temple, history, and culinary delicacies." },
  { id: 35, name: "Mysore", country: "India", type: "Heritage", bestTimeToVisit: "October to March", description: "The Cultural Capital of Karnataka, celebrated for its illuminated royal palace, sandalwood, silk, and heritage yoga." },
  { id: 36, name: "Aurangabad", country: "India", type: "Heritage", bestTimeToVisit: "October to March", description: "Historic gateway to Maharashtra's UNESCO world wonders: the rock-cut masterpiece temples of Ellora and Ajanta." },

  // Eco-Tourism (9)
  { id: 37, name: "Shillong", country: "India", type: "Eco-Tourism", bestTimeToVisit: "September to May", description: "The Scotland of the East, famous for living root bridges, pine hills, live music, and pristine waterfalls." },
  { id: 38, name: "Kaziranga", country: "India", type: "Eco-Tourism", bestTimeToVisit: "November to April", description: "UNESCO World Heritage sanctuary along the Brahmaputra River, harboring two-thirds of the world's great one-horned rhinos." },
  { id: 39, name: "Sundarbans", country: "India", type: "Eco-Tourism", bestTimeToVisit: "October to March", description: "The world's largest coastal mangrove forest and UNESCO Biosphere Reserve, crisscrossed by tidal rivers and Royal Bengal tigers." },
  { id: 40, name: "Wayanad", country: "India", type: "Eco-Tourism", bestTimeToVisit: "October to May", description: "Lush bio-reserve paradise in the Western Ghats with ancient Neolithic caves, mist-wrapped tea plantations, and treehouses." },
  { id: 41, name: "Spiti Valley", country: "India", type: "Eco-Tourism", bestTimeToVisit: "May to October", description: "The Middle Land between India and Tibet, a high-altitude cold desert world with ancient Buddhist gompas and star-filled skies." },
  { id: 42, name: "Jim Corbett", country: "India", type: "Eco-Tourism", bestTimeToVisit: "November to June", description: "India's oldest national park and premier tiger reserve, nestled in the Himalayan foothills along the sparkling Ramganga River." },
  { id: 43, name: "Ranthambore", country: "India", type: "Eco-Tourism", bestTimeToVisit: "October to April", description: "Legendary royal hunting ground turned premier tiger reserve, where Royal Bengal tigers roam among 10th-century fort ruins." },
  { id: 44, name: "Rishikesh", country: "India", type: "Eco-Tourism", bestTimeToVisit: "September to April", description: "The Yoga Capital of the World along the emerald Ganges, surrounded by Himalayan foothills, eco-camps, and rafting rapids." },
  { id: 45, name: "Gir National Park", country: "India", type: "Eco-Tourism", bestTimeToVisit: "December to March", description: "The sole remaining natural habitat of the majestic Asiatic lion, featuring dry deciduous teak forests and crocodile rivers." },
];

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    let isMounted = true;
    destinationService
      .getAllDestinations()
      .then((data) => {
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setDestinations(data);
          } else {
            // Fallback if backend returned empty array
            setDestinations(FALLBACK_DESTINATIONS);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          // Gracefully fall back to local 45 curated destinations so UI never breaks
          setDestinations(FALLBACK_DESTINATIONS);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [reloadTrigger]);

  function getImageUrl(dest) {
    if (dest.imageUrl) return dest.imageUrl;
    const key = dest.name ? dest.name.toLowerCase().trim() : "";
    return (
      defaultImages[key] ||
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
    );
  }

  // Filter logic
  const filtered = destinations.filter((d) => {
    const matchesSearch =
      `${d.name} ${d.country} ${d.type || ""}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesType =
      selectedType === "ALL" ||
      (d.type && d.type.toLowerCase().includes(selectedType.toLowerCase()));
    return matchesSearch && matchesType;
  });

  return (
    <div className="content-page destinations-page">
      {/* Header */}
      <section className="page-heading">
        <span className="eyebrow">DISCOVER YOUR NEXT ESCAPE</span>
        <h1>Explore Destinations</h1>
        <p>
          Curated guides, top attractions, and travel inspiration from
          across India. Uniformly curated across 5 diverse themes.
        </p>
      </section>

      {/* Search and Filters */}
      <div className="destinations-toolbar">
        <div className="search-bar">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search by city, region, or travel vibe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-pill-group">
          {[
            "ALL",
            "Hill Station",
            "Metropolis",
            "Beaches",
            "Heritage",
            "Eco-Tourism",
          ].map((type) => (
            <button
              key={type}
              className={`filter-chip ${selectedType === type ? "active" : ""}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="message error">
          <span>⚠️ {error}</span>
          <button className="small-link-btn" onClick={() => { setLoading(true); setReloadTrigger(r => r + 1); }}>
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Discovering destinations...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-trips-card">
          <span className="empty-icon">🌍</span>
          <h2>No destinations found</h2>
          <p>Try searching for a different city or category.</p>
        </div>
      ) : (
        /* Destination Cards Grid */
        <div className="destination-cards-grid">
          {filtered.map((dest) => (
            <article key={dest.id || dest.name} className="rich-destination-card">
              <div className="dest-image-wrap">
                <img
                  src={getImageUrl(dest)}
                  alt={dest.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <span className="dest-country-badge">{dest.country}</span>
              </div>

              <div className="dest-card-body">
                <div className="dest-header-row">
                  <h3>{dest.name}</h3>
                  {dest.type && (
                    <span className="dest-type-tag">{dest.type}</span>
                  )}
                </div>

                <p className="dest-description">{dest.description}</p>

                {dest.bestTimeToVisit && (
                  <div className="best-time-chip">
                    🌤️ <strong>Best time:</strong> {dest.bestTimeToVisit}
                  </div>
                )}

                <div className="dest-card-footer">
                  <Link
                    to={`/destinations/${dest.id}`}
                    className="primary-btn small-full-btn"
                  >
                    View Guide & Attractions →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Destinations;
