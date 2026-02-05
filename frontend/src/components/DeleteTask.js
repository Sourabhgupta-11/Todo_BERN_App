import React, { useState } from "react";
import { ethers } from "ethers";
import TodoABI from "../TodoApp.json";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

const DeleteTask = () => {
  const [taskId, setTaskId] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");

  const address = localStorage.getItem("walletAddress");

  // ---------------- FETCH TASK (CONFIRM) ----------------
  const fetchTask = async () => {
    if (!taskId) {
      setError("Please enter task ID");
      return;
    }

    try {
      setFetching(true);
      setError("");
      setTask(null);

      const res = await fetch(
        `http://localhost:5000/api/ethereum/view-task/${address}/${taskId}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Task not found");
      }

      setTask(data.Task);
    } catch (err) {
      console.error(err);
      setError("Task not found or does not belong to you");
    } finally {
      setFetching(false);
    }
  };

  // ---------------- DELETE TASK ----------------
  const deleteTask = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found");
      return;
    }

    try {
      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        TodoABI.abi,
        signer
      );

      const tx = await contract.deleteTask(Number(taskId));
      await tx.wait();

      alert("Task deleted successfully");

      setTaskId("");
      setTask(null);
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
        <h2>Delete Task</h2>

        <p>
          Enter a task ID to permanently delete it from the blockchain.
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

        {task && (
          <div className="task">
            <p><b>ID:</b> {task.id}</p>
            <p><b>Name:</b> {task.name}</p>
            <p><b>Date:</b> {task.date}</p>
            <p>
              <b>Status:</b>{" "}
              {task.completed ? "✅ Completed" : "⏳ Pending"}
            </p>

            <button
              onClick={deleteTask}
              disabled={loading}
              style={{
                marginTop: "10px",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "white",
              }}
            >
              {loading ? "Deleting..." : "Delete Task"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteTask;
