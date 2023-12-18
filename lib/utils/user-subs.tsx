export const formatExpirationDate = (expirationDate?: Date) => {
  if (expirationDate) {
    return new Date(expirationDate).toLocaleDateString();
  }
  return "N/A";
};

export const calculateNewExpiredDateForMonthly = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 30);
  return currentDate.toISOString().split("T")[0];
};

export const calculateNewExpiredDateForYearly = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 365);
  return currentDate.toISOString().split("T")[0];
};
