import React, { useState } from "react";
import { ethers } from "ethers";
import TodoABI from "../TodoApp.json";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

const UpdateTask = () => {

  const [taskId, setTaskId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  const address = localStorage.getItem("walletAddress");

  // ---------------- FETCH EXISTING TASK ----------------
  const fetchTask = async () => {
    const BACKEND_API=process.env.REACT_APP_BACKEND_API;
    if (!taskId) {
      setError("Please enter task ID");
      return;
    }

    try {
      setFetching(true);
      setError("");

      const res = await fetch(
        `${BACKEND_API}/view-task/${address}/${taskId}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid task ID");
      }

      setName(data.Task.name);
      setDate(data.Task.date);
    } catch (err) {
      console.error(err);
      setError("Task not found");
    } finally {
      setFetching(false);
    }
  };

  // ---------------- UPDATE TASK ----------------
  const updateTask = async () => {
    if (!taskId || !name || !date) {
      alert("All fields are required");
      return;
    }

    try {
      if (!window.ethereum) {
        alert("MetaMask not found");
        return;
      }

      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        TodoABI.abi,
        signer
      );

      const tx = await contract.updateTask(taskId, name, date);
      await tx.wait();

      alert("Task updated successfully!");
      setTaskId("");
      setName("");
      setDate("");
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: "560px" }}>
        <h2>Update Task</h2>

        <p>
          Enter a task ID to fetch and update your task stored on the blockchain.
        </p>

        <input
          type="number"
          placeholder="Task ID"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />

        <button
          onClick={fetchTask}
          disabled={fetching}
          style={{ marginBottom: "16px" }}
        >
          {fetching ? "Fetching..." : "Fetch Task"}
        </button>

        {error && <p style={{ color: "#f87171" }}>{error}</p>}

        <input
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={updateTask} disabled={loading}>
          {loading ? "Updating..." : "Update Task"}
        </button>
      </div>
    </div>
  );
};

export default UpdateTask;
