// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Load completed tasks from localStorage
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

    updateTaskList();
    updateTaskSummary();
}

// function completeTask(index) {
//     tasks[index].completed = true;
//     completedTasks.push(tasks[index]);
//     tasks.splice(index, 1);

//     saveTasksToLocalStorage();
//     saveCompletedTasksToLocalStorage();

//     updateTaskList();
//     updateTaskSummary();
// }
function completeTask(index) {
    const now = new Date().toLocaleString();
    tasks[index].completed = true;
    tasks[index].completedOn = now;
    completedTasks.push(tasks[index]);
    tasks.splice(index, 1);

    saveTasksToLocalStorage();
    saveCompletedTasksToLocalStorage();

    updateTaskList();
    updateTaskSummary();
}

function updateTaskList() {
    const totalList = document.getElementById('taskList');
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

    // const todayTasks = tasks.filter(task => task.deadline === today && !task.completed);
    // todayTasks.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1);

    // const todayList = document.getElementById('todayList');
    // todayList.innerHTML = '';
    // todayTasks.forEach(task => {
    //     const li = document.createElement('li');
    //     li.textContent = `${task.title} - Deadline: ${task.deadline}`;
    //     todayList.appendChild(li);
    // });

    const completedList = document.getElementById('completedList');
    completedList.innerHTML = '';
    completedTasks.forEach((task , index )=> {
        const li = document.createElement('li');
       // li.textContent = `${task.title} - Completed on: ${task.completedOn}`;
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
    updateTaskList();
    updateTaskSummary();
}

function deleteCompletedTask(index) {
    completedTasks.splice(index, 1);
    saveCompletedTasksToLocalStorage();
    updateTaskList();
    updateTaskSummary();
}
// Initial update of the task list and summary
updateTaskList();
updateTaskSummary();
