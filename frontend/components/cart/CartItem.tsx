/* eslint-disable @next/next/no-img-element */
"use client";
import { GoogleBook } from "@/types/interfaces";
import { CartItemType } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import Error from "../Error";

const CartItem = ({ bookId, bookTitle, bookPrice, quantity }: CartItemType) => {
  const queryClient = useQueryClient();

  const cachedBook = queryClient.getQueryData<GoogleBook[]>([
    "googleBooks",
    bookId,
  ]);

  if(!bookId || !bookTitle || !bookPrice || !quantity) return <Error />

  return (
    <>
      <td className="p-4 capitalize">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <img
              src={
                (cachedBook &&
                  cachedBook[0]?.volumeInfo.imageLinks?.thumbnail) ||
                "https://placehold.co/100x150"
              }
              alt={bookId.toString()}
              width={70}
              height={105}
              className="rounded-md object-cover"
            />
          </div>
          <span className="text-base font-medium">{bookTitle}</span>
        </div>
      </td>
      <td className="p-4 text-center">{`$${bookPrice}`}</td>
      <td className="p-4 text-center">{quantity}</td>
      <td className="p-4 text-center">{`$${quantity * bookPrice}`}</td>
    </>
  );
};
export default CartItem;
