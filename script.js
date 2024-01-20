document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
    document.getElementById("addTaskButton").addEventListener("click", addTask);
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var colorSelect = document.getElementById("colorSelect");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    var taskItem = document.createElement("li");
    var colorValue = colorSelect.value;
    taskItem.className = "task";
    taskItem.style.backgroundColor = colorValue !== "default" ? colorValue : "";

    var taskText = document.createElement("div");
    taskText.className = "text";
    taskText.innerText = taskInput.value;

    var completeButton = createButton("Complete", function () {
        taskItem.classList.toggle("completed");
        saveTasks();
    });

    var deleteButton = createButton("Delete", function () {
        taskList.removeChild(taskItem);
        saveTasks();
    });

    taskItem.appendChild(taskText);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    taskInput.value = "";
    colorSelect.value = "default";

    saveTasks();
}

function createButton(text, clickHandler) {
    var button = document.createElement("button");
    button.innerText = text;
    button.onclick = clickHandler;
    return button;
}

function saveTasks() {
    var taskList = document.getElementById("taskList");
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = localStorage.getItem("tasks") || "";
}
