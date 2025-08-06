"use client";

import { BookResponse } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import language from "@/translations/en.json";
import { openLibraryURL } from "@/utils/constants/constant";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GoogleBook } from "@/types/interfaces";
import { fetchBooksFromGoogleAPI } from "@/api/get";
import { ROUTE_CART, ROUTE_CATALOG } from "@/utils/routes/pageRoutes";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

import MyError from "../Error";
import { addToCart } from "@/api/patch";
import { toast } from "react-toastify";

const Book = (book: BookResponse) => {
  const router = useRouter();

  const { data: googleBookInfo } = useQuery<GoogleBook[]>({
    queryKey: ["googleBooks", book.id],
    queryFn: () => fetchBooksFromGoogleAPI(`intitle:${book.title}`),
    enabled: false,
  });

  const mutation = useMutation({
    mutationFn: () => {
      if (!book.id) throw new Error("Missing book ID");
      toast.success(
        <div className=" items-center justify-between">
          <span>{`Item ${book.title} added in your bag successfully `}</span>
          <button
            onClick={() => {
              router.push(ROUTE_CART);
            }}
            className="px-4 py-1 bg-red-100 text-white rounded-xl hover:cursor-pointer"
          >
            {language.book.goToBag}
          </button>
        </div>,
        {
          position: "bottom-left",
          autoClose: 5000,
          theme: "colored",
        }
      );
      return addToCart(book.id);
    },
  });

  const handleAddToBag = () => {
    mutation.mutate();
  };

  const handleDetailsClick = (id: number | undefined) => {
    router.push(`${ROUTE_CATALOG}/${id}`);
  };

  if (!book) return <MyError />;

  return (
    <li
      key={book.id}
      className="group flex w-full min-h-[320px] max-h-[400px] bg-red-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 gap-8"
    >
      <div
        className="relative w-[180px] h-full bg-red-200 shadow-sm p-1 rounded-2xl hover:cursor-pointer flex-shrink-0"
        onClick={() => handleDetailsClick(book.id)}
      >
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          <Image
            src={
              `${openLibraryURL}${book.isbn}-L.jpg` ||
              googleBookInfo?.[0]?.volumeInfo?.imageLinks?.thumbnail ||
              "https://placehold.co/200x400"
            }
            alt={book.title || "book cover"}
            fill
            sizes="(max-width: 768px) 100vw, 220px"
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            priority
          />
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-100 text-yellow-700 text-sm font-semibold px-3 py-1 rounded-full shadow">
          <FaStar className="text-yellow-500" />
          {book.rating && book.rating.toFixed(1)}
        </div>
      </div>

      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="flex justify-between items-center text-xs text-gray-500 mb-2 px-1">
            <span className="font-semibold">
              {language.books.isbn.toUpperCase()}: {book.isbn}
            </span>
            <span className="border border-red-300 text-red-600 rounded-full px-3 py-1 font-semibold">
              {book.genre}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 capitalize leading-snug mb-3 px-1">
            {book.title}
          </h3>
          <p className="text-base text-gray-700 capitalize mb-8 px-1">
            {book.authorName}
          </p>
          <p className="text-base text-gray-700 capitalize mb-8 px-1">
            {book.description}
          </p>
        </div>

        <div className="flex justify-between items-center px-1">
          <span className="text-xl font-extrabold text-red-700 min-w-[70px]">
            ${book.price && book.price.toFixed(2)}
          </span>

          <div className="flex gap-4">
            <button
              aria-label={language.books.addToCart}
              className="flex bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white text-sm font-semibold p-3 rounded-md transition-colors duration-200"
              onClick={handleAddToBag}
            >
              {language.book.addToBag}
              <ShoppingBagIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Book;
