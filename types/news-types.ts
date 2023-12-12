export interface INewsElement {
  id: number;
  isPremium: boolean;
  title: string;
  desc: string;
  img: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  category: string[];
  like: number;
}
