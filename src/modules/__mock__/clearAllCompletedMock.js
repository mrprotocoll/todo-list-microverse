import localStorage from './localStorageMock.js';

const clearAllCompleted = (taskArr) => {
  const notCompleted = taskArr.filter((tasks) => tasks.completed === false);
  notCompleted.forEach((task, index) => {
    task.index = index + 1;
  });
  localStorage.setItem('data', notCompleted);
  return notCompleted;
};

export default clearAllCompleted;
