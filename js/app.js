const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");

let todos = JSON.parse(sessionStorage.getItem("list"))
  ? JSON.parse(sessionStorage.getItem("list"))
  : [];

if (todos.length) showTodos();

function setTodos() {
  sessionStorage.setItem("list", JSON.stringify(todos));
}

function getTime() {
  const now = new Date();
  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();
  const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Suptember",
    "October",
    "November",
    "December",
  ];
  const month_title = now.getMonth();
  fullDay.textContent = `${date}${months[month_title]}${year}`;
  hourEl.textContent = hour;
  minuteEl.textContent = minute;
  secondEl.textContent = second;
  return `${hour}:${minute}, ${date}.${month + 1}.${year}`;
}
setInterval(() => {
  getTime();
}, 1000);

function showTodos() {
  const todos = JSON.parse(sessionStorage.getItem("list"));
  listGroupTodo.innerHTML = "";
  todos.forEach((item, index) => {
    console.log(item);
    listGroupTodo.innerHTML += `
    <li ondblClick=(setCompleted(${index})) class=" justify-content-between list-group-item d-flex ${
      item.completed ? "complated" : ""
} ">
    ${item.text}
    <div class="todo-icons">
    <span class="opacity-50 me-2">${item.time}</span>
    <img onClick=(editTodo(${index})) src="./img/edit.svg" alt="edit" width="25" height="25">
    <img onClick=(deleteTodo(${index})) src="./img/delete.svg" alt="delete" width="25" height="25">
    </div>
    </li>`;
  });
}

function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;
  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  });
}

formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = e.target[0].value.trim();
  formCreate.reset();
  if (todoText.length) {
    todos.push({ text: todoText, time: getTime(), completed: false });
    setTodos();
    showTodos();
  } else {
    showMessage("message-create", "Please enter some todo");
  }
});

function deleteTodo(index) {
  const deleteTodos = todos.filter((item, i) => {
    return i !== index;
  });
  todos = deleteTodos;
  setTodos();
  showTodos();
}

function setCompleted(index) {
  const completedTodos = todos.map((item, i) =>
    index == i ? { ...item, completed: item.completed ? false : true } : item
  );
  todos = completedTodos;
  setTodos();
  showTodos();
}
function editTodo(index) {
  open();
  let editItemId = index;
}

function open() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function close() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = e.target[0].value.trim();
  console.log(todoText);
  formEdit.reset();
  if (todoText.length) {
    todos.splice(editItemId, 1, {
      text: todoText,
      time: getTime(),
      completed: false,
    });
    setTodos();
    showTodos();
    close();
  } else {
    showMessage("message-edit", "Please enter some todo");
  }
});

overlay.addEventListener("click", close);
closeEl.addEventListener("click", close);
document.addEventListener("keydown", (e) => {
  if (e.which == 192) {
    close();
  }
  console.log(e);
});
