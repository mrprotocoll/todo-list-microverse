export default class Todo {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];
    this.tasks.sort((a, b) => a.index - b.index);
  }

  static toUpper(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  get() {
    return this.tasks;
  }

  set(tasks) {
    this.tasks = tasks;
  }

  add(description) {
    (this.tasks).push({
      description: Todo.toUpper(description),
      completed: false,
      index: (this.tasks.length) + 1,
    });
    this.save();
  }

  delete(id) {
    const taskIndex = Number(id) - 1;
    this.set(this.tasks.filter((task) => task.index !== Number(id)));
    // update the id of object below the removed element
    for (let i = taskIndex; i < this.tasks.length; i += 1) {
      this.tasks[i].index = i + 1;
    }
    this.save();
  }

  update(id, value) {
    const index = Number(id) - 1;
    this.tasks[index].description = value;
    this.save();
    return this.tasks[index];
  }

  statusUpdate(id) {
    const index = Number(id) - 1;
    this.tasks[index].completed = !this.tasks[index].completed;
    this.save();
  }

  clearCompleted() {
    this.set(this.tasks.filter((task) => task.completed === false));
    for (let i = 0; i < this.tasks.length; i += 1) {
      this.tasks[i].index = i + 1;
    }
    this.save();
  }

  save() {
    return localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}