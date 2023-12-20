export interface ITransaction {
  profileId: number;
  id?: number;
  type: string;
  trans_date: Date;
  status: string;
  totalPaid: number;
}
