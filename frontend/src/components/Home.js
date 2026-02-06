import React, { useEffect, useState, useCallback } from "react";

const Home = () => {
  const address = localStorage.getItem("walletAddress");

  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [thisWeek, setThisWeek] = useState(0);
  const [loading, setLoading] = useState(true);

  // -------- FETCH TASKS & COMPUTE STATS --------
  const fetchStats = useCallback(async () => {
    const BACKEND_API=process.env.REACT_APP_BACKEND_API;
    if (!address) return;

    try {
      const res = await fetch(
        `${BACKEND_API}/view-allTask/${address}`
      );

      const data = await res.json();
      if (!res.ok) throw new Error("Failed");

      const tasks = data.Tasks || [];

      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(t => t.completed).length;
      const remainingTasks = totalTasks - completedTasks;

      // ---- tasks this week ----
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);

      const tasksThisWeek = tasks.filter(t => {
        const taskDate = new Date(t.date);
        return taskDate >= startOfWeek && taskDate < endOfWeek;
      }).length;

      setTotal(totalTasks);
      setCompleted(completedTasks);
      setRemaining(remainingTasks);
      setThisWeek(tasksThisWeek);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: "600px" }}>
        <h2>Welcome to Todo DApp 🚀</h2>

        <p>
          Manage your blockchain-secured tasks and track your progress.
        </p>
<div
          className="task"
          style={{
            textAlign: "center",
            marginTop: "14px",
            background: "rgba(15, 23, 42, 0.9)",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
            Connected Wallet
          </p>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#38bdf8",
              wordBreak: "break-all",
            }}
          >
            {address}
          </p>
        </div>
        {/* -------- STATS GRID -------- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
            marginTop: "20px",
          }}
        >
          <div className="task" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
              Total Tasks
            </p>
            <p style={{ fontSize: "1.3rem", fontWeight: "600" }}>
              {loading ? "—" : total}
            </p>
          </div>

          <div className="task" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
              Completed
            </p>
            <p
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "#22c55e",
              }}
            >
              {loading ? "—" : completed}
            </p>
          </div>

          <div className="task" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
              Remaining
            </p>
            <p
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "#facc15",
              }}
            >
              {loading ? "—" : remaining}
            </p>
          </div>

          <div className="task" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
              Tasks This Week
            </p>
            <p
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "#38bdf8",
              }}
            >
              {loading ? "—" : thisWeek}
            </p>
          </div>
        </div>

        <p style={{ marginTop: "22px", fontSize: "0.9rem" }}>
          Use the navigation bar to manage your tasks. All changes are stored
          securely on the blockchain.
        </p>
      </div>
    </div>
  );
};

export default Home;
