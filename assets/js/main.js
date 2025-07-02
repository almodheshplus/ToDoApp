/* 
    # Coded With 🧡 By Youssef Almodhesh ^_^
*/

let body           = document.body,
    taskInput      = document.getElementById("taskInput"),
    addTaskBtn     = document.getElementById("addTaskBtn"),
    noTask         = document.querySelector(".no-task"),
    tasksContainer = document.getElementById("tasksContainer"),
    taskError      = document.querySelector(".task-error"),
    deleteTasksBtn = document.getElementById("deleteTasks"),
    modeBtn        = document.querySelector(".mode-change label"),
    modeInput      = document.querySelector(".mode-change input");

let taskCounterElements = {
        total: document.querySelector(".status-counter .total"),
        completed: document.querySelector(".status-counter .completed"),
        pending: document.querySelector(".status-counter .pending")
    },
    taskCounter = {
        total: 0,
        completed: 0,
        pending: 0
    }

let errorMsg,
    i = 0;

// Dark Mode
if (modeInput.checked) {
    body.classList.add("light");
} else {
    body.classList.remove("light");
}
modeBtn.addEventListener("click", () => {
    body.classList.toggle("light");
});

function updateCounter() {
    let completedTasks = document.querySelectorAll(".checkTask:checked").length;
    taskCounter.completed = completedTasks;
    taskCounter.pending = taskCounter["total"] - completedTasks;
    taskCounterElements["total"].innerHTML = taskCounter["total"];
    taskCounterElements["completed"].innerHTML = taskCounter["completed"];
    taskCounterElements["pending"].innerHTML = taskCounter["pending"];
}

function taskExists(task) {
    for (t of tasksContainer.querySelectorAll(".task .task-text")) {
        if (t.textContent == task) {
            return true;
        }
    }
    return false;
}

const generateColor = () => {
    // if r & g & b are equal to 255 then color would be white, so making it 210 will decrease white color appearing
    let r = Math.ceil(Math.random()*210),
        g = Math.ceil(Math.random()*210),
        b = Math.ceil(Math.random()*210);
    return `rgb(${r}, ${g}, ${b})`;
}

const removeTask = (e) => {
    document.getElementById(e).remove();
    taskCounter.total--;
    updateCounter();
    if (taskCounter.total == 0) {
        noTask.classList.remove("d-none");
    }
    if (taskCounter.total < 2) {
        deleteTasksBtn.classList.add("d-none");
    }
}

taskInput.addEventListener('keyup', function () {
    addTaskBtn.setAttribute("disabled", "");
    taskError.classList.remove("d-none");
    if (this.value.length < 3 || this.value.length > 20) {
        errorMsg = "Task length must be between 3 and 20 character.";
    } else {
        if (!taskExists(this.value)) {
            addTaskBtn.removeAttribute("disabled");
            taskError.classList.add("d-none");
        } else {
            taskError.classList.remove("d-none");
            errorMsg = "Task already exist.";
        }
    }
    if (this.value.length == 0) {
        taskError.classList.add("d-none");
    }
    taskError.innerHTML = errorMsg;
});

addTaskBtn.addEventListener("click", function () {
    let task = taskInput.value;

    if (task != "") {
        let e = document.createElement('div');
        e.id = "task"+i;
        e.classList.add('task');
        e.style.backgroundColor = generateColor();
        e.innerHTML = `<input type="checkbox" class="checkTask" id="checkTask${i}" onchange="updateCounter()"><label for="checkTask${i}"><i class="bi"></i></label><span class="task-text">${task}</span><span class="remove-task float-end" onclick="removeTask('task${i}')"><i class="bi bi-x-circle"></i></span>`;
        tasksContainer.append(e);
        
        if (!noTask.classList.contains("d-none")) {
            noTask.classList.add("d-none")
        }
        
        taskInput.value = '';
        i++;
        taskCounter.total++;
        updateCounter();
        addTaskBtn.setAttribute("disabled", "");
    }
    
    if (taskCounter.total > 1) {
        deleteTasksBtn.classList.remove("d-none");
    }

    taskInput.focus();
});

deleteTasksBtn.addEventListener("click", function () {
    if (confirm("Do you realy want to do that?")) {
        noTask.classList.remove("d-none");
        tasksContainer.innerHTML = "";
        taskCounter.total = 0;
        updateCounter();
        this.classList.add("d-none");
    }
});