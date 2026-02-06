import React, { useState } from "react";
import { ethers } from "ethers";
const TodoABI=require("../TodoApp.json");

const CreateTask = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);

    const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

    const handleCreateTask = async () => {
    if (!name || !date) {
    alert("Please fill all fields");
    return;
    }

    try {
    setLoading(true);

    if (!window.ethereum) {
    alert("MetaMask not found");
    return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    TodoABI.abi,
    signer
    );

    const tx = await contract.createTask(name, date);
    await tx.wait(); 

    alert("Task created on blockchain!");
    setName("");
    setDate("");

    } catch (error) {
    console.error(error);
    alert("Transaction failed");
    } finally {
    setLoading(false);
    }
    };

    return (
    <div className="page">
        <div className="card" style={{ maxWidth: "520px" }}>
        <h2>Create New Task</h2>

        <p>
            Add a new task to your decentralized todo list. The task will be
            stored on the blockchain.
        </p>

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

        <button onClick={handleCreateTask} disabled={loading}>
            {loading ? "Creating..." : "Create Task"}
        </button>
        </div>
    </div>
    );
};

export default CreateTask;
