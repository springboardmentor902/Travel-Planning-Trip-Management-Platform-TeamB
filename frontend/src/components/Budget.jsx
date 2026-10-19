import React, { useState } from "react";

function Budget() {
  const [plannedBudget, setPlannedBudget] = useState("");
  const [category, setCategory] = useState("Food");
  const [allocatedAmount, setAllocatedAmount] = useState("");

  const [allocations, setAllocations] = useState([
    { category: "Food", amount: 0, icon: "🍴" },
    { category: "Transport", amount: 0, icon: "🚗" },
    { category: "Hotel", amount: 0, icon: "🏨" },
    { category: "Shopping", amount: 0, icon: "🛍️" },
    { category: "Entertainment", amount: 0, icon: "🎉" },
    { category: "Other Expenses", amount: 0, icon: "📌" },
  ]);

  const totalAllocated = allocations.reduce(
    (total, item) => total + Number(item.amount),
    0
  );

  const budget = Number(plannedBudget || 0);

  const remainingBudget = budget - totalAllocated;

  const progress =
    budget > 0
      ? Math.min((totalAllocated / budget) * 100, 100)
      : 0;

  const handleAllocation = (e) => {
    e.preventDefault();

    if (!allocatedAmount || Number(allocatedAmount) <= 0) {
      alert("Please enter a valid allocation amount.");
      return;
    }

    if (
      budget > 0 &&
      totalAllocated + Number(allocatedAmount) > budget
    ) {
      alert("Allocation cannot exceed the planned budget.");
      return;
    }

    setAllocations((current) =>
      current.map((item) =>
        item.category === category
          ? {
              ...item,
              amount:
                Number(item.amount) +
                Number(allocatedAmount),
            }
          : item
      )
    );

    setAllocatedAmount("");
  };

  return (
    <div className="budget-page">

      {/* ================= HEADER ================= */}

      <header className="budget-header">
        <div className="brand">
          <div className="brand-logo">✈</div>

          <div>
            <h2>TripNest</h2>
            <span>Smart Travel Planning</span>
          </div>
        </div>

        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/trips">My Trips</a>
          <a href="/destinations">Destinations</a>
          <a href="/budget" className="active">
            Budget
          </a>
        </nav>
      </header>

      {/* ================= MAIN ================= */}

      <main className="budget-container">

        {/* PAGE TITLE */}

        <div className="page-heading">
          <div>
            <span className="small-heading">
              TRIP PLANNING
            </span>

            <h1>Budget Management</h1>

            <p>
              Plan your travel budget, manage category
              allocations and keep track of your estimated
              expenses.
            </p>
          </div>

          <div className="travel-icon">
            ✈️
          </div>
        </div>

        {/* ================= SUMMARY CARDS ================= */}

        <div className="summary-grid">

          <div className="summary-card blue">
            <div className="summary-icon">💰</div>

            <div>
              <span>Planned Budget</span>
              <h2>
                ₹{budget.toLocaleString()}
              </h2>
            </div>
          </div>

          <div className="summary-card purple">
            <div className="summary-icon">📊</div>

            <div>
              <span>Allocated</span>
              <h2>
                ₹{totalAllocated.toLocaleString()}
              </h2>
            </div>
          </div>

          <div className="summary-card green">
            <div className="summary-icon">💵</div>

            <div>
              <span>Remaining</span>
              <h2>
                ₹{Math.max(remainingBudget, 0).toLocaleString()}
              </h2>
            </div>
          </div>

          <div className="summary-card orange">
            <div className="summary-icon">📈</div>

            <div>
              <span>Estimated Cost</span>
              <h2>
                ₹{totalAllocated.toLocaleString()}
              </h2>
            </div>
          </div>

        </div>

        {/* ================= PROGRESS ================= */}

        <section className="budget-card progress-card">

          <div className="section-title">
            <div>
              <h2>Budget Overview</h2>
              <p>
                Track how much of your planned budget
                has been allocated.
              </p>
            </div>

            <strong>{Math.round(progress)}%</strong>
          </div>

          <div className="progress-background">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="progress-info">
            <span>
              ₹{totalAllocated.toLocaleString()} allocated
            </span>

            <span>
              ₹{budget.toLocaleString()} total budget
            </span>
          </div>

        </section>

        {/* ================= CREATE BUDGET + CHART ================= */}

        <div className="two-column">

          {/* CREATE BUDGET */}

          <section className="budget-card">

            <div className="section-title">
              <div>
                <h2>Create Budget</h2>
                <p>
                  Set your total travel budget.
                </p>
              </div>

              <span className="section-icon">
                💰
              </span>
            </div>

            <label>
              Planned Budget
            </label>

            <div className="amount-input">
              <span>₹</span>

              <input
                type="number"
                min="0"
                placeholder="Enter total budget"
                value={plannedBudget}
                onChange={(e) =>
                  setPlannedBudget(e.target.value)
                }
              />
            </div>

            <button
              className="primary-button"
              onClick={() =>
                alert("Budget updated successfully!")
              }
            >
              Save Budget
            </button>

          </section>

          {/* DONUT CHART */}

          <section className="budget-card chart-card">

            <div className="section-title">
              <div>
                <h2>Budget Distribution</h2>
                <p>
                  Your current allocation.
                </p>
              </div>
            </div>

            <div
              className="donut"
              style={{
                background: `conic-gradient(
                  #2563eb 0% 25%,
                  #7c3aed 25% 45%,
                  #10b981 45% 65%,
                  #f59e0b 65% 82%,
                  #ef4444 82% 100%
                )`,
              }}
            >
              <div className="donut-center">
                <strong>
                  {Math.round(progress)}%
                </strong>

                <span>Used</span>
              </div>
            </div>

          </section>

        </div>

        {/* ================= ALLOCATION FORM ================= */}

        <section className="budget-card allocation-card">

          <div className="section-title">
            <div>
              <h2>Budget Allocation</h2>

              <p>
                Allocate your budget across different
                travel categories.
              </p>
            </div>

            <span className="section-icon">
              📋
            </span>
          </div>

          <form onSubmit={handleAllocation}>

            <div className="allocation-form">

              <div>
                <label>
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Hotel</option>
                  <option>Shopping</option>
                  <option>Entertainment</option>
                  <option>Other Expenses</option>
                </select>
              </div>

              <div>
                <label>
                  Amount
                </label>

                <div className="amount-input">

                  <span>₹</span>

                  <input
                    type="number"
                    min="1"
                    placeholder="Enter amount"
                    value={allocatedAmount}
                    onChange={(e) =>
                      setAllocatedAmount(e.target.value)
                    }
                  />

                </div>
              </div>

              <button
                type="submit"
                className="primary-button"
              >
                + Add Allocation
              </button>

            </div>

          </form>

        </section>

        {/* ================= CATEGORY ALLOCATION ================= */}

        <section className="budget-card">

          <div className="section-title">

            <div>
              <h2>Category Allocations</h2>

              <p>
                View how your travel budget is distributed.
              </p>
            </div>

            <span className="section-icon">
              📊
            </span>

          </div>

          <div className="category-grid">

            {allocations.map((item) => {

              const percentage =
                totalAllocated > 0
                  ? (Number(item.amount) /
                      totalAllocated) *
                    100
                  : 0;

              return (
                <div
                  className="category-card"
                  key={item.category}
                >

                  <div className="category-top">

                    <div className="category-name">

                      <span className="category-icon">
                        {item.icon}
                      </span>

                      <div>
                        <strong>
                          {item.category}
                        </strong>

                        <small>
                          {Math.round(percentage)}%
                          of allocation
                        </small>
                      </div>

                    </div>

                    <strong className="category-amount">
                      ₹
                      {Number(
                        item.amount
                      ).toLocaleString()}
                    </strong>

                  </div>

                  <div className="category-progress">
                    <div
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* ================= ESTIMATED COST ================= */}

        <section className="estimated-card">

          <div>

            <span>
              ESTIMATED TRAVEL COST
            </span>

            <h2>
              ₹{totalAllocated.toLocaleString()}
            </h2>

            <p>
              Based on your current category allocations.
            </p>

          </div>

          <div className="estimated-icon">
            ✈️
          </div>

        </section>

      </main>

      {/* ================= CSS ================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family:
            Inter,
            Arial,
            Helvetica,
            sans-serif;
          background: #f5f7fb;
          color: #172033;
        }

        .budget-page {
          min-height: 100vh;
          background:
            linear-gradient(
              135deg,
              #f7f9fc,
              #eef3ff
            );
        }

        /* HEADER */

        .budget-header {
          height: 72px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 6%;
          border-bottom: 1px solid #e8ebf2;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-logo {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background:
            linear-gradient(
              135deg,
              #2563eb,
              #7c3aed
            );
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
        }

        .brand h2 {
          margin: 0;
          font-size: 20px;
        }

        .brand span {
          font-size: 11px;
          color: #8a94a6;
        }

        nav {
          display: flex;
          gap: 28px;
        }

        nav a {
          text-decoration: none;
          color: #667085;
          font-size: 14px;
          font-weight: 500;
        }

        nav a:hover,
        nav a.active {
          color: #2563eb;
        }

        /* MAIN */

        .budget-container {
          max-width: 1200px;
          margin: auto;
          padding: 45px 25px 70px;
        }

        .page-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 35px;
        }

        .small-heading {
          color: #2563eb;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .page-heading h1 {
          margin: 8px 0;
          font-size: 36px;
        }

        .page-heading p {
          color: #667085;
          max-width: 650px;
          line-height: 1.6;
        }

        .travel-icon {
          font-size: 70px;
          background: white;
          width: 120px;
          height: 120px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 10px 35px
            rgba(37, 99, 235, 0.12);
        }

        /* SUMMARY */

        .summary-grid {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 25px;
        }

        .summary-card {
          background: white;
          padding: 22px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow:
            0 6px 25px
            rgba(30, 41, 59, 0.06);
          border: 1px solid #edf0f5;
        }

        .summary-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }

        .blue .summary-icon {
          background: #eaf2ff;
        }

        .purple .summary-icon {
          background: #f1eaff;
        }

        .green .summary-icon {
          background: #e8faf2;
        }

        .orange .summary-icon {
          background: #fff4df;
        }

        .summary-card span {
          color: #7b8494;
          font-size: 13px;
        }

        .summary-card h2 {
          margin: 5px 0 0;
          font-size: 22px;
        }

        /* COMMON CARD */

        .budget-card {
          background: white;
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 25px;
          border: 1px solid #edf0f5;
          box-shadow:
            0 6px 25px
            rgba(30, 41, 59, 0.05);
        }

        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 22px;
        }

        .section-title h2 {
          margin: 0 0 5px;
          font-size: 20px;
        }

        .section-title p {
          margin: 0;
          color: #8a94a6;
          font-size: 13px;
        }

        .section-title > strong {
          color: #2563eb;
          font-size: 20px;
        }

        .section-icon {
          font-size: 24px;
        }

        /* PROGRESS */

        .progress-background {
          height: 13px;
          background: #edf1f7;
          border-radius: 20px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 20px;
          background:
            linear-gradient(
              90deg,
              #2563eb,
              #7c3aed
            );
          transition: width 0.4s ease;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          font-size: 12px;
          color: #8a94a6;
        }

        /* TWO COLUMN */

        .two-column {
          display: grid;
          grid-template-columns:
            1fr 1fr;
          gap: 25px;
        }

        /* FORM */

        label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #344054;
        }

        input,
        select {
          width: 100%;
          height: 45px;
          border: 1px solid #d9dee8;
          border-radius: 10px;
          padding: 0 14px;
          outline: none;
          font-size: 14px;
          background: white;
        }

        input:focus,
        select:focus {
          border-color: #2563eb;
          box-shadow:
            0 0 0 3px
            rgba(37, 99, 235, 0.1);
        }

        .amount-input {
          display: flex;
          align-items: center;
          border: 1px solid #d9dee8;
          border-radius: 10px;
          height: 45px;
          overflow: hidden;
          background: white;
        }

        .amount-input span {
          padding: 0 14px;
          color: #667085;
          font-weight: 600;
        }

        .amount-input input {
          border: none;
          height: 100%;
          padding-left: 0;
        }

        .primary-button {
          margin-top: 20px;
          background:
            linear-gradient(
              135deg,
              #2563eb,
              #4f46e5
            );
          color: white;
          border: none;
          border-radius: 10px;
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .primary-button:hover {
          transform: translateY(-1px);
          box-shadow:
            0 8px 18px
            rgba(37, 99, 235, 0.25);
        }

        /* CHART */

        .chart-card {
          display: flex;
          flex-direction: column;
        }

        .donut {
          width: 170px;
          height: 170px;
          border-radius: 50%;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .donut-center {
          width: 105px;
          height: 105px;
          border-radius: 50%;
          background: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .donut-center strong {
          font-size: 24px;
        }

        .donut-center span {
          font-size: 12px;
          color: #8a94a6;
        }

        /* ALLOCATION */

        .allocation-form {
          display: grid;
          grid-template-columns:
            1fr 1fr auto;
          gap: 18px;
          align-items: end;
        }

        .allocation-form .primary-button {
          margin-top: 0;
          height: 45px;
        }

        /* CATEGORY */

        .category-grid {
          display: grid;
          grid-template-columns:
            repeat(2, 1fr);
          gap: 15px;
        }

        .category-card {
          border: 1px solid #edf0f5;
          border-radius: 15px;
          padding: 18px;
          transition: 0.2s;
        }

        .category-card:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 20px
            rgba(30, 41, 59, 0.07);
        }

        .category-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .category-name {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .category-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #f1f5ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 19px;
        }

        .category-name strong {
          display: block;
          font-size: 14px;
        }

        .category-name small {
          display: block;
          color: #98a2b3;
          font-size: 11px;
          margin-top: 3px;
        }

        .category-amount {
          font-size: 15px;
        }

        .category-progress {
          height: 6px;
          background: #edf1f7;
          border-radius: 10px;
          margin-top: 15px;
          overflow: hidden;
        }

        .category-progress div {
          height: 100%;
          background:
            linear-gradient(
              90deg,
              #2563eb,
              #7c3aed
            );
          border-radius: 10px;
        }

        /* ESTIMATED */

        .estimated-card {
          background:
            linear-gradient(
              135deg,
              #172554,
              #312e81
            );
          color: white;
          border-radius: 22px;
          padding: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .estimated-card span {
          font-size: 11px;
          letter-spacing: 1.5px;
          opacity: 0.7;
        }

        .estimated-card h2 {
          font-size: 32px;
          margin: 8px 0;
        }

        .estimated-card p {
          margin: 0;
          opacity: 0.7;
          font-size: 13px;
        }

        .estimated-icon {
          font-size: 60px;
        }

        /* RESPONSIVE */

        @media (max-width: 900px) {

          .summary-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .two-column {
            grid-template-columns: 1fr;
          }

          .allocation-form {
            grid-template-columns: 1fr;
          }

          .allocation-form .primary-button {
            width: 100%;
          }

          nav {
            display: none;
          }
        }

        @media (max-width: 600px) {

          .budget-container {
            padding: 30px 15px;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }

          .category-grid {
            grid-template-columns: 1fr;
          }

          .page-heading h1 {
            font-size: 28px;
          }

          .travel-icon {
            display: none;
          }

          .budget-header {
            padding: 0 20px;
          }

        }

      `}</style>

    </div>
  );
}

export default Budget;