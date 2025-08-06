import { Filters } from "./types";

const filterKeys: (keyof Filters)[] = [
  "priceMin",
  "priceMax",
  "genre",
  "contains",
  "authorId",
  "pagesMin",
  "pagesMax",
  "format",
  "language",
  "publisher",
  "discountMin",
  "discountMax",
  "dateFrom",
  "dateTo",
];

export const isValidFilter = (key: string): key is keyof Filters => {
  return filterKeys.includes(key as keyof Filters);
};
