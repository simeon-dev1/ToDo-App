// data/projectData.js
export const Data = {
  getStoredProjects() {
    const data = localStorage.getItem("userProjects");
    return data ? JSON.parse(data) : [];
  },

  getProjectById(projectId) {
    const currentProjects = this.getStoredProjects(); // Fixed: added 'this' and const
    return currentProjects.find((project) => project.id === projectId);
  },

  storeProjects(projects) {
    localStorage.setItem("userProjects", JSON.stringify(projects));
  },

  clearProjects() {
    localStorage.removeItem("userProjects");
  },

  deleteProject(project) {
    const userProjects = this.getStoredProjects();
    const updatedProjects = userProjects.filter((p) => p.id !== project.id);
    this.storeProjects(updatedProjects);
  },

  addNewTodo(newTodo) {
    const todoParentProject = newTodo.parentProject;
    const userProjects = this.getStoredProjects(); // Fixed: use this.getStoredProjects()
    const project = userProjects.find((p) => p.id === todoParentProject.id);

    if (project) {
      project.todos.push(newTodo);
      this.storeProjects(userProjects);
    }
  },

  getTodoById(todoId) {
    const userProjects = this.getStoredProjects();

    for (const project of userProjects) {
      const todo = project.todos.find((t) => t.id === todoId);
      if (todo) return todo;
    }

    return null; // Not found
  }, // Added missing comma

  deleteTodo(todo) {
    const todosProject = todo.parentProject;
    const userProjects = this.getStoredProjects(); // Fixed: use this.getStoredProjects()
    const parentProject = userProjects.find((p) => p.id === todosProject.id);

    if (parentProject) {
      const todoIndex = parentProject.todos.findIndex((t) => t.id === todo.id);
      if (todoIndex !== -1) {
        parentProject.todos.splice(todoIndex, 1);
        this.storeProjects(userProjects);
      }
    }
  },
};

export class Project {
  id = crypto.randomUUID();
  todos = [];

  constructor(name, comment = "No comment") {
    this.name = name; // Fixed: removed template string
    this.comment = comment; // Fixed: removed template string
  }
}

export class Todo {
  id = crypto.randomUUID();
  createdAt = Date.now();
  done = false;

  constructor(
    name,
    description = "No description",
    dueDate,
    priorityColor,
    parentProject,
  ) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priorityColor = priorityColor;
    this.parentProject = parentProject;
  }
}
