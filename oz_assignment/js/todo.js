const todoInput = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoList = document.querySelector("#todo-list");

let todos = [];

const savedTodos = JSON.parse(localStorage.getItem("todos"));
if (savedTodos) {
    todos = savedTodos;
    renderTodos();
}
function renderTodos() {
    todoList.innerHTML = "";

    for (const todo of todos) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = todo;
        todoList.appendChild(li);
    };
};

function addTodo() {