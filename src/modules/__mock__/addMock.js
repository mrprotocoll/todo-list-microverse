import localStorage from './localStorageMock.js';

const addItem = (arr) => {
  const inputText = document.getElementById('input-task');
  const item = {
    index: Number(`${arr.length + 1}`),
    description: `${inputText.value}`,
    completed: false,
  };
  arr.push(item);
  localStorage.setItem('data', arr);
  return arr;
};

export default addItem;