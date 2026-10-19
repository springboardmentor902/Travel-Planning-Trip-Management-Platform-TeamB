import React from "react";

function Dashboard() {
  const name = localStorage.getItem("userName");
  const role = localStorage.getItem("userRole");

  return (
    <div className="dashboard">
      <h1>Welcome to Dashboard: {name}</h1>

      <p>Your smart travel planning journey starts here.</p>

      <p>
        <strong>Role:</strong> {role}
      </p>
    </div>
  );
}

export default Dashboard;
