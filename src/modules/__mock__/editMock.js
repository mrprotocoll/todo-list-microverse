import localStorage from './localStorageMock.js';

export const update = (arr, id, value) => {
    const index = Number(id) - 1;
    arr[index].description = value;
    localStorage.setItem('data', arr);
    return arr[index];
}