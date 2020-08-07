const form = document.querySelector('#task-form');
const taskList = document.querySelector('#my-tasks');
const clearBtn = document.querySelector('#clear-btn');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#input-task');

loadEventListeners();

function loadEventListeners() {
    window.addEventListener('DOMContnentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []

    tasks.forEach(function (task) {
        const li = document.createElement('li');

        li.className = 'collection-task';
        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');
        link.className = 'delete-item';
        link.innerHTML = 'X';
        li.appendChild(link);

        taskList.appendChild(li);
    });
}


function addTask(e) {
    if (taskInput.value === '') {
        alert('Please Add a Task')
        taskInput.value.remove();
    }

    const li = document.createElement('li');

    li.className = 'collection-task';
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item';
    link.innerHTML = 'X';
    li.appendChild(link);

    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if (e.target.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.remove();


            removeTaskFromLocalStorage(e.target.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);

        clearTasksFromLocalStorage();
    }
}

function clearTasksFromLocalStorage() {
    localStorage.clear()
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('task').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }

    });
}