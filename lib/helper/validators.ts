export const validateEmail = (value: string): string | null => {
  if (!value.includes("@") || !value.includes(".")) {
    return "Email must include @ symbol";
  }
  return null;
};

export const validatePassword = (value: string): string | null => {
  if (value.length < 8) {
    return "The minimum character is 8";
  }
  return null;
};

export const validateName = (value: string): string | null => {
  if (value.length < 2) {
    return "The minimum character is 2";
  }
  return null;
};

export const validatePhone = (value: string): string | null => {
  if (value.length < 10 || value.length > 12) {
    return "The minimum character is 10 and maximum is 12";
  }
  return null;
};

export const validateTitle = (value: string): string | null => {
  if (value.length > 15) {
    return "The maximal character is 15";
  }
  return null;
};

export const validateContent = (value: string): string | null => {
  if (value.length > 2000) {
    return "The maximal character is 2000";
  }
  return null;
};
