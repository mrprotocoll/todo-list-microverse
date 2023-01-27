const store = {};
const localStorage = {
  getItem: (key) => store[key],
  setItem: (key, value) => {
    store[key] = value;
  },
};

export default localStorage;