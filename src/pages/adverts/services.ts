import { apiClient } from "../../api/client";
import { ADVERT_ENDPOINT } from "../../utils/endpoints";
import type { Advert } from "./type-advert";

export const getAdvertsList = async (): Promise<Advert[]> => {
  const response = await apiClient.get<Advert[]>(ADVERT_ENDPOINT.ADVERT);
  return response.data;
};

export const getAdvert = async (advertId: string): Promise<Advert[]> => {
  const response = await apiClient.get<Advert[]>(
    `${ADVERT_ENDPOINT.ADVERT_ID(advertId)}`,
  );
  return response.data;
};

export const getAdvertTags = async (): Promise<string[]> => {
  const response = await apiClient.get<string[]>(ADVERT_ENDPOINT.TAGS);
  return response.data;
};

export const createAdvert = async ({
  name,
  price,
  tags,
  sale,
  createdAt,
  photo,
}: Advert): Promise<Advert> => {
  const response = await apiClient.post<Advert>(ADVERT_ENDPOINT.ADVERT, {
    name,
    price,
    tags,
    sale,
    createdAt,
    photo,
  });
  return response.data;
};
