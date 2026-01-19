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
