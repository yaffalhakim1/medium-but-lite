export interface ITransaction {
  id: string;
  trans_id: number;
  type: number;
  trans_date: Date;
  status: string;
  totalPaid: number;
}
