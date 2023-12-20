export interface User {
  id: number;
  name: string;
  email: string;
  expired_subs?: Date;
  role: string;
  password?: string;
  isPremiumUser: boolean;
  subscriptionPlan: SubscriptionPlan;
  expiredDate: Date;
  likes?: number[];
  "subscriptionPlan.expired_date"?: null;
  transactions?: Transaction;
  news: number[];
  phone: number;
  address: string;
}

export interface SubscriptionPlan {
  type: string;
  expired_date: Date;
}

export interface Transaction {
  profileId: number;
  id: number;
  type: number;
  trans_date: Date;
  status: string;
  totalPaid: number;
}
