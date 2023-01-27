import localStorage from './localStorageMock.js';

const deleteItem = (taskArr, index) => {
  taskArr.splice(index, 1);
  taskArr.forEach((taskArr, index) => {
    taskArr.index = index + 1;
  });
  localStorage.setItem('data', taskArr);
  return taskArr;
};

export default deleteItem;