export const VALID_ANIMALS = [
  "fox",
  "cat",
  "penguin",
  "rabbit",
  "turtle",
  "bear",
  // "dolphin",
  // "mouse",
  // "squirrel",
  // "seal",
]; // ? only these images will be shown

export const shuffleRandomly = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
export const SUCCESS_MESSAGES = ["Nice!", "Good job!", "Awesome!"];
export const FAIL_MESSAGES = ["Oh no!", "Dang!", "You're almost there!"];
