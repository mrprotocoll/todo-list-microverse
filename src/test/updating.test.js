import localStorage from '../modules/__mock__/localStorageMock.js';
import completed from '../modules/__mock__/updatingMock.js';

describe('check for updating an items completed status.', () => {
  const taskArr = [
    {
      index: 1,
      description: 'Task 1',
      completed: false,
    },
    {
      index: 2,
      description: 'Task 2',
      completed: true,
    },
    {
      index: 3,
      description: 'Task 3',
      completed: false,
    },
  ];

  test('check if task2 mark as completed', () => {
    completed(taskArr, 1);
    expect(taskArr[1].completed).toBe(false);
  });

  test('check if task2 updated in storage', () => {
    expect(localStorage.getItem('data')[1].completed).toBe(false);
  });
});