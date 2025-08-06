import { CATEGORIES } from "@/utils/constants/constant";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "password must be at least 8 character long"),
});

export const loginResponseSchema = z.object({
  token: z.string(),
});

export const errorSchema = z.object({
  error: z.string(),
});

export const registerFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Minimum 8 characters"),
  age: z.coerce.number().int().min(12, "Minimum age is 12"),
  role: z.enum(["CUSTOMER", "RETAILER"]),
  name: z.string().min(2, "Name is too short"),
  lastname: z.string().min(2, "Last name is too short"),
  country: z.string().min(2, "Please enter a valid country"),
});

export const shippingAddressSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  address: z.string(),
  cap: z.number(),
  phone_number: z.number(),
});

export const profileFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
  country: z.string(),
  shippingAddress: shippingAddressSchema,
});

export const cartItemSchema = z.object({
  bookId: z.number().optional(),
  bookTitle: z.string().optional(),
  bookPrice: z.number().optional(),
  bookIsbn: z.string().optional(),
  quantity: z.number().optional(),
});

export const cartSchema = z.object({
  id: z.number(),
  userId: z.number(),
  books: z.array(cartItemSchema),
});

export const profileSchema = z.object({
  id: z.number(),
  name: z.string(),
  lastname: z.string(),
  email: z.string(),
  age: z.number(),
  country: z.string(),
});

export const bookGenreSchema = z.enum([
  CATEGORIES.ALL,
  CATEGORIES.HORROR,
  CATEGORIES.FANTASY,
  CATEGORIES.THRILLER,
  CATEGORIES.DOCUMENTARY,
  CATEGORIES.ADVENTURE,
  CATEGORIES.NEWS,
  CATEGORIES.DRAMMATIC,
  CATEGORIES.ROMANTIC,
  CATEGORIES.COMIC,
  CATEGORIES.CLASSIC,
  CATEGORIES.MISTERY,
  CATEGORIES.SCIENCE_FICTION,
]);

export const bookSchema = z.object({
  id: z.number(),
  title: z.string().min(6, "password must be at least 8 character long"),
  isbn: z.number(),
  price: z.number(),
  genre: bookGenreSchema,
  authorId: z.number(),
  authorName: z.string(),
  rating: z.number().min(0).max(5),
});
