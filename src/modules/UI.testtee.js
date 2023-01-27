import Todo from './Todo.js';
import UI from './UI.js';

describe('AddItem', () => {
  // ARRANGE

  // set document mockup
  document.body.innerHTML = '<form id="new-task-form" class="row new-task-container">'
        + '<input type="text" id="task-description">'
        + '<button type="submit" class="pointer"><i class="fas fa-long-arrow-alt-left"></i></button>'
    + '</form>'
    + '<ul class="todo-list" id="todo-list"></ul>';

  const form = document.getElementById('new-task-form');
  let inputData = document.querySelector('#task-description').value;

  const todo = new Todo();
  const ui = new UI();
  // ACT

  // submit form
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // add task
  const addTask = todo.add('yes');

  // ui.loadTodos = () => {

  // }

  // test if input data is valid
  test('Test to validate input data', () => {
    inputData = 'yes';
    form.dispatchEvent(new Event('submit'));
    expect(inputData).not.toEqual('');
    expect(inputData).toBe('yes');
  });

  test('Save task', () => {
    expect(addTask).toBeCalled();
  });

  test('Expect UI add Task to be Called', () => {
    expect(ui.addTask()).toBeTruthy();
  });
});