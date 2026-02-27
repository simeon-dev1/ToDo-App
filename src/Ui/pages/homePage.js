const container = document.querySelector("#root");

export function loadHomeSkeleton() {
  container.innerHTML = `
        <div id="project-header">
            <h2>Your Projects</h2>
            <button id="new-project-btn">New Project</button>
        </div>
        <div id="projects"></div>

        <!-- New Project Dialog -->
        <dialog id="new-project-dialog">
            <form id="new-project-form">
                <h3>Create New Project</h3>
                <div>
                    <label for="project-name">Project Name:</label>
                    <input type="text" id="project-name" name="name" required>
                </div>
                <!-- Optional: add description field if your Project class supports it -->
                <!-- 
                <div>
                    <label for="project-description">Description:</label>
                    <textarea id="project-description" name="description"></textarea>
                </div>
                -->
                <div class="form-actions">
                    <button type="submit">Create</button>
                    <button type="button" id="cancel-project-btn">Cancel</button>
                </div>
            </form>
        </dialog>
    `;

  // Add cancel button functionality (optional, but user-friendly)
  const cancelBtn = document.querySelector("#cancel-project-btn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      document.querySelector("#new-project-dialog").close();
    });
  }
}

export const HomePage = {
  renderProjectCards(projects) {
    const projectsDiv = document.querySelector("#projects");
    if (!projectsDiv) return false;

    // Check if projects is an array and has items
    if (!Array.isArray(projects) || projects.length === 0) {
      projectsDiv.innerHTML = `
                <div class="empty">
                    <h3>No Projects Yet</h3>
                </div>
            `;
      return false;
    }

    // Build all cards HTML at once for efficiency
    let cardsHTML = "";
    projects.forEach((project) => {
      // Use project.description or fallback to empty string
      const description = project.description || project.comment || "";
      cardsHTML += `
                <div class="project-card" data-id="${project.id}">
                    <h3>${project.name}</h3>
                    <p>${description}</p>
                    <div class="project-div-tools">
                        <i class="fas fa-trash-alt" data-icon="delete"></i>
                        <i class="fas fa-edit fa-1.5x" data-icon="edit"></i>
                        <div class="open">
                            <i class="fas fa-external-link-alt fa-2x" data-icon="open"></i>
                        </div>
                    </div>
                </div>
            `;
    });

    projectsDiv.innerHTML = cardsHTML;
    return true;
  },
};
