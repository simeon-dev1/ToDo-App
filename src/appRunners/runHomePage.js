// APP RUNNING, DATA TRANSPORTATION AND STATE MANAGEMENT
// ALL HAPPEN HERE... FOR THE HOMEPAGE ONLY.

import { openTodos } from "./runTodosPage.js";
import { Data, Project } from "../Data/appData.js";
import { loadHomeSkeleton, HomePage } from "../Ui/pages/homePage.js";

// State (local cache)
let userProjects = [];

// Initialize with sample projects
const initSampleProjects = () => {
  const projects = [new Project("Def. Project")];
  Data.storeProjects(projects);
  return projects;
};

// Load from storage or init if empty
userProjects = Data.getStoredProjects();
if (userProjects.length === 0) {
  userProjects = initSampleProjects();
}

// ----- RENDERING -----
function renderProjects() {
  userProjects = Data.getStoredProjects(); // always fresh
  HomePage.renderProjectCards(userProjects);
}

// ----- EVENT LISTENERS -----
function initProjectEventListeners() {
  // New project button
  const newProjectBtn = document.querySelector("#new-project-btn");
  if (newProjectBtn) {
    newProjectBtn.addEventListener("click", openNewProjectDialog);
  }

  // New project form
  const newProjectDialog = document.querySelector("#new-project-dialog");
  const newProjectForm = document.querySelector("#new-project-form");
  if (newProjectForm) {
    newProjectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(newProjectForm);
      const name = formData.get("name");

      const newProject = new Project(name);
      const currentProjects = Data.getStoredProjects();
      currentProjects.push(newProject);
      Data.storeProjects(currentProjects);

      if (newProjectDialog) {
        newProjectDialog.close();
      }
      renderProjects();
    });
  }

  // Cancel button in dialog
  const cancelBtn = document.querySelector("#cancel-project-btn");
  if (cancelBtn && newProjectDialog) {
    cancelBtn.addEventListener("click", () => {
      newProjectDialog.close();
    });
  }

  // Event delegation for project cards
  const projectsContainer = document.querySelector("#projects");
  if (projectsContainer) {
    projectsContainer.addEventListener("click", (e) => {
      const projectCard = e.target.closest(".project-card");
      if (!projectCard) return;

      e.stopPropagation();
      const projectId = projectCard.dataset.id;
      const icon = e.target.dataset.icon;

      if (icon) {
        processProjectIconClick(icon, projectId);
      }
    });
  }
}

function openNewProjectDialog() {
  const dialog = document.querySelector("#new-project-dialog");
  if (dialog) dialog.showModal();
}

function processProjectIconClick(icon, projectId) {
  // Get fresh data in case it changed
  const currentProjects = Data.getStoredProjects();
  const project = currentProjects.find((p) => p.id === projectId);
  if (!project) return;

  switch (icon) {
    case "delete":
      const confirmed = confirm(
        "Are you sure you want to delete this project?",
      );
      if (confirmed) {
        Data.deleteProject(project); // now works after fixing the typo
        renderProjects();
      }
      break;
    case "edit":
      alert("Edit functionality coming soon");
      break;
    case "open":
      openTodos(project);
      break;
    default:
      console.log(`Unknown icon: ${icon}`);
  }
}

// ----- EXPORTED -----
export default () => {
  loadHomeSkeleton(); // loads the HTML (including dialog)
  initProjectEventListeners();
  renderProjects();
};
