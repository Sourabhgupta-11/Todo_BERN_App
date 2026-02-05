import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import TodoABI from "../TodoApp.json";

const CONTRACT_ADDRESS = "0xD7dee32c7abFAF3c52F5E71b4c7a5371E055e32f";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const [error, setError] = useState("");

  const address = localStorage.getItem("walletAddress");

  // ---------------- FETCH TASKS ----------------
  const fetchTasks = async () => {
    if (!address) {
      setError("Wallet not connected");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/ethereum/view-allTask/${address}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch tasks");
      }

      setTasks(data.Tasks);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [address]);

  // ---------------- TOGGLE COMPLETED ----------------
  const toggleCompleted = async (taskId) => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not found");
        return;
      }

      setLoadingTaskId(taskId);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        TodoABI.abi,
        signer
      );

      const tx = await contract.toggleCompleted(taskId);
      await tx.wait();

      await fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    } finally {
      setLoadingTaskId(null);
    }
  };

  // ---------------- FILTER ----------------
  const filteredTasks = searchId
    ? tasks.filter((t) => t.id === Number(searchId))
    : tasks;

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: "560px" }}>
        <h2>Your Tasks</h2>

        <p>
          View and manage your blockchain-based tasks. Toggle completion status
          using MetaMask.
        </p>

        <input
          type="number"
          placeholder="Search by Task ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        {loading && <p>Loading tasks...</p>}
        {error && <p style={{ color: "#f87171" }}>{error}</p>}

        {!loading && !error && filteredTasks.length === 0 && (
          <p>No tasks found.</p>
        )}

        {!loading &&
          !error &&
          filteredTasks.map((task) => (
            <div key={task.id} className="task">
              <p><b>ID:</b> {task.id}</p>
              <p><b>Name:</b> {task.name}</p>
              <p><b>Date:</b> {task.date}</p>

              <p>
                <b>Status:</b>{" "}
                {task.completed ? "✅ Completed" : "⏳ Pending"}
              </p>

              <button
                style={{ marginTop: "10px" }}
                onClick={() => toggleCompleted(task.id)}
                disabled={loadingTaskId === task.id}
              >
                {loadingTaskId === task.id
                  ? "Processing..."
                  : "Toggle Completed"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ViewTasks;
