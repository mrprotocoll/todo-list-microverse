import Todo from './Todo.js';

export default class UI {
  constructor() {
    this.task = new Todo();
    this.elements = {
      "todoList" : document.querySelector('#todo-list'),
    }
  }

  addNewTodo() {
    const form = document.getElementById('new-task-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const description = document.querySelector('#task-description');
      this.task.add(description.value);
      this.loadTodos();
      form.reset()
    });
  }

  loadTodos() {
    UI.loadContent(this.elements['todoList'],this.todoTasksTemplate(this.task.get())).then(() => {
      const todo = this.task
      const ui = this
      this.elements['todoList'].addEventListener("click", function(event) {
        const edit = event.target;
        if(edit.matches(".edit-task")){
          const row = edit.parentElement;
          const id = row.getAttribute("data-id");
          console.log(id)
          const taskDescription = edit.previousElementSibling.querySelector('.task-title').textContent;
          // change background
          row.classList.add("active")
          
          // replace content with edit field
          UI.loadContent(row,ui.editTaskTemplate(taskDescription)).then(() => {
            // set the input field to focus
            const editInput = row.querySelector(".edit-description");
            UI.focusInputField(editInput)

            //update task
            editInput.addEventListener('keypress', (event) => {
              if (event.key === 'Enter') {
                const updateTask = todo.update(id, editInput.value);
                // remove
                row.classList.remove("active")
                UI.loadContent(row,ui.taskTemplate(updateTask))
              }
            });

            // delete task
            const deleteElement = row.querySelector(".delete-task");
            deleteElement.addEventListener('click', () => {
              todo.delete(id);
              row.remove()
            });
          })
        }
      })

    });
  }

  static focusInputField (input) {
    const end = input.value.length;
    input.setSelectionRange(end, end);
    input.focus();
    input.value = input.value;
  }

  static loadContent(parentElement, content) {
    parentElement.innerHTML = content;
    return Promise.resolve();
  }

  taskTemplate = (task) => {
    return `
    <div class="task">
      <input type="checkbox" class="task-check"><span class="task-title"> ${task.description}</span>
    </div>
    <i class="fas fa-ellipsis-v pointer edit-task"></i>`
  }

  todoTasksTemplate = (tasks) => {
    let content = '';
    tasks.forEach((task) => {
      content += `<li class="row" data-id="${task.index}">${this.taskTemplate(task)}</li>`
    });
    return content;
  };

  editTaskTemplate = (value) => {
    return `<div class="task">
        <input type="checkbox" class="">
        <input type="text" value="${value.trim()}" class="input edit-description" />
      </div>
      <i class="fas delete-task fa-solid fa-trash-can pointer icon"></i>`
  }
}