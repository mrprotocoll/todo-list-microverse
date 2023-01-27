/**
 * @jest-environment jsdom
 */

import addItem from '../modules/__mock__/addMock.js';
import localStorage from '../modules/__mock__/localStorageMock.js';

describe('addTask', () => {
  document.body.innerHTML = '<input id="input-task" value="Project completed">';
  const taskArr = [];

  test('Should return taskArr array with object', () => {
    expect(addItem(taskArr)).toHaveLength(1);
  });

  test('LocalStorage should be updated', () => {
    expect(localStorage.getItem('data')).toHaveLength(1);
  });

  test('check the id', () => {
    expect(taskArr[0].index).toBe(1);
  });

  test('is it completed', () => {
    expect(taskArr[0].completed).toBe(false);
  });

  test('Description should have the input value', () => {
    expect(taskArr[0].description).toBe('Project completed');
  });
  
});