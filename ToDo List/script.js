document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('task-item');
            li.innerHTML = `
                <span class="task-title ${task.completed ? 'completed' : ''}">${task.title}</span>
                <div>
                    <button class="completeBtn">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="deleteBtn">Delete</button>
                </div>
            `;
            li.querySelector('.completeBtn').addEventListener('click', () => toggleTask(index));
            li.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(index));
            taskList.appendChild(li);
        });
    }

    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function addTask() {
        const title = taskInput.value.trim();
        if (title !== '') {
            tasks.push({ title, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskBtn.addEventListener('click', addTask);

    renderTasks();
});
