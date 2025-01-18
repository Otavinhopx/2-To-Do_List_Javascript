let contador = 0;
const addTask = document.getElementById("addTask");
const newTaskWindow = document.getElementById("newTaskWindow");
const modal = document.getElementById("modal");
const form = document.getElementById("form");
const taskArea = document.getElementById("taskArea");
const btnAdd = document.getElementById("btnAdd");
const searchBar = document.getElementById("searchBar");


if (localStorage.data) {
    taskArea.innerHTML = localStorage.data;
}


searchBar.addEventListener("input", () => {
    const searchText = searchBar.value.toLowerCase();
    const tasks = document.querySelectorAll(".task_item"); // Seleciona as tarefas dinamicamente

    tasks.forEach((task) => {
        const taskText = task.querySelector(".task_text").textContent.toLowerCase();
        if (taskText.includes(searchText)) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
});


function showTaskWindow() {
    newTaskWindow.style.display = "flex";
    modal.style.display = "block";
}


function cancel() {
    newTaskWindow.style.display = "none";
    modal.style.display = "none";
    form.value = "";
}


function newTask() {
    let valorInput = form.value.trim();
    ++contador;

    if (valorInput) {
        let newTask = `
            <div class="task_item" id="task_${contador}">
                <label class="task_content">
                    <input type="checkbox" class="filled-in" />
                    <span></span>
                    <p class="task_text">${valorInput}</p>
                    <button class="cancel_btn" onclick="deleteTask('task_${contador}')">
                        <i class="material-icons">cancel</i>
                    </button>
                </label>
            </div>
        `;

        newTaskWindow.style.display = "none";
        modal.style.display = "none";
        form.value = "";

        taskArea.innerHTML += newTask;
        localStorage.data = taskArea.innerHTML;
    } else {
        alert("Digite uma tarefa válida.");
    }
}


function deleteTask(id) {
    const task = document.getElementById(id);
    if (task) {
        task.remove();
        localStorage.data = taskArea.innerHTML;
    }
}


form.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        btnAdd.click();
    }
});
