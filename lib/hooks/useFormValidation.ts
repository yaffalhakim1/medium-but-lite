import { useState, ChangeEvent, SyntheticEvent } from "react";
import { validateEmail, validatePassword } from "../helper/validators";
interface FieldState {
  value: string;
  error: string | null;
}

interface ValidationRules {
  [key: string]: (value: string) => string | null;
}

interface UseFormValidation {
  fields: Record<string, FieldState>;
  setField: (name: string, value: string) => void;
  handleFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
  validateForm: () => boolean;
}

export const useFormValidation = (
  validationRules: ValidationRules
): UseFormValidation => {
  const initialFields: Record<string, FieldState> = Object.fromEntries(
    Object.keys(validationRules).map((key) => [key, { value: "", error: null }])
  );
  const [fields, setFields] =
    useState<Record<string, FieldState>>(initialFields);

  const setField = (name: string, value: string): void => {
    setFields((prevFields) => ({
      ...prevFields,
      [name]: { value, error: null },
    }));
  };

  const validateField = (name: string, value: string): void => {
    const rule = validationRules[name];
    if (rule) {
      setFields((prevFields) => ({
        ...prevFields,
        [name]: { value, error: rule(value) },
      }));
    }
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setField(name, value);
    validateField(name, value);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    Object.keys(fields).forEach((name) => {
      validateField(name, fields[name].value);
      if (fields[name].error) {
        isValid = false;
      }
    });
    return isValid;
  };

  return {
    fields,
    setField,
    handleFieldChange,
    validateForm,
  };
};
