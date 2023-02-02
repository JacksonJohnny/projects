// Obtém o elemento HTML com id "add-task-button" (botão para adicionar tarefas)
const addTaskButton = document.getElementById("add-task-button");

// Obtém o elemento HTML com id "task-list" (lista de tarefas)
const taskList = document.getElementById("task-list");

let taskSave = []; // array para armazenar as tarefas

// Carrega as tarefas salvas no localStorage (armazenamento do navegador)
const savedTasks = JSON.parse(localStorage.getItem("tasks"));
if (savedTasks) {
    taskSave = savedTasks;
    // Adiciona cada tarefa salva na lista de tarefas
    savedTasks.forEach(addTaskToList);
}

// Adiciona um evento de clique no botão "add-task-button" (quando o botão é clicado, chama a função addTask)
addTaskButton.addEventListener("click", addTask);

// Adiciona um evento de quando a tecla é solta, verifica se é enter, se for chama o evento de clique do botão "add-task-button"
document.getElementById("task").addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
        event.preventDefault(); // previne o comportamento padrão de submit do formulário
        addTask();
    }
});

// Função para adicionar uma nova tarefa
function addTask() {
    // Obtém o valor do input "task" (campo de texto para adicionar uma nova tarefa)
    const task = document.getElementById("task").value;
    if (!task) return; // se o campo estiver vazio, sai da função

    // Adiciona o valor do input "task" à array de tarefas
    taskSave.push(task);

    addTaskToList(task);

    // Salva a array de tarefas no localStorage
    localStorage.setItem("tasks", JSON.stringify(taskSave));

    // Limpa o valor do input "task"
    document.getElementById("task").value = "";
}

// Função para adicionar uma tarefa na lista de tarefas
function addTaskToList(task) {
    // Cria um novo elemento <li> (item da lista)
    const newTask = document.createElement("li");
    // Adiciona o conteúdo da tarefa ao elemento <li>
    newTask.innerHTML = task;

    // Adiciona o novo elemento <li> na lista de tarefas
    taskList.appendChild(newTask);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button", "btn-close");

    // Adiciona o elemento <button> ao elemento <li>
    newTask.appendChild(deleteButton);

    // Adiciona um evento de clique no botão "Apagar"
    deleteButton.addEventListener("click", function () {
        // Remove o elemento <li> da lista de tarefas
        taskList.removeChild(newTask);
        // Remove a tarefa da array de tarefas salvas
        const taskIndex = taskSave.indexOf(task);
        taskSave.splice(taskIndex, 1);
        // Salva a array de tarefas no localStorage
        localStorage.setItem("tasks", JSON.stringify(taskSave));
    });
}
