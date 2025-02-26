export class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    addTask(title, dueDate) {
        const newTask = {
            id: Date.now().toString(),
            title,
            dueDate,
            completed: false
        };
        this.tasks.push(newTask);
        this.saveTasks();
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
    }

    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }

    editTask(taskId, updatedData) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            Object.assign(task, updatedData);
            this.saveTasks();
        }
    }

    getTask(taskId) {
        return this.tasks.find(task => task.id === taskId);
    }

    getTasks() {
        return this.tasks;
    }

    getFilteredAndSortedTasks(filter = 'all', sort = 'dueDate') {
        let filteredTasks = this.tasks;
        
        // Filtering
        if (filter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.completed);
        } else if (filter === 'pending') {
            filteredTasks = filteredTasks.filter(task => !task.completed);
        }

        // Sorting
        return filteredTasks.sort((a, b) => {
            if (sort === 'title') {
                return a.title.localeCompare(b.title);
            }
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}