export interface Advert {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  sale: boolean;
  photo?: string;
}
