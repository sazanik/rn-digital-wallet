export const isEmptyObject = (object: {}) => {
  for (const key in object) {
    return false;
  }
  return true;
};
