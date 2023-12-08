export interface User {
  id: number;
  name: string;
  email: string;
  like: number[];
  expired_subs: Date;
  token: string;
  role: string;
}
