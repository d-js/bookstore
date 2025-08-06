import { useBookStore } from "@/stores/book";
import { useFilterReturn } from "@/types/interfaces";
import { useState } from "react";

const useFilter = (): useFilterReturn => {
  const [query, setQuery] = useState<string>("");
  const books = useBookStore((state) => state.books);

  const filtered = () => {
    return books.filter((book) => {
      return book.title.toLowerCase().includes(query.toLowerCase());
    });
  };

  return { query, setQuery, filtered };
};
export default useFilter;
