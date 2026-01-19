export const count = { current: 0 };

export function getID() {
  return crypto.randomUUID();
}

export const addTodo = (newTodo) => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          ...newTodo,
          adding: false,
          done: false,
          dateCreated: new Date(),
        }),
      5000
    );
  });
};

export const toggleTodo = (todoId, currentDone) => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          id: todoId,
          done: !currentDone,
        }),
      5000
    );
  });
};

export const deleteTodoServer = (todoId) => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          id: todoId,
        }),
      5000
    );
  });
};
