require("dotenv/config")
const express=require("express");
const cors=require( "cors")
const ethers=require("ethers")
const Abi=require( "../backend/TodoApp.json" )

const app=express();
app.use(express.json());
app.use(cors({ origin: "https://todo-bern-app.vercel.app/" }));


const contractAddress = "0xD7dee32c7abFAF3c52F5E71b4c7a5371E055e32f";
const ABI = Abi.abi;
const provider = new ethers.JsonRpcProvider(
  process.env.SEPOLIA_RPC_URL
);

const contract = new ethers.Contract(contractAddress, ABI, provider);

app.get("/api/ethereum/view-allTask/:user", async (req, res) => {
  try {
    const user = req.params.user;
    const tasks = await contract.allTasks(user);

    const formattedTasks = tasks.map(t => ({
      id: Number(t.id),
      name: t.name,
      date: t.date,
      completed: t.completed,
      exists: t.exists
    }));

    res.status(200).json({ Tasks: formattedTasks });
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

app.get("/api/ethereum/view-task/:user/:taskId", async (req, res) => {
  try {
    const { user, taskId } = req.params;
    const t = await contract.viewTask(user, taskId);

    res.status(200).json({
      Task: {
        id: Number(t.id),
        name: t.name,
        date: t.date,
        completed: t.completed,
        exists: t.exists,
      },
    });
  } catch (err) {
    res.status(404).json({ message: "Invalid Task Id" });
  }
});

app.listen(5000,()=>{
    console.log("App is listening on port 5000")
})