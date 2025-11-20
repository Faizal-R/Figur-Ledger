export const safeJsonParse = (input: string) => {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
};
