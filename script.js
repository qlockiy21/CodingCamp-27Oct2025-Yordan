const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filter = document.getElementById("filter");

todoForm.addEventListener("submit", addTodo);
todoList.addEventListener("click", handleClick);
filter.addEventListener("change", filterTodo);

function addTodo(e) {
  e.preventDefault();

  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Please fill out both the task and date!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${task} - <small>${date}</small></span>
    <div>
      <button class="done-btn">✔</button>
      <button class="delete-btn">🗑</button>
    </div>
  `;
  todoList.appendChild(li);

  todoInput.value = "";
  dateInput.value = "";
}

function handleClick(e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.closest("li").remove();
  } else if (e.target.classList.contains("done-btn")) {
    e.target.closest("li").classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.querySelectorAll("li");
  todos.forEach(todo => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
        break;
      case "uncompleted":
        todo.style.display = !todo.classList.contains("completed") ? "flex" : "none";
        break;
    }
  });
}
