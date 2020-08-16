const toDoTitle = document.querySelector(".toDoTitle"),
  toDoDue = document.querySelector(".toDoDue"),
  toDoList = document.querySelector(".toDoList"),
  toDoInfoForm = document.querySelector(".toDoInfoForm"),
  TODO_LS = "toDos";
let numberOfSubmit = 0,
  toDos = [];

function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function handledelBtn() {
  const delBtn = event.target;
  const li = delBtn.parentNode;
  toDoList.removeChild(li);
  const updatedToDos = toDos.filter((todo) => {
    return todo.id !== parseInt(li.id);
  });
  toDos = updatedToDos;
  saveToDos();
}

function paintToDos(toDoIn, dueIn) {
  const newID = numberOfSubmit;
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  span.innerText = `${toDoIn} (~${dueIn})`;
  delBtn.innerHTML = "❎";
  delBtn.addEventListener("click", handledelBtn);
  // delBtn.classList.add(delBtn);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newID;
  toDoList.appendChild(li);
  const toDoInfo = { id: newID, title: toDoIn, due: dueIn };
  toDos.push(toDoInfo);
  saveToDos();
  numberOfSubmit = numberOfSubmit + 1;
}

function handlesubmit(event) {
  event.preventDefault();
  const toDoIn = toDoTitle.value;
  const dueIn = toDoDue.value;
  paintToDos(toDoIn, dueIn);
}

function loadToDos() {
  const loadedToDo = localStorage.getItem(TODO_LS);
  if (loadedToDo !== null) {
    const parsedToDo = JSON.parse(loadedToDo);
    parsedToDo.forEach(function (toDo) {
      paintToDos(toDo.title, toDo.due);
    });
  } else {
  }
}
function init() {
  loadToDos();
  toDoInfoForm.addEventListener("submit", handlesubmit);
}
init();
