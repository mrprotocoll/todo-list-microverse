import './style.css';
import UI from './modules/UI.js';

window.addEventListener('load', () => {
  const dom = new UI();

  // load todos
  dom.loadTodos();

  // add todo
  dom.addTask();

  // clear completed tasks
  dom.clearCompletedTasks();
});