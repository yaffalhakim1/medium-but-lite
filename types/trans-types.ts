export interface ITransaction {
  profileId: number;
  email?: string;
  id?: number;
  type: string;
  trans_date: Date;
  status: string;
  totalPaid: number;
}
