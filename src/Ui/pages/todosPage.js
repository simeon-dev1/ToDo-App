export function renderTodosPage(project) {
  const root = document.querySelector("#root");
  console.log(project);
  root.innerHTML = `
	<div id="todo-page">
		<div id="todo-page-header">
			<div id="todo-page-heading">
				<h1>${project.name}</h1>
				<p id="todo-count-span">
					<span id="todo-count">
						${project.todos.length}
					</span>
					Todos
				</p>
			</div>
			<div id="button">
				<button id="new-todo-btn">New Todo +</button>
				<button id="home-page-btn">Home Page</button>
		</div>
		<div id="todos">
		</div>
	</div>

		<dialog id="new-todo-dialog">
			<form name="new-todo" id="new-todo-form">
				<fieldset>
					<legend>New Todo</legend>
					<div>
						<label for="name">Name*: </label>
						<input id="name" name="name" type="text" required>
					</div>
					<div>
						<label for="description">Description: </label>
						<input id="description" name="description" type="textarea" value="">
					</div>
					<div>
						<label for="due-date">Due Date</label>
						<input id="due-date" name="dueDate" type="date" required>
					</div>
					<div>
						<label for="prority">Priority(1-100)*</label>
						<input id="prority" max="100" min="0" type="number">
					</div>
				</fieldset>

				<button>Submit</button>

			</form>
		</dialog>
	`;

  if (!(project.todos.length > 0)) {
    root.innerHTML += `
			<div class="empty">
				<h3>No Todos Yet</h3>
			</div>
		`;
  } else {
    renderTodoCards(project);
  }
}

function renderTodoCards(project) {
  let todos = project.todos;
  const todosDiv = document.querySelector("#todos");
  todos.sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  todos.forEach((todo) => {
    todosDiv.innerHTML += `
			<div class="todo-card" style="border-left: 0.7rem solid ${todo.priorityColor}" data-todo-id="${todo.id}">
				<div class="todo-show">
					<div class="todo-done">
					</div>
					<h4>${todo.name}</h4>
					<div class="todo-tools">
					    <i class="fa fa-info-circle" aria-hidden="true" data-icon="info"></i>
					    <i class="fa fa-trash" aria-hidden="true" data-icon="delete"></i>
					</div>
				</div>
				<div class="todo-info" style="display: none;">
					<h5>Due Date:</h5>
					<p>${todo.dueDate}</p>
					<h5>Description:</h5>
					<p>${todo.description}</p>
				</div>
			</div>
		`;
  });
}
