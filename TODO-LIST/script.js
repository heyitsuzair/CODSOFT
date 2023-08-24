const addBtn = document.getElementById("add-todo-btn");
const todoInput = document.getElementById("todo-input");
const todoItems = document.getElementById("todo-items");
const editTodoInput = document.getElementById("todoText");

const addTodo = () => {
  if (!todoInput.value) {
    return alert("Please enter a todo value");
  }
  const currentTodos = JSON.parse(localStorage.getItem("codsoft-todo-app"));
  const newTodo = { id: currentTodos.length + 1, value: todoInput.value };
  setNewTodo(newTodo);
  todoInput.value = "";
};

const setNewTodo = (newTodo) => {
  const currentTodos = JSON.parse(localStorage.getItem("codsoft-todo-app"));
  const latestTodos = [newTodo, ...currentTodos];

  localStorage.setItem("codsoft-todo-app", JSON.stringify(latestTodos));
  let html =
    `
  <div class="todo-item flex items-center my-05">
            <div class="bg-gray-200 h-10 flex items-center px-1 fw-600">
              ${newTodo.value}
            </div>
            <button onclick="deleteTodo(${newTodo.id})" class="bg-red-600 h-10 w-8 border-0 text-white">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
            <button onclick="openEditModal(${newTodo.id})" class="bg-blue-600 h-10 w-8 border-0 text-white">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
          </div>
  ` + todoItems.innerHTML;
  todoItems.innerHTML = html;
};

const onInputKeyUp = (e) => {
  if (e.keyCode === 13) {
    addTodo();
  }
};
const onEditInputKeyUp = (e) => {
  if (e.keyCode === 13) {
    saveChanges();
  }
};

addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keyup", onInputKeyUp);
editTodoInput.addEventListener("keyup", onEditInputKeyUp);

const initializeStorage = () => {
  if (!localStorage.getItem("codsoft-todo-app")) {
    localStorage.setItem("codsoft-todo-app", JSON.stringify([]));
  } else {
    const currentTodos = JSON.parse(localStorage.getItem("codsoft-todo-app"));
    let html = ``;
    currentTodos.forEach((todo) => {
      html += `
      <div class="todo-item flex items-center my-05">
                <div class="bg-gray-200 h-10 flex items-center px-1 fw-600">
                  ${todo.value}
                </div>
                <button onclick="deleteTodo(${todo.id})" class="bg-red-600 h-10 w-8 border-0 text-white">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button onclick="openEditModal(${todo.id})" class="bg-blue-600 h-10 w-8 border-0 text-white">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
              </div>
      `;
    });
    todoItems.innerHTML = html;
  }
};
initializeStorage();
const deleteTodo = (todoId) => {
  const currentTodos = JSON.parse(localStorage.getItem("codsoft-todo-app"));
  const todosAfterDeletion = currentTodos.filter((todo) => {
    return todo.id !== todoId;
  });

  let html = ``;
  todosAfterDeletion.forEach((todo) => {
    html += `
    <div class="todo-item flex items-center my-05">
              <div class="bg-gray-200 h-10 flex items-center px-1 fw-600">
                ${todo.value}
              </div>
              <button onclick="deleteTodo(${todo.id})" class="bg-red-600 h-10 w-8 border-0 text-white">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
              <button onclick="openEditModal(${todo.id})" class="bg-blue-600 h-10 w-8 border-0 text-white">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </button>
            </div>
    `;
  });
  todoItems.innerHTML = html;

  localStorage.setItem("codsoft-todo-app", JSON.stringify(todosAfterDeletion));
};

function openEditModal(todoId) {
  const modal = document.getElementById("editModal");
  const todoInput = document.getElementById("todoText");
  const hiddenInput = document.getElementById("todoId");

  // Set the todoId in the hidden input
  hiddenInput.value = todoId;

  // Fetch data for the given todoId
  const todoData = fetchTodoData(todoId);

  // Set the text input value with the fetched data
  todoInput.value = todoData.text;

  // Display the modal
  modal.style.display = "flex";
}

function saveChanges() {
  const todoInput = document.getElementById("todoText");
  const hiddenInput = document.getElementById("todoId");
  const todoId = hiddenInput.value;
  const newText = todoInput.value;

  updateTodoText(todoId, newText);
}

function closeEditModal() {
  const modal = document.getElementById("editModal");
  modal.style.display = "none";
}

function fetchTodoData(todoId) {
  const currentTodos = JSON.parse(localStorage.getItem("codsoft-todo-app"));
  const findTodo = currentTodos.find((todo) => {
    return todo.id === todoId;
  });
  return {
    text: findTodo.value,
  };
}

function updateTodoText(todoId, newValue) {
  if (!newValue) {
    return alert("Please enter a new value");
  }
  const todos = JSON.parse(localStorage.getItem("codsoft-todo-app")) || [];
  const updatedTodos = todos.map((todo) => {
    if (todo.id === parseInt(todoId)) {
      return { ...todo, value: newValue };
    }
    return todo;
  });
  localStorage.setItem("codsoft-todo-app", JSON.stringify(updatedTodos));

  let html = ``;
  updatedTodos.forEach((todo) => {
    html += `
    <div class="todo-item flex items-center my-05">
              <div class="bg-gray-200 h-10 flex items-center px-1 fw-600">
                ${todo.value}
              </div>
              <button onclick="deleteTodo(${todo.id})" class="bg-red-600 h-10 w-8 border-0 text-white">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
              <button onclick="openEditModal(${todo.id})" class="bg-blue-600 h-10 w-8 border-0 text-white">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </button>
            </div>
    `;
  });
  todoItems.innerHTML = html;

  closeEditModal();
}
