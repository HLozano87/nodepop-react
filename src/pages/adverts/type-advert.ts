export interface Advert {
  id: string;
  createdAt: string;
  name: string;
  price: number;
  tags: string[];
  sale: boolean;
  photo?: string;
}
