require("dotenv/config")
const express=require("express");
const cors=require( "cors")
const ethers=require("ethers")
const Abi=require( "../contract/artifacts/contracts/todo.sol/TodoApp.json" )

const app=express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));


const contractAddress = "0xc27bE5Ea8f0D35A1Ab5cb2594c3FF97a05CcA904";
const ABI = Abi.abi;
const provider = new ethers.JsonRpcProvider(
  process.env.SEPOLIA_RPC_URL
);

const contract = new ethers.Contract(contractAddress, ABI, provider);

app.get("/api/ethereum/view-task/:taskId",async (req,res)=>{
    try {
        const id=req.params.taskId
        const t=await contract.viewTask(id)
        const Task={
            id: Number(t.id),
            name: t.name,
            date: t.date,
            completed: t.completed,
            exists: t.exists
        };
        res.status(200).json({Task})
    } catch (error) {
        res.status(404).json({message:"Invalid Task Id"})
    }
})

app.get("/api/ethereum/view-allTask",async (req,res)=>{
    try {
        const Tasks=await contract.allTasks()
        res.status(200).json({Tasks})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
})

app.listen(5000,()=>{
    console.log("App is listening on port 5000")
})