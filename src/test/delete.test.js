import deleteItem from '../modules/__mock__/deleteMock.js';
import localStorage from '../modules/__mock__/localStorageMock.js';

describe('delete task', () => {
  const tasksArr = [
    {
      index: 1,
      description: 'Task 1',
      completed: false,
    },
    {
      index: 2,
      description: 'Task 2',
      completed: false,
    },
    {
      index: 3,
      description: 'Task 3',
      completed: true,
    },
  ];

  test('delete item from tasks array', () => {
    deleteItem(tasksArr, 0);
    expect(tasksArr).toHaveLength(2);
  });

  test('Check item from localstorage', () => {
    expect(localStorage.getItem('data')).toHaveLength(2);
  });

  test('Check the index of item', () => {
    expect(tasksArr[0].index).toBe(1);
  });

  test('Check the index of item', () => {
    expect(tasksArr[1].index).toBe(2);
  });

  test('Check the item description', () => {
    expect(tasksArr[0].description).toBe('Task 2');
  });

  test('Check the item description', () => {
    expect(tasksArr[1].description).toBe('Task 3');
  });
});