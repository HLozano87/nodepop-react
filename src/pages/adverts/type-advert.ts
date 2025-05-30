export interface Advert extends AdvertPayload {
  id: string;
  createdAt: string;
}

export interface AdvertPayload {
  name: string;
  price: number;
  tags: string[];
  sale: boolean;
  photo?: string | null;
}
