let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let div = document.createElement("div");
        div.className = "task" + (task.done ? " done" : "");

        div.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.desc}</p>
            <button onclick="toggle(${index})">
                ${task.done ? "Desmarcar" : "Concluir"}
            </button>
            <button onclick="editTask(${index})">Editar</button>
            <button onclick="removeTask(${index})">Excluir</button>
        `;

        list.appendChild(div);
    });
}

function addTask() {
    let title = document.getElementById("taskTitle").value;
    let desc = document.getElementById("taskDesc").value;

    if (title.trim() === "") {
        alert("O título é obrigatório");
        return;
    }

    tasks.push({ title, desc, done: false });
    save();
    render();

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDesc").value = "";
}

function toggle(index) {
    tasks[index].done = !tasks[index].done;
    save();
    render();
}

function editTask(index) {
    let newTitle = prompt("Novo título:", tasks[index].title);
    if (!newTitle) return;

    let newDesc = prompt("Nova descrição:", tasks[index].desc);

    tasks[index].title = newTitle;
    tasks[index].desc = newDesc;
    save();
    render();
}

function removeTask(index) {
    if (confirm("Tem certeza que deseja excluir?")) {
        tasks.splice(index, 1);
        save();
        render();
    }
}

render();