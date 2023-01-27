// Obtém o elemento com id "add-task-button"
const addTaskButton = document.getElementById("add-task-button");

// Obtém o elemento com id "task-list"
const taskList = document.getElementById("task-list");

let taskSave = [];

// Carrega as tarefas salvas no localStorage
const savedTasks = JSON.parse(localStorage.getItem("tasks"));
if (savedTasks) {
    taskSave = savedTasks;
    // Adiciona cada tarefa salva na lista de tarefas
    savedTasks.forEach(function (task) {
        addTaskToList(task);
    });
}

// Adiciona um evento de clique no botão "add-task-button"
addTaskButton.addEventListener("click", function () {
    // Obtém o valor do input "task"
    const task = document.getElementById("task").value;
    if (!task) return; // se o campo estiver vazio, sai da função

    // Adiciona o valor do input "task" à array de tarefas
    taskSave.push(task);

    addTaskToList(task);

    // Salva a array de tarefas no localStorage
    localStorage.setItem("tasks", JSON.stringify(taskSave));

    // Limpa o valor do input "task"
    document.getElementById("task").value = "";
});

// Adiciona um evento de quando a tecla é solta, verifica se é enter, se for chama o evento de clique do botão "add-task-button"
document.getElementById("task").addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
        event.preventDefault(); // previne o comportamento padrão de submit do formulário
        addTaskButton.click();
    }
});

function addTaskToList(task) {
    // Cria um novo elemento <li>
    const newTask = document.createElement("li");
    // Adiciona o conteúdo da tarefa ao elemento <li>
    newTask.innerHTML = task;

    // Adiciona o novo elemento <li> na lista de tarefas
    taskList.appendChild(newTask);

    // Cria um novo elemento <button>
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    // Adiciona o texto "Apagar" ao elemento <button>
    deleteButton.innerHTML = "Apagar";

    // Adiciona o elemento <button> ao elemento <li>
    newTask.appendChild(deleteButton);

    // Adiciona um evento de clique no botão "Apagar"
    deleteButton.addEventListener("click", function () {
        // Remove o elemento <li> da lista de tarefas
        taskList.removeChild(newTask);

        // Atualiza a array de tarefas salvas
        taskSave = taskSave.filter(function (savedTask) {
            return savedTask !== task;
        });

        // Salva a array de tarefas atualizada no localStorage
        localStorage.setItem("tasks", JSON.stringify(taskSave));
    });
}    
