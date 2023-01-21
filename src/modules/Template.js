export default class Template {
    static task = (task) => `
        <div class="task">
          <input type="checkbox" class="task-check"><span class="task-title"> ${task.description}</span>
        </div>
        <i class="fas fa-ellipsis-v pointer edit-task"></i>`

    static todoTasks = (tasks) => {
      let content = '';
      tasks.forEach((task) => {
        content += `<li class="row" data-id="${task.index}">${this.task(task)}</li>`;
      });
      return content;
    };

    static editTask = (value) => `<div class="task">
            <input type="checkbox" class="">
            <input type="text" value="${value.trim()}" class="input edit-description" />
            </div>
            <i class="fas delete-task fa-solid fa-trash-can pointer icon"></i>`
}