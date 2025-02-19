document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.querySelector(".task-list");
    const newTaskBtn = document.querySelector(".new-task-btn");

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="radio" name="task" ${task.completed ? "checked" : ""} onclick="toggleTask(${index})">
                ${task.completed ? `<del>${task.text}</del>` : task.text}
                <span class="delete-icon" onclick="deleteTask(${index})">🗑️</span>
            `;
            taskList.appendChild(li);
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add new task
    newTaskBtn.addEventListener("click", () => {
        const taskText = prompt("Enter a new task:");
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            renderTasks();
        }
    });

    // Toggle task completion
    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    // Delete a task
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    // Initial render
    renderTasks();
});
