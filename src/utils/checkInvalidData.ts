import { Transaction } from '../models/Transaction';
import { Card } from '../models/Card';

export const checkInvalidData = (data: Transaction | Card | null) => {
  const formattedDate = Object.values(data || {});
  if (formattedDate.length) {
    return formattedDate.some(item => !item.length);
  } else {
    return true;
  }
};
