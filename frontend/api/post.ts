import { LoginRequest, RegisterRequest } from "@/types/types";
import { api } from "./baseUrl";
import { API_POST_CHECKOUT, API_POST_LOGIN, API_POST_REGISTER } from "@/utils/routes/apiRoutes";

export const loginPost = async (credential: LoginRequest) => {
  const response = await api.post(API_POST_LOGIN, credential);
  return response.data;
};

export const registerPost = async (credential: RegisterRequest) => {
  const response = await api.post(API_POST_REGISTER, credential);
  return response.data;
};

export const checkout = async (): Promise<void> => {
  const response = await api.post(API_POST_CHECKOUT);
  return response.data;
};



