import z from "zod";
import { bookGenreSchema, cartItemSchema, errorSchema } from "./zodTypes";
import {
  getBookResponse,
  getMyCartResponse,
  getMyProfileResponse,
  loginBody,
  loginResponse,
  registerBody,
} from "./orvalTypes";

// ZOD infer types

export type LoginRequest = z.infer<typeof loginBody>;
export type LoginResponse = z.infer<typeof loginResponse>;
export type RegisterRequest = z.infer<typeof registerBody>;
export type BookResponse = z.infer<typeof getBookResponse>;
export type ErrorResponse = z.infer<typeof errorSchema>;
export type BookGenre = z.infer<typeof bookGenreSchema>;
export type ProfileType = z.infer<typeof getMyProfileResponse>;
export type CartFormType = z.infer<typeof getMyCartResponse>;
export type CartItemType = z.infer<typeof cartItemSchema>;

// Zustand stores type

export type BookStore = {
  books: BookResponse[];
  filters: Filters;
  setFilter: (field: keyof Filters, value: string) => void;
  resetFilters: () => void;
  setBooks: (books: BookResponse[]) => void;
};

export type ProfileStore = {
  profileData: ProfileType | undefined;
  setProfileData: (profileData: ProfileType) => void;
};

export type CartStore = {
  cartInfo: CartFormType;
  setCartInfo: (profileData: CartFormType) => void;
};

export type Filters = {
  priceMin: string;
  priceMax: string;
  genre: string;
  contains: string;
  authorId: string;
  pagesMin: string;
  pagesMax: string;
  format: string;
  language: string;
  publisher: string;
  discountMin: string;
  discountMax: string;
  dateFrom: string;
  dateTo: string;
};
