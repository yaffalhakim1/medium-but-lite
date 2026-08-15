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

export const validateAddress = (value: string): string | null => {
  if (value.length < 10) {
    return "The minimum character is 10";
  }
  return null;
};

export const validateConfirmPassword = (
  value: string,
  password: string
): string | null => {
  if (value !== password) {
    return "Confirmation password didn't match";
  }
  return null;
};

// Assignment spec: title max 20 chars
export const validateTitle = (value: string): string | null => {
  if (value.length > 20) {
    return "The maximal character is 20";
  }
  return null;
};

// Assignment spec: description/content max 200 chars
export const validateContent = (value: string): string | null => {
  if (value.length > 200) {
    return "The maximal character is 200";
  }
  return null;
};
