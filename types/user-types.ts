export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  password?: string;
  like?: number[];
  isPremiumUser: boolean;
  subscriptionPlan: SubscriptionPlan;
  expiredDate: Date;
}

export interface SubscriptionPlan {
  type: string;
  expired_date: Date;
}
