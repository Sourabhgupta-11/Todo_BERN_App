import React from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const address = location.state?.address;


  return (
    <div className="page">
      <div className="card">
        <h2>Welcome to Todo DApp 🚀</h2>

        <p>
          A decentralized task manager where your tasks are stored securely on
          the Ethereum blockchain.
        </p>

        <div
          style={{
            margin: "18px 0",
            padding: "12px",
            borderRadius: "10px",
            background: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p style={{ marginBottom: "6px", fontSize: "0.9rem" }}>
            Connected Wallet
          </p>
          <p
            style={{
              fontWeight: "600",
              color: "#38bdf8",
              fontSize: "0.95rem",
            }}
          >
            {address}
          </p>
        </div>

        {/* Stats section (future-ready) */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <div className="task" style={{ flex: 1, textAlign: "center" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
              Total Tasks
            </p>
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>—</p>
          </div>

          <div className="task" style={{ flex: 1, textAlign: "center" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
              Completed
            </p>
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>—</p>
          </div>
        </div>

        <p style={{ marginTop: "22px", fontSize: "0.9rem" }}>
          Use the navigation bar above to create, view, update, or delete your
          tasks. Each action requires MetaMask confirmation.
        </p>
      </div>
    </div>
  );
};

export default Home;
