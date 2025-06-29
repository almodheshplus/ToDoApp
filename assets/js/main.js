let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let noTask = document.querySelector(".no-task");
let tasksContainer = document.getElementById("tasksContainer");

let i = 0;

const removeTask = (e) => {
    document.getElementById(e).remove();
    if (tasksContainer.childElementCount == 0) {
        noTask.classList.remove("d-none");
    }
}

addTaskBtn.addEventListener("click", function () {
    let task = taskInput.value;

    if (task != "") {
        let e = document.createElement('div');
        e.id = "task"+i;
        e.classList.add('task');
        e.innerHTML = `<span class="task-text">${task}</span><span class="remove-task float-end" onclick="removeTask('task${i}')"><i class="bi bi-x-circle"></i></span>`;
        tasksContainer.append(e);

        if (!noTask.classList.contains("d-none")) {
            noTask.classList.add("d-none")
        }

        taskInput.value = '';
        i++;
    }
    taskInput.focus();
});