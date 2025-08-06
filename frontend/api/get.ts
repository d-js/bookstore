import {
  BookResponse,
  CartFormType,
  Filters,
  ProfileType,
} from "@/types/types";
import { GoogleApiResponse, GoogleBook } from "@/types/interfaces";
import { api, google } from "./baseUrl";
import dotenv from "dotenv";
import {
  API_GET_BOOKS,
  API_GET_MY_CART,
  API_GET_PROFILE,
} from "@/utils/routes/apiRoutes";

dotenv.config();

export const getBooks = async (filters: Filters): Promise<BookResponse[]> => {
  const cleanFilters = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(filters).filter(([_, v]) => v !== "")
  );
  const queryParams = new URLSearchParams(cleanFilters).toString();
  const response = await api.get(`${API_GET_BOOKS}?${queryParams}`);
  return response.data;
};

export const getBookDetails = async (bookId: number): Promise<BookResponse> => {
  const response = await api.get(`${API_GET_BOOKS}/${bookId}`);
  return response.data;
};

export const getCartDetails = async (): Promise<CartFormType> => {
  const response = await api.get(API_GET_MY_CART);
  return response.data;
};

export const getProfileDetails = async (): Promise<ProfileType> => {
  const response = await api.get(API_GET_PROFILE);
  return response.data;
};

export const fetchBooksFromGoogleAPI = async (
  query: string
): Promise<GoogleBook[]> => {
  const { data } = await google.get<GoogleApiResponse>(
    `?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_KEY}`
  );
  return data.items;
};
