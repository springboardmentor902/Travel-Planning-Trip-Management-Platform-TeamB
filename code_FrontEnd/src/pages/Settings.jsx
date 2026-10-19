function Settings() {
  return (
    <div className="content-page narrow-page">
      <section className="page-heading left">
        <span className="eyebrow">ACCOUNT</span>
        <h1>Settings</h1>
        <p>Manage your TripNest preferences.</p>
      </section>

      <section className="settings-card">
        <div className="settings-row">
          <div><strong>Email notifications</strong><p>Receive useful updates about your trips.</p></div>
          <label className="switch"><input type="checkbox" /><span></span></label>
        </div>
        <div className="settings-row">
          <div><strong>Travel recommendations</strong><p>Get destination ideas based on your interests.</p></div>
          <label className="switch"><input type="checkbox" /><span></span></label>
        </div>
        <div className="settings-row">
          <div><strong>Account security</strong><p>Your authenticated TripNest session is protected.</p></div>
          <span className="status-pill">Protected</span>
        </div>
      </section>
    </div>
  );
}

export default Settings;
