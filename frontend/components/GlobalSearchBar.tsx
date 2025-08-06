"use client";

import { getBooks } from "@/api/get";
import { useBookStore } from "@/stores/book";
import { isValidFilter } from "@/types/guards";
import { BookResponse, Filters } from "@/types/types";
import { ROUTE_CATALOG, ROUTE_HOME } from "@/utils/routes/pageRoutes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const GlobalSearchBar = () => {
  const setBooks = useBookStore((state) => state.setBooks);
  const filters = useBookStore((state) => state.filters);
  const setFilter = useBookStore((state) => state.setFilter);
  const router = useRouter();

  const handleKeyDown = (field: string, value: string): void => {
    if (isValidFilter(field)) setFilter(field as keyof Filters, value);
  };

  const { data, refetch } = useQuery<BookResponse[]>({
    queryKey: ["books"],
    queryFn: () => getBooks(filters),
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      setBooks(data);
    }
  }, [data, setBooks]);

  const handleSend = (): void => {
    if (filters.contains) {
      refetch();
      router.push(ROUTE_CATALOG);
    } else router.push(ROUTE_HOME);
  };
  return (
    <div className="relative block">
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        name="contains"
        className="w-128 l-10 pl-12 py-2 bg-red-100 border-gray-300 rounded-3xl focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent transition"
        value={filters.contains}
        onChange={(e) => handleKeyDown(e.target.name, e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />
    </div>
  );
};
export default GlobalSearchBar;
