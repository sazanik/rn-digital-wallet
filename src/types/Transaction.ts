export interface Transaction {
  type: 'income' | 'expense';
  amount: string;
  comment?: string;
}
