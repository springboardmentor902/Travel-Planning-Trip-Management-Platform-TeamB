function DestinationCard({ destination, onExplore }) {
  return (
    <article className="destination-card">
      <div className="destination-visual">
        <span>{destination.emoji}</span>
        <span className="destination-country">{destination.country}</span>
      </div>
      <div className="destination-content">
        <h3>{destination.name}</h3>
        <p>{destination.description}</p>
        <button className="outline-btn" onClick={() => onExplore(destination.name)}>
          Explore destination →
        </button>
      </div>
    </article>
  );
}

export default DestinationCard;
