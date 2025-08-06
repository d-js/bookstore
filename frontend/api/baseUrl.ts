import { BASE_URL, GOOGLE_BOOK_BASE_URL, TOKEN_IDENTIFIER } from "@/utils/constants/constant";
import axios from "axios";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const google = axios.create({
  baseURL: GOOGLE_BOOK_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_IDENTIFIER);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
