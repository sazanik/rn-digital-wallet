import { Transaction } from '../models/Transaction';

export const checkInvalidData = (data: Transaction | null) => {
  const formattedDate = Object.values(data || {});
  if (formattedDate.length) {
    return formattedDate.some(item => !item.length);
  } else {
    return true;
  }
};
