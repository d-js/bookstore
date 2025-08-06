"use client";

import Book from "./Book";
import language from "@/translations/en.json";
import { useBookStore } from "@/stores/book";

const BookList = () => {
  const filteredBooks = useBookStore((state) => state.books);

  console.log(filteredBooks)
  return (
    <>
      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500 mt-4 ml-[380px]">
          {language.books.filterError}
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 p-6 ml-[380px]">
          {filteredBooks.map((book) => (
            <Book key={book.id} {...book} />
          ))}
        </ul>
      )}
    </>
  );
};

export default BookList;
