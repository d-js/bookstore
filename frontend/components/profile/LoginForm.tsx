"use client";

import { loginPost } from "@/api/post";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/types/zodTypes";
import language from "@/translations/en.json";
import { ErrorResponse, LoginRequest, LoginResponse } from "@/types/types";
import { TOKEN_IDENTIFIER } from "@/utils/constants/constant";
import {
  ROUTE_FORGOT,
  ROUTE_HOME,
  ROUTE_REGISTER,
} from "@/utils/routes/pageRoutes";

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginFormSchema),
  });

  const mutation = useMutation<LoginResponse, ErrorResponse, LoginRequest>({
    mutationFn: loginPost,
    onSuccess: (data): void => {
      if (data.token) {
        localStorage.setItem(TOKEN_IDENTIFIER, data.token);
      }
      router.push(ROUTE_HOME);
    },
    onError: (data: ErrorResponse) => {
      alert(
        data
          ? language.login.errors.loginFailed + data.error
          : language.fetch.errors.unknown
      );
    },
  });

  const onSubmit = (data: LoginRequest): void => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md space-y-6"
    >
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="mb-2 font-semibold text-gray-700 select-none"
        >
          {language.login.labels.email}
        </label>
        <input
          {...register("email")}
          id="email"
          type="text"
          placeholder={language.login.placeholders.email}
          className={`border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-700 transition ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="mb-2 font-semibold text-gray-700 select-none"
        >
          {language.login.labels.password}
        </label>
        <input
          {...register("password")}
          id="password"
          type="password"
          placeholder={language.login.placeholders.password}
          className={`border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-700 transition ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-orange-700 hover:bg-orange-800 text-white font-semibold py-3 rounded-md shadow transition-colors duration-200"
      >
        {language.login.buttons.login}
      </button>

      <div className="flex justify-between text-sm text-orange-700 mt-3">
        <Link href={ROUTE_FORGOT} className="hover:underline">
          {language.login.links.forgotPassword}
        </Link>
        <Link href={ROUTE_REGISTER} className="hover:underline">
          {language.login.links.signUp}
        </Link>
      </div>
    </form>
  );
};
export default LoginForm;
