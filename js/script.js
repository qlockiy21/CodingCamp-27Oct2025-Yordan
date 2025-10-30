const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filterOption = document.getElementById("filter");

document.addEventListener("DOMContentLoaded", loadTodos);
todoForm.addEventListener("submit", addTodo);
todoList.addEventListener("click", handleTodoAction);
filterOption.addEventListener("change", filterTodos);

function addTodo(e) {
  e.preventDefault();
  const task = todoInput.value.trim();
  const date = dateInput.value;
  if (task === "") return;
  const todo = { id: Date.now(), text: task, date: date, completed: false };
  addTodoToDOM(todo);
  saveTodoToLocal(todo);
  todoInput.value = "";
  dateInput.value = "";
}

function addTodoToDOM(todo) {
  const li = document.createElement("li");
  li.dataset.id = todo.id;
  if (todo.completed) li.classList.add("completed");
  li.innerHTML = `
    <span>
      ${todo.text} ${todo.date ? `<small>📅 ${todo.date}</small>` : ""}
    </span>
    <div>
      <button class="done-btn">✔</button>
      <button class="delete-btn">❌</button>
    </div>
  `;
  todoList.appendChild(li);
}

function saveTodoToLocal(todo) {
  const todos = getTodosFromLocal();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromLocal() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function loadTodos() {
  const todos = getTodosFromLocal();
  todos.forEach(addTodoToDOM);
}

function handleTodoAction(e) {
  const li = e.target.closest("li");
  const todos = getTodosFromLocal();
  if (e.target.classList.contains("delete-btn")) {
    li.remove();
    const updatedTodos = todos.filter(todo => todo.id != li.dataset.id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  } else if (e.target.classList.contains("done-btn")) {
    li.classList.toggle("completed");
    const updatedTodos = todos.map(todo => {
      if (todo.id == li.dataset.id) todo.completed = !todo.completed;
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
}

function filterTodos() {
  const filterValue = filterOption.value;
  const todos = todoList.querySelectorAll("li");
  todos.forEach(li => {
    switch (filterValue) {
      case "all":
        li.style.display = "flex";
        break;
      case "completed":
        li.style.display = li.classList.contains("completed") ? "flex" : "none";
        break;
      case "uncompleted":
        li.style.display = li.classList.contains("completed") ? "none" : "flex";
        break;
    }
  });
}
