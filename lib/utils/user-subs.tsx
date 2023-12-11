import { User } from "@/types/user-types";

export const formatExpirationDate = (expirationDate?: Date) => {
  if (expirationDate) {
    return new Date(expirationDate).toLocaleDateString();
  }
  return "N/A";
};
