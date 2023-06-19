// init the array that will sttore array of objects that it is about todo item
let TodoItems = [];
let remainToFinish = 0;
let checkAllTask = false;
let filterStatus = "freshTask";
// get dom elements
const DOM_Elements = {
  form: document.getElementById("form"),
  input: document.getElementById("task-input"),
  ul: document.getElementById("todo-lists"),
  emptyState: document.getElementById("empty-state"),
  remainItems: document.getElementById("remain-items"),
  actionContainer: document.getElementById("action-container"),
  remainItems: document.getElementById("remain-items"),
  makeAllTasksComplete: document.getElementById("make-all-tasks-complete"),
  allTask: document.getElementById("allTask"),
  freshTask: document.getElementById("freshTask"),
  completedTask: document.getElementById("completedTask"),
  clearCompletedTask: document.getElementById("clearCompletedTask"),
};

document.addEventListener("DOMContentLoaded", () => {
  // init the empty state
  toggleEmptyStateDiv();
  // init the remainToFinish
  DOM_Elements.remainItems.innerText = `${remainToFinish} left`;
  // get item from localStorage and re render for each object
  const storedTodoItems = localStorage.getItem("todoItemsRef");
  if (storedTodoItems) {
    TodoItems = JSON.parse(storedTodoItems);
    TodoItems.forEach((item) => {
      reRenderTodoLists(item);
    });
  }
});

//function to add new todo to the TodoItems array
//call reRender function in order to update the DOM
function addTask(task) {
  const todo = {
    task,
    checked: false,
    id: generateRandomID(),
  };
  TodoItems.push(todo);
  reRenderTodoLists(todo);
}

// auto random id that data type is string for each task
function generateRandomID() {
  return Math.random().toString(16).slice(2);
}

// add input from form to todolists array
DOM_Elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = DOM_Elements.input.value.trim();
  if (input !== null) {
    addTask(input);
    DOM_Elements.input.value = "";
    DOM_Elements.input.focus();
  }
});

//re-render the ul with new defined todo
function reRenderTodoLists(todo) {
  localStorage.setItem("todoItemsRef", JSON.stringify(TodoItems));

  // call the countTheLeftItems to make sure to get updat when change in TodoItems array
  countTheLeftItems();
  // call toggleEmptyStateDiv function again to ensure the display work properly
  // when re render the todoLists
  toggleEmptyStateDiv();
  const item = document.querySelector(`[data-key ='${todo.id}']`);
  // check the todo have deleted property is true and then remove that item and return
  if (todo.deleted) {
    item.remove();
    return;
  }
  const isFinished = todo.checked ? "finished-task" : "";
  const li = document.createElement("li");
  li.setAttribute("class", "todo-item ");
  li.setAttribute("data-key", todo.id);
  li.style.userSelect = "none";
  li.innerHTML = `
              <div class="item-group">
                <input id="${todo.id}" type="checkbox" class="toggleCheck" ${
    todo.checked ? "checked" : ""
  }/>
                <label for="${todo.id}">
                  <span id="task" class="spanTask ${isFinished}">${
    todo.task
  }</span>
                </label>
              </div>
              <div class="btn-group">
                <button title="edit" id="edit" class="editBtn">Edit</button>
                <button title="delete" id="delete" class="deleteBtn">Delete</button>
              </div>
            `;
  // listen click event for each list
  li.addEventListener("click", (e) => {
    const itemKey = li.dataset.key;
    if (e.target.classList.contains("toggleCheck")) {
      toggleChecked(itemKey);
    }
    if (e.target.classList.contains("deleteBtn")) {
      deleteTask(itemKey);
    }
    if (e.target.classList.contains("editBtn")) {
      const taskElement = li.querySelector("#task");
      const currentTask = taskElement.textContent;
      const newTask = prompt("Enter the new task:", currentTask);
      if (newTask !== null && newTask.trim() !== "") {
        editTask(itemKey, newTask.trim());
        taskElement.textContent = newTask.trim();
      }
    }
  });

  // replace the li item with checked item to avoid duplication the task
  if (item) {
    DOM_Elements.ul.replaceChild(li, item);
  } else {
    DOM_Elements.ul.append(li);
  }
}

//checked and make completed the task and reRenderTodoList
function toggleChecked(key) {
  const index = TodoItems.findIndex((item) => item.id == key);
  TodoItems[index].checked = !TodoItems[index].checked;
  reRenderTodoLists(TodoItems[index]);
}

// function to make all the tasks are finished and unfinished
function makeAllTasksToFinished() {
  if (checkAllTask === false) {
    TodoItems = TodoItems.map((item) => {
      item.checked = true;
      reRenderTodoLists(item);
      return {
        ...item,
      };
    });
    checkAllTask = true;
  } else {
    TodoItems = TodoItems.map((item) => {
      item.checked = false;
      reRenderTodoLists(item);
      return {
        ...item,
      };
    });
    checkAllTask = false;
  }
}

// delete task function and reRenderTodoList
function deleteTask(key) {
  const index = TodoItems.findIndex((item) => item.id == key);
  const todo = {
    deleted: true,
    ...TodoItems[index],
  };
  TodoItems = TodoItems.filter((item) => item.id != key);
  reRenderTodoLists(todo);
}

function deletedAllCheckedTasks() {
  const unCheckedTasks = TodoItems.filter((item) => !item.checked);
  DOM_Elements.ul.innerHTML = "";
  unCheckedTasks.forEach((item) => {
    reRenderTodoLists(item);
  });
  TodoItems = unCheckedTasks;
  localStorage.setItem("todoItemsRef", JSON.stringify(TodoItems));
  countTheLeftItems();
  toggleEmptyStateDiv();
}

// edite the todo
function editTask(key, newTask) {
  const index = TodoItems.findIndex((item) => item.id === key);
  TodoItems[index].task = newTask;
}

// toggle empty display state div container depend on the state of empty TodoItems
function toggleEmptyStateDiv() {
  if (TodoItems.length === 0) {
    DOM_Elements.emptyState.style.display = "flex";
  } else {
    DOM_Elements.emptyState.style.display = "none";
  }
}

// count the items that need to finished
function countTheLeftItems() {
  const remainLists = TodoItems.filter((item) => item.checked === false);
  remainToFinish = remainLists.length;
  DOM_Elements.remainItems.innerText = `${remainToFinish} left`;
}

// Filter todoLists
function filterTodoLists() {
  DOM_Elements.ul.innerHTML = "";
  switch (filterStatus) {
    case "allTask":
      TodoItems.map((item) => {
        reRenderTodoLists(item);
      });
      break;
    case "freshTask":
      const fresh = TodoItems.filter((item) => !item.checked);
      fresh.forEach((item) => {
        reRenderTodoLists(item);
      });
      break;
    case "completedTask":
      const completed = TodoItems.filter((item) => item.checked);
      completed.forEach((item) => {
        reRenderTodoLists(item);
      });
      break;
  }
}

// click event to make all the todo task are completed and unfinished by clicking check icon
DOM_Elements.makeAllTasksComplete.addEventListener("click", () => {
  makeAllTasksToFinished();
});

function setActiveBtn(element) {
  DOM_Elements.allTask.setAttribute("class", "allTaskBtn");
  DOM_Elements.freshTask.setAttribute("class", "freshTaskBtn");
  DOM_Elements.completedTask.setAttribute("class", "completedBtn");
  element.setAttribute("class", `${element.getAttribute("class")} active`);
}

function setFilterStatusAndFilter(filter) {
  filterStatus = filter;
  filterTodoLists();
}

DOM_Elements.allTask.addEventListener("click", () => {
  setActiveBtn(DOM_Elements.allTask);
  setFilterStatusAndFilter("allTask");
});

DOM_Elements.freshTask.addEventListener("click", () => {
  setActiveBtn(DOM_Elements.freshTask);
  setFilterStatusAndFilter("freshTask");
});

DOM_Elements.completedTask.addEventListener("click", () => {
  setActiveBtn(DOM_Elements.completedTask);
  setFilterStatusAndFilter("completedTask");
});

DOM_Elements.clearCompletedTask.addEventListener("click", () => {
  deletedAllCheckedTasks();
});
