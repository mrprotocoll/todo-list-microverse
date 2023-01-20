import './style.css';

const loadTasks = (tasks) => {
  let content = '';
  tasks.forEach((task) => {
    content += `<li class="row" data-id="${task.index}">
        <div class="task">
          <input type="checkbox" name="" id=""> ${task.description}
        </div>
        <div class="icon">
          <i class="fas fa-ellipsis-v"></i>
        </div>
        </li>`;
  });
  return content;
};

window.addEventListener('load', () => {
  const tasks = [
    {
      description: 'Get a car',
      completed: true,
      index: 5,
    },
    {
      description: 'Clean the house',
      completed: false,
      index: 4,
    },

  ];
  tasks.sort((a, b) => a.index - b.index);
  document.querySelector('#todo-list').innerHTML = loadTasks(tasks);
});