import localStorage from './localStorageMock.js';

const clearAllCompleted = (taskArr) => {
  taskArr.filter((tasks) => tasks.completed === false);
  taskArr.forEach((taskArr, index) => {
    taskArr.index = index + 1;
  });
  localStorage.setItem('data', taskArr);
  return taskArr;
};

export default clearAllCompleted;
