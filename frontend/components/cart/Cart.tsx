import { getCartDetails } from "@/api/get";
import { CartFormType } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import CartItem from "./CartItem";
import { useRouter } from "next/navigation";
import { ROUTE_CATALOG } from "@/utils/routes/pageRoutes";
import { checkout } from "@/api/post";
import { toast } from "react-toastify";
import Loading from "../Loading";
import language from "@/translations/en.json";

const Cart = () => {
  const router = useRouter();

  const { data: cartInformation } = useQuery<CartFormType>({
    queryKey: ["cart"],
    queryFn: getCartDetails,
  });

  const checkoutMutation = useMutation({
    mutationFn: checkout,
    onSuccess: (data) => {
      toast.success(`Successfully ordered. ${data}`, {
        position: "bottom-left",
        autoClose: 5000,
        theme: "colored",
      });
    },
    onError: (error) => {
      toast.error(`Unknown error at checkout. ${error}`, {
        position: "bottom-left",
        autoClose: 5000,
        theme: "colored",
      });
    },
  });

  const handleCheckout = (): void => {
    checkoutMutation.mutate();
  };

  if (!cartInformation) return <Loading />;

  return (
    <div className="flex justify-center mt-16 px-4 gap-12">
      <div className="overflow-hidden rounded-xl shadow-md w-[900px] h-[700px] bg-white">
        <table className="border-collapse w-full">
          <thead>
            <tr className="bg-gray-300 text-left text-sm font-semibold text-gray-800">
              <th className="p-4">{language.cart.title}</th>
              <th className="p-4 text-center">{language.cart.price}</th>
              <th className="p-4 text-center">{language.cart.quantity}</th>
              <th className="p-4 text-center">{language.cart.total}</th>
            </tr>
          </thead>
          <tbody>
            {cartInformation?.books?.map((item) => (
              <tr
                key={item.bookId}
                className="bg-gray-100 hover:bg-gray-200 hover:cursor-pointer"
                onClick={() => router.push(`${ROUTE_CATALOG}/${item.bookId}`)}
              >
                <CartItem key={item.bookId} {...item} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-[380px] h-[420px] p-6 bg-white rounded-xl shadow-md flex-shrink-0 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
          {language.cart.checkout}
        </h2>

        <div className="mb-6 text-sm text-gray-700 space-y-3">
          <div className="flex justify-between">
            <span>{language.cart.subtotal}</span>
            <span>
              $
              {cartInformation?.books
                ?.reduce(
                  (acc, item) =>
                    acc + (item.bookPrice || 0) * (item.quantity || 0),
                  0
                )
                .toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>{language.cart.shipping}</span>
            <span>$5.00</span>
          </div>
          <div className="border-t border-gray-300 pt-3 flex justify-between font-semibold text-gray-900 text-lg">
            <span>{language.cart.total}</span>
            <span>
              $
              {(
                (cartInformation?.books?.reduce(
                  (acc, item) =>
                    acc + (item.bookPrice ?? 0) * (item.quantity ?? 0),
                  0
                ) ?? 0) + 5
              ).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-gray-800">
            {language.cart.paymentMethod}
          </h3>
          <div className="flex flex-col gap-3 text-sm">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="creditCard"
                className="form-radio text-orange-600"
              />
              <span>{language.cart.creditCard}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="paypal"
                className="form-radio text-orange-600"
              />
              <span>{language.cart.paypal}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                className="form-radio text-orange-600"
              />
              <span>{language.cart.cashOnDelivery}</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-md transition-colors duration-300 hover:cursor-pointer"
          onClick={handleCheckout}
        >
          {language.cart.confirmAndPay}
        </button>
      </div>
    </div>
  );
};
export default Cart;
