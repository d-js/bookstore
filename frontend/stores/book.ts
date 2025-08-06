import { BookStore } from "@/types/types";
import { create } from "zustand";

export const useBookStore = create<BookStore>((set) => ({
  books: [],
  filters: {
    priceMin: "",
    priceMax: "",
    genre: "",
    contains: "",
    authorId: "",
    pagesMin: "",
    pagesMax: "",
    format: "",
    language: "",
    publisher: "",
    discountMin: "",
    discountMax: "",
    dateFrom: "",
    dateTo: "",
  },
  setFilter: (field, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [field]: value,
      },
    })),
  resetFilters: () =>
    set(() => ({
      filters: {
        priceMin: "",
        priceMax: "",
        genre: "",
        contains: "",
        authorId: "",
        pagesMin: "",
        pagesMax: "",
        format: "",
        language: "",
        publisher: "",
        discountMin: "",
        discountMax: "",
        dateFrom: "",
        dateTo: "",
      },
    })),

  setBooks: (newBooks) => set({ books: newBooks }),
}));
