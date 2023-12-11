export interface INewsElement {
  id: number;
  isPremium: boolean;
  title: string;
  desc: string;
  img: string;
  created_at: Date;
  updated_at: Date;
  category: string[];
  like: number;
}

export interface Transaction {
  id: string;
  trans_id: number;
  type: number;
  trans_date: Date;
  status: string;
  totalPaid: number;
}
