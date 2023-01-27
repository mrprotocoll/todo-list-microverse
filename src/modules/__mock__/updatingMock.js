import localStorage from './localStorageMock.js';

const completed = (task, index) => {
  task[index].completed = !task[index].completed;
  localStorage.setItem('data', task);
  return task;
};

export default completed;