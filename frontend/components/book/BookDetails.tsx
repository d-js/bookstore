"use client";

import { getBookDetails } from "@/api/get";
import { BookResponse } from "@/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GoogleBook } from "@/types/interfaces";
import Image from "next/image";
import { openLibraryURL } from "@/utils/constants/constant";
import language from "@/translations/en.json";

const BookDetails = ({ bookId }: { bookId: number }) => {
  const queryClient = useQueryClient();
  const cachedBook: GoogleBook[] | undefined = queryClient.getQueryData<
    GoogleBook[]
  >(["googleBooks", bookId]);
  const { data } = useQuery<BookResponse>({
    queryKey: ["bookDetails", bookId],
    queryFn: () => getBookDetails(bookId),
  });

  return (
    <div className="h-[850px] bg-gray-50 px-4 py-8 flex justify-center">
      <div className="w-full max-w-[1600px] bg-white rounded-xl shadow-xl flex flex-row gap-12 p-8">
        <div className="flex-shrink-0 w-[450px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={
              `${openLibraryURL}${data?.isbn}-L.jpg` ||
              cachedBook?.[0]?.volumeInfo?.imageLinks?.thumbnail ||
              "https://placehold.co/450x675"
            }
            alt={data?.title || "Book cover"}
            width={450}
            height={675}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
            priority
          />
        </div>

        <div className="flex flex-col flex-1 max-h-[85vh] overflow-hidden">
          <h1 className="text-4xl font-extrabold text-orange-600 leading-tight mb-3 capitalize tracking-wide truncate">
            {data?.title}
          </h1>
          <p className="text-lg text-gray-600 mb-6 truncate">
            {language.bookDetails.writtenBy}

            <span className="font-semibold text-gray-800">
              {data?.authorName || "Unknown Author"}
            </span>
          </p>

          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400 mr-3 space-x-0.5">
              {[...Array(5)].map((_, i) => {
                const rating = data?.rating ?? 0;
                return (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(rating) ? "fill-current" : "stroke-current"
                    }`}
                    fill={i < rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                );
              })}
            </div>
            <span className="text-gray-600 text-sm font-medium select-none">
              {data?.rating?.toFixed(1) ?? "N/A"} / 5
            </span>
          </div>

          <div className="flex items-center gap-5 mb-8">
            <span className="text-4xl font-extrabold text-red-600 tracking-tight">
              ${data?.price?.toFixed(2) ?? "--"}
            </span>
            {data?.discount && data.discount > 0 && (
              <span className="text-sm font-semibold text-green-700 bg-green-100 rounded-full px-4 py-1 select-none">
                -{Math.round(data.discount * 100)}%
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-5 mb-10">
            <button
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg px-7 py-4 shadow-md transition-shadow duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
              onClick={() => {}}
            >
              {language.bookDetails.addToCart}
            </button>
            <button
              className="w-full sm:w-auto border border-orange-600 text-orange-600 font-semibold rounded-lg px-7 py-4 hover:bg-orange-50 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200"
              onClick={() => {}}
            >
              {language.bookDetails.buyNow}
            </button>
          </div>

          <section className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap overflow-y-auto border-t border-gray-200 pt-5 px-4 bg-orange-50/20 rounded-md max-h-[25vh] scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 tracking-wide">
              {language.bookDetails.description}
            </h2>
            <p>{data?.description || "No description available."}</p>
          </section>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-10 text-sm text-gray-600 overflow-auto max-h-[22vh]">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <p className="mb-3">
                <span className="font-semibold text-gray-800">
                  {language.bookDetails.information.genre}
                </span>
                {data?.genre ?? "-"}
              </p>
              <p className="mb-3">
                <span className="font-semibold text-gray-800">
                  {language.bookDetails.information.format}
                </span>
                {data?.format ?? "-"}
              </p>
              <p className="mb-3">
                <span className="font-semibold text-gray-800">
                  {language.bookDetails.information.language}
                </span>
                {data?.language ?? "-"}
              </p>
              <p>
                <span className="font-semibold text-gray-800">
                  {language.bookDetails.information.pages}
                </span>
                {data?.pages ?? "-"}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <p className="mb-3">
                <span className="font-semibold text-gray-800">
                  {language.bookDetails.information.isbn}
                </span>
                {data?.isbn ?? "-"}
              </p>
              <p className="mb-3">
                <span className="font-semibold text-gray-800">
                  {language.bookDetails.information.publisher}
                </span>
                {data?.publisher ?? "-"}
              </p>
              <p className="mb-3">
                <span className="font-semibold text-gray-800">
                  {language.filterBar.buttons.reset}
                </span>
                {data?.publicationDate
                  ? new Date(data.publicationDate).toLocaleDateString()
                  : "-"}
              </p>
              <p>
                <span className="font-semibold text-gray-800">
                  {language.bookDetails.information.authorId}
                </span>
                {data?.authorId ?? "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
