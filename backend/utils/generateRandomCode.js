export const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * (999999 - 100000 + 1)).toString();
};
