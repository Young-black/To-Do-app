export function updateTaskList(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = tasks.map(task => `
        <li class="${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
            <div class="task-info">
                <input type="checkbox" 
                    ${task.completed ? 'checked' : ''} 
                    onchange="toggleTaskCompletion('${task.id}')">
                <span>${task.title}</span>
                <small>${new Date(task.dueDate).toLocaleDateString()}</small>
            </div>
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask('${task.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteTask('${task.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </li>
    `).join('');
}