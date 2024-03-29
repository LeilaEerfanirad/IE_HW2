
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

function addTask() {
    const taskTitle = document.getElementById('taskTitle').value;
    const deadline = document.getElementById('deadline').value;

    if (taskTitle.trim() === '' || deadline === '') {
        alert('Please enter both task title and deadline.');
        return;
    }

    const task = {
       // id: tasks.length,
        title: taskTitle,
        deadline: deadline,
        completed: false,
    };

    tasks.push(task);
    saveTasksToLocalStorage();

    // updateTaskList();
     updateTaskSummary();
}

function completeTask(index) {
    const now = new Date().toLocaleString();
    tasks[index].completed = true;
    tasks[index].completedOn = now;
    completedTasks.push(tasks[index]);
    tasks.splice(index, 1);

    saveTasksToLocalStorage();
    saveCompletedTasksToLocalStorage();

     //updateTaskList();
     updateTaskSummary();
}

function updateTaskList() {
    const totalList = document.getElementById('totalList');
    totalList.innerHTML = '';
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    //const today = new Date().toISOString().split('T')[0];
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.title} - Deadline: ${task.deadline}</span>
            <button onclick="completeTask(${index})">Complete</button>
            <button onclick="deleteTask(${index})">Delete</button>
            
        `;
        totalList.appendChild(li);
        taskList.appendChild(li);
    });

    const completedList = document.getElementById('completedList');
    completedList.innerHTML = '';
    completedTasks.forEach((task , index )=> {
        const li = document.createElement('li');
      
        li.innerHTML = `
            <span>${task.title} - Completed on: ${task.completedOn}</span>
            <button onclick="deleteCompletedTask(${index})">Delete</button>
        `;
        totalList.appendChild(li);
        completedList.appendChild(li);
    });

    

}

function updateTaskSummary() {
    const totalTasksElement = document.getElementById('totalTasks');
    const completedTasksElement = document.getElementById('completedTasks');
    const remainingTasksElement = document.getElementById('remainingTasks');

    totalTasksElement.textContent = tasks.length + completedTasks.length;
    completedTasksElement.textContent = completedTasks.length;
    remainingTasksElement.textContent = tasks.length;
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveCompletedTasksToLocalStorage() {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    //updateTaskList();
    updateTaskSummary();
}

function deleteCompletedTask(index) {
    completedTasks.splice(index, 1);
    saveCompletedTasksToLocalStorage();
    //updateTaskList();
    updateTaskSummary();
    
}

//updateTaskList();
updateTaskSummary();

function showTotalTasks() {
    const searchResultList = document.getElementById('searchResultList');
    searchResultList.innerHTML = '';
    const totalList = document.getElementById('totalList');
    totalList.innerHTML = '';
    const completedList = document.getElementById('completedList');
    completedList.innerHTML = '';
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.title} - Deadline: ${task.deadline}</span>
            <button onclick="completeTask(${index})">Complete</button>
            <button onclick="deleteTask(${index},)">Delete</button>
            
        `;
        //li.textContent = `${task.title} - Deadline: ${task.deadline}`;
        totalList.appendChild(li);
    });
    completedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.title} - Completed on: ${task.completedOn}</span>
            <button onclick="deleteCompletedTask(${index})">Delete</button>
        `;
        //li.textContent = `${task.title} - Completed on: ${task.completedOn}`;
        totalList.appendChild(li);
    });
    updateTaskSummary();

}

function showCompletedTasks() {
    const searchResultList = document.getElementById('searchResultList');
    searchResultList.innerHTML = '';
    const totalList = document.getElementById('totalList');
    totalList.innerHTML = '';
    const completedList = document.getElementById('completedList');
    completedList.innerHTML = '';
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    completedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.title} - Completed on: ${task.completedOn}</span>
            <button onclick="deleteCompletedTask(${index})">Delete</button>
        `;
        //li.textContent = `${task.title} - Completed on: ${task.completedOn}`;
        completedList.appendChild(li);
    });
    updateTaskSummary();

}

function showRemainingTasks() {
    const searchResultList = document.getElementById('searchResultList');
    searchResultList.innerHTML = '';
    const totalList = document.getElementById('totalList');
    totalList.innerHTML = '';
    const completedList = document.getElementById('completedList');
    completedList.innerHTML = '';
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.title} - Deadline: ${task.deadline}</span>
            <button onclick="completeTask(${index})">Complete</button>
            <button onclick="deleteTask(${index})">Delete</button>
            
        `;
        //li.textContent = `${task.title} - Deadline: ${task.deadline}`;
        taskList.appendChild(li);
    });
    updateTaskSummary();

}

function searchTaskByTitle(title) {
    const filteredTasks = tasks.filter(task => task.title.includes(title));
    return filteredTasks;
}

function searchCoTaskByTitle(title) {
    const coFilteredTasks = completedTasks.filter(task => task.title.includes(title));
    return coFilteredTasks;
}

function showSearchedTasks() {
    const searchInput = document.getElementById('searchInput').value;
    const searchResultList = document.getElementById('searchResultList');
    searchResultList.innerHTML = '';
    const totalList = document.getElementById('totalList');
    totalList.innerHTML = '';
    const completedList = document.getElementById('completedList');
    completedList.innerHTML = '';
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';


    const searchedTasks =  searchTaskByTitle(searchInput);
    const coFilteredTasks = searchCoTaskByTitle(searchInput);
    searchedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <span>${task.title} - Deadline: ${task.deadline}</span>
        <button onclick="completeTask(${index})">Complete</button>
        <button onclick="deleteTask(${index})">Delete</button>`;
       // li.textContent = `${task.title} - Deadline: ${task.deadline}`;
        searchResultList.appendChild(li);
    });
    coFilteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.title} - Completed on: ${task.completedOn}</span>
            <button onclick="deleteCompletedTask(${index})">Delete</button>
        `;
       // li.textContent = `${task.title} - Deadline: ${task.deadline}`;
        searchResultList.appendChild(li);
    });
    updateTaskSummary();

}

document.getElementById('searchBtn').addEventListener('click', showSearchedTasks);
document.getElementById('totalBtn').addEventListener('click', showTotalTasks);
document.getElementById('completedBtn').addEventListener('click', showCompletedTasks);
document.getElementById('remainBtn').addEventListener('click', showRemainingTasks);