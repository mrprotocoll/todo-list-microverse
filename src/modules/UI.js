import Todo from './Todo.js';
import Template from './Template.js';

export default class UI {
  constructor() {
    this.task = new Todo();
    this.elements = {
      todoList: document.querySelector('#todo-list'),
    };
  }

  addNewTodo() {
    const form = document.getElementById('new-task-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const description = document.querySelector('#task-description');
      if (description.value) {
        this.task.add(description.value);
        this.loadTodos();
        form.reset();
      }
    });
  }

  loadTodos() {
    UI.loadContent(this.elements.todoList, Template.todoTasks(this.task.get())).then(() => {
      const todo = this.task;
      const ui = this;
      this.elements.todoList.addEventListener('click', (event) => {
        const edit = event.target;
        if (edit.matches('.edit-task')) {
          const row = edit.parentElement;
          const id = row.getAttribute('data-id');
          const taskDescription = edit.previousElementSibling.querySelector('.task-title').textContent;
          // change background
          row.classList.add('active');

          // replace content with edit field
          UI.loadContent(row, Template.editTask(taskDescription)).then(() => {
            // set the input field to focus
            const editInput = row.querySelector('.edit-description');
            UI.focusInputField(editInput);
            // update task
            editInput.addEventListener('keypress', (event) => {
              if (event.key === 'Enter' && editInput.value) {
                const updateTask = todo.update(id, editInput.value);
                // remove
                row.classList.remove('active');
                UI.loadContent(row, Template.task(updateTask)).then(() => {
                  UI.changeStatus(todo, ui);
                });
              }
            });

            // delete task
            const deleteElement = row.querySelector('.delete-task');
            deleteElement.addEventListener('click', () => {
              todo.delete(id);
              row.remove();
            });
          });
        }
      });
      // change status
      UI.changeStatus(todo, ui);
    });
  }

  static focusInputField(input) {
    const end = input.value.length;
    input.setSelectionRange(end, end);
    input.focus();
  }

  static loadContent(parentElement, content) {
    parentElement.innerHTML = content;
    return Promise.resolve();
  }

  static changeStatus(todo, ui) {
    Array.from(document.querySelectorAll('.task-check')).forEach((status) => {
      status.addEventListener('change', function _() {
        todo.statusUpdate(this.getAttribute('data-id'));
        ui.loadTodos();
      });
    });
  }

  clearCompletedTasks() {
    document.querySelector('#clear-completed').addEventListener('click', (e) => {
      e.preventDefault();
      this.task.clearCompleted();
      this.loadTodos();
    });
  }
}