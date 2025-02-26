import { TaskManager } from './taskManager.js';
import { updateTaskList } from './domUpdates.js';

const taskManager = new TaskManager();

document.addEventListener('DOMContentLoaded', () => {
    // Form handling
    const taskForm = document.getElementById('taskForm');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const closeFormBtn = document.getElementById('closeTaskForm');

    addTaskBtn.addEventListener('click', () => {
        taskForm.classList.remove('hidden');
    });

    closeFormBtn.addEventListener('click', () => {
        taskForm.classList.add('hidden');
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value.trim();
        const dueDate = document.getElementById('taskDueDate').value;

        if (title && dueDate) {
            taskManager.addTask(title, dueDate);
            updateTaskList(taskManager.getTasks());
            taskForm.reset();
            taskForm.classList.add('hidden');
        }
    });

    // Filter and sort handling
    const taskFilter = document.getElementById('taskFilter');
    const taskSort = document.getElementById('taskSort');

    [taskFilter, taskSort].forEach(element => {
        element.addEventListener('change', () => {
            updateTaskList(taskManager.getFilteredAndSortedTasks(
                taskFilter.value,
                taskSort.value
            ));
        });
    });

    // Initial render
    updateTaskList(taskManager.getTasks());
});

// Global functions for task actions
window.toggleTaskCompletion = (taskId) => {
    taskManager.toggleTaskCompletion(taskId);
    updateTaskList(taskManager.getTasks());
};

window.deleteTask = (taskId) => {
    taskManager.deleteTask(taskId);
    updateTaskList(taskManager.getTasks());
};

window.editTask = (taskId) => {
    const task = taskManager.getTask(taskId);
    const newTitle = prompt('Edit task title:', task.title);
    const newDate = prompt('Edit due date:', task.dueDate);

    if (newTitle && newDate) {
        taskManager.editTask(taskId, { title: newTitle, dueDate: newDate });
        updateTaskList(taskManager.getTasks());
    }
};