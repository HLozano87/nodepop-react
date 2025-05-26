import { apiClient } from "../../api/client";
import type { Jwt } from "../../utils/auth";
import type { CredentialUser } from "../../utils/auth";
import { USER_ENDPOINTS } from "../../utils/endpoints";
import { storage } from "../../utils/storage";

export const login = async (credentials: CredentialUser) => {
  const response = await apiClient.post<Jwt>(USER_ENDPOINTS.LOGIN, credentials);
  const { token } = response.data;
  apiClient.defaults.headers["Authentication"] = `Bearer ${token}`;
  storage.set("auth", token);
};
