import { renderTodosPage } from "../Ui/pages/todosPage.js";
import { Data } from "../Data/appData.js";
import { Utils } from "../Utils/appUtils.js";
import { Todo } from "../Data/appData.js";
import runHomePage from "./runHomePage.js";

export const openTodos = function (project) {
  const projectId = project.id;
  renderTodosPage(project);
  initEventListeners(project, projectId);
};

function initEventListeners(project, projectId) {
  // New Todo button
  const newTodoBtn = document.querySelector("#new-todo-btn");
  if (newTodoBtn) {
    newTodoBtn.addEventListener("click", openNewTodoDialog);
  }

  const homePageBtn = document.querySelector("#home-page-btn");
  homePageBtn.addEventListener("click", () => {
    runHomePage();
  });

  // New Todo form submission
  const newTodoDialog = document.querySelector("#new-todo-dialog");
  const newTodoForm = document.querySelector("#new-todo-form");
  if (newTodoForm) {
    newTodoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(newTodoForm);

      const name = formData.get("name");
      const description = formData.get("description");
      const dueDate = formData.get("dueDate");
      const priorityNum = formData.get("priority");

      const priorityColor = Utils.getPriorityColor(priorityNum);
      const parentProject = project;

      const newTodo = new Todo(
        name,
        description,
        dueDate,
        priorityColor,
        parentProject,
      );
      Data.addNewTodo(newTodo);

      if (newTodoDialog) {
        newTodoDialog.close();
      }
      refreshPage(projectId);
    });
  }

  // Cancel button (optional)
  const cancelBtn = document.querySelector("#cancel-todo-btn");
  if (cancelBtn && newTodoDialog) {
    cancelBtn.addEventListener("click", () => {
      newTodoDialog.close();
    });
  }

  // Event delegation for todo cards
  const todosContainer = document.querySelector("#todos");
  if (todosContainer) {
    todosContainer.addEventListener("click", (e) => {
      const todoCard = e.target.closest(".todo-card");
      if (!todoCard) return;

      e.stopPropagation();
      const todoId = todoCard.dataset.todoId;
      const icon = e.target.dataset.icon;

      if (icon) {
        processIconClick(icon, todoId, projectId, todoCard);
      }
    });
  }
}

function openNewTodoDialog() {
  const dialog = document.querySelector("#new-todo-dialog");
  if (dialog) dialog.showModal();
}

function processIconClick(icon, todoId, projectId, todoCard) {
  if (!todoId) return;

  const todo = Data.getTodoById(todoId);
  if (!todo) return;

  switch (icon) {
    case "delete":
      Data.deleteTodo(todo);
      refreshPage(projectId);
      break;
    case "info":
      toggleTodoInfo(todoCard);
      break;
    default:
      console.log(`Unknown icon: ${icon}`);
  }
}

function toggleTodoInfo(todoCard) {
  const infoSection = todoCard.querySelector(".todo-info");
  const infoIcon = todoCard.querySelector(".fa-info-circle");

  if (!infoSection) return;

  // Simple toggle of display property
  if (infoSection.style.display === "none" || !infoSection.style.display) {
    infoSection.style.display = "block";
    if (infoIcon) infoIcon.style.color = "blue";
  } else {
    infoSection.style.display = "none";
    if (infoIcon) infoIcon.style.color = "";
  }
}

function refreshPage(projectId) {
  const currentProjects = Data.getStoredProjects();
  const openProject = Data.getProjectById(projectId);

  if (openProject) {
    openTodos(openProject);
  } else {
    console.error(`Project with ID ${projectId} not found`);
  }
}
