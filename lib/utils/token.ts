const rand = function () {
  return Math.random().toString(36);
};

export const token = function () {
  return rand() + rand();
};
