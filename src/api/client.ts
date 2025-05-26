import axios from "axios";
import type { CreatedUser, CreatedUserResponse } from "../utils/auth";
import { USER_ENDPOINTS } from "../utils/endpoints";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createUser = async (credentials: CreatedUser) => {
  try {
    const response = await apiClient.post<CreatedUserResponse>(
      USER_ENDPOINTS.SIGNUP,
      credentials,
    );
    return response.data;
  } catch (error) {
    console.error("Error durante la creacion de usuario: ", error);
  }
};
