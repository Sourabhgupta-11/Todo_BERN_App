// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.2 <0.9.0;

contract TodoApp {
    struct Task {
        uint id;
        string name;
        string date;
        bool completed;
        bool exists;
    }

    mapping(address => mapping(uint => Task)) private tasks;
    mapping(address => uint) private taskCount;  //its values are 0 by default

    // ---------------- MODIFIERS ----------------

    modifier validTask(uint id) {
        require(id != 0 && id <= taskCount[msg.sender], "Invalid task id");
        require(tasks[msg.sender][id].exists, "Task does not exist");
        _;
    }

    // ---------------- TASK FUNCTIONS ----------------

    function createTask(string calldata name, string calldata date) public {
        uint id = taskCount[msg.sender] + 1;

        tasks[msg.sender][id] = Task(
            id,
            name,
            date,
            false,
            true
        );

        taskCount[msg.sender] = id;
    }

    function updateTask(uint _taskId,string calldata name,string calldata date) public validTask(_taskId) {
        Task storage t = tasks[msg.sender][_taskId];
        t.name = name;
        t.date = date;
    }

    function toggleCompleted(uint _taskId) public validTask(_taskId) {
        tasks[msg.sender][_taskId].completed =
            !tasks[msg.sender][_taskId].completed;
    }

    function deleteTask(uint _taskId) public validTask(_taskId) {
        tasks[msg.sender][_taskId].exists = false;
    }

    function viewTask(uint _taskId)public view validTask(_taskId) returns (Task memory){
        return tasks[msg.sender][_taskId];
    }

    function allTasks() public view returns (Task[] memory) {
        uint total = taskCount[msg.sender];
        uint count = 0;

        // count existing tasks
        for (uint i = 1; i <= total; i++) {
            if (tasks[msg.sender][i].exists) {
                count++;
            }
        }

        Task[] memory list = new Task[](count);
        uint index = 0;

        for (uint i = 1; i <= total; i++) {
            if (tasks[msg.sender][i].exists) {
                list[index] = tasks[msg.sender][i];
                index++;
            }
        }

        return list;
    }
}
