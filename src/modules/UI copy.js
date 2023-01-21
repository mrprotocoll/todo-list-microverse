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
      this.elements['todoList'].addEventListener("click", function(event) {
        if(event.target.matches(".edit-task")){
          // remove task
          const todo = this.task
          console.log()
          const edit = event.target;
          // Array.from(editTask).forEach((edit) => {
            edit.addEventListener('click', () => {
              const row = edit.parentElement;
              const id = row.getAttribute("data-id");
              
              const taskDescription = edit.previousElementSibling.querySelector('.task-title').textContent;
              
              // change background
              row.classList.add("active")
              
              // replace content with edit field
              UI.loadContent(row,this.editTaskTemplate(taskDescription)).then(() => {
                // set the input field to focus
                const editInput = row.querySelector(".edit-description");
                UI.focusInputField(editInput)

                //update task
                editInput.addEventListener('keypress', (event) => {
                  if (event.key === 'Enter') {
                    const updateTask = this.task.update(id, editInput.value);
                    // remove
                    row.classList.remove("active")
                    UI.loadContent(row,this.taskTemplate(updateTask))
                  }
                });
              })

              // this.task.remove(remove.getAttribute('data-id'));
              // this.loadTodos();
            });
          // });
        }
      })
      

      // delete task

      // edit task
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
    <button data-id="${task.index}" class="icon edit-task">
      <i class="fas fa-ellipsis-v pointer"></i>
    </button>`
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
        <input type="text" value="${value}" class="input edit-description" >
      </div>
      <button data-id="" type="submit" class="pointer icon delete-task">
        <i class="fas fa-solid fa-trash-can"></i>
      </button>`
  }
}