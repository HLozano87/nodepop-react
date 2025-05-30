export interface Advert {
  id: string;
  createdAt: string;
  name: string;
  price: number;
  tags: string[];
  sale: boolean;
  photo?: string;
}

export interface AdvertPayload {
  name: string;
  price: number;
  tags: string[];
  sale: boolean;
  photo?: string | null;
}
