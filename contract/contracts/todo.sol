// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.2 <0.9.0;

contract Todo {
    address public owner;

    struct Task {
        uint id;
        string name;
        string date;
        bool completed;
        bool exists;
    }

    uint public taskId = 1;
    mapping(uint => Task) private tasks;

    // ---------------- MODIFIERS ----------------

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier validTask(uint id) {
        require(id != 0 && id < taskId, "Invalid task id");
        require(tasks[id].exists, "Task does not exist");
        _;
    }

    // ---------------- CONSTRUCTOR ----------------

    constructor() {
        owner = msg.sender;
    }

    // ---------------- TASK FUNCTIONS ----------------

    function createTask(
        string calldata name,
        string calldata date
    ) public onlyOwner {
        tasks[taskId] = Task(
            taskId,
            name,
            date,
            false, 
            true   
        );
        taskId++;
    }

    function updateTask(
        uint _taskId,
        string calldata name,
        string calldata date
    ) public onlyOwner validTask(_taskId) {
        Task storage t = tasks[_taskId];
        t.name = name;
        t.date = date;
    }

    function toggleCompleted(uint _taskId)
        public
        onlyOwner
        validTask(_taskId)
    {
        tasks[_taskId].completed = !tasks[_taskId].completed;
    }

    function viewTask(uint _taskId)
        public
        view
        validTask(_taskId)
        returns (Task memory)
    {
        return tasks[_taskId];
    }

    function deleteTask(uint _taskId)
        public
        onlyOwner
        validTask(_taskId)
    {
        tasks[_taskId].exists = false;
    }

    function allTasks() public view returns (Task[] memory) {
        uint count = 0;

        for (uint i = 1; i < taskId; i++) {
            if (tasks[i].exists) {
                count++;
            }
        }

        Task[] memory list = new Task[](count);
        uint index = 0;

        for (uint i = 1; i < taskId; i++) {
            if (tasks[i].exists) {
                list[index] = tasks[i];
                index++;
            }
        }

        return list;
    }
}
