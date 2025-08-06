"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerFormSchema } from "@/types/zodTypes";
import { registerPost } from "@/api/post";
import { ErrorResponse, LoginResponse, RegisterRequest } from "@/types/types";

import language from "@/translations/en.json";
import { TOKEN_IDENTIFIER } from "@/utils/constants/constant";
import { ROUTE_HOME } from "@/utils/routes/pageRoutes";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerFormSchema),
  });

  const mutation = useMutation<LoginResponse, ErrorResponse, RegisterRequest>({
    mutationFn: registerPost,
    onSuccess: (data) => {
      localStorage.setItem(TOKEN_IDENTIFIER, data.token);
      router.push(ROUTE_HOME);
    },
    onError: (data: ErrorResponse) => {
      alert(language.register.errors.registerFailed + ": " + data.error);
    },
  });

  const onSubmit = (data: RegisterRequest): void => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md space-y-6"
    >
      <div>
        <label className="block mb-2 font-semibold text-gray-700 select-none">
          {language.register.labels.email}
        </label>
        <input
          type="email"
          {...register("email")}
          placeholder={language.register.placeholders.email}
          className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-700 transition ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700 select-none">
          {language.register.labels.password}
        </label>
        <input
          type="password"
          {...register("password")}
          placeholder={language.register.placeholders.password}
          className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-700 transition ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700 select-none">
          {language.register.labels.age}
        </label>
        <input
          type="number"
          {...register("age")}
          placeholder={language.register.placeholders.age}
          className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-700 transition ${
            errors.age ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700 select-none">
          {language.register.labels.name}
        </label>
        <input
          type="text"
          {...register("name")}
          placeholder={language.register.placeholders.name}
          className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-700 transition ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700 select-none">
          {language.register.labels.lastname}
        </label>
        <input
          type="text"
          {...register("lastname")}
          placeholder={language.register.placeholders.lastname}
          className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-700 transition ${
            errors.lastname ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.lastname && (
          <p className="mt-1 text-sm text-red-600">{errors.lastname.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700 select-none">
          {language.register.labels.country}
        </label>
        <input
          type="text"
          {...register("country")}
          placeholder={language.register.placeholders.country}
          className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-700 transition ${
            errors.country ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.country && (
          <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700 select-none">
          {language.register.labels.role}
        </label>
        <select
          {...register("role")}
          className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-700 transition ${
            errors.role ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value={language.register.roles.CUSTOMER.toUpperCase()}>
            {language.register.roles.CUSTOMER}
          </option>
          <option value={language.register.roles.RETAILER.toUpperCase()}>
            {language.register.roles.RETAILER}
          </option>
        </select>
        {errors.role && (
          <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-orange-700 hover:bg-orange-800 text-white font-semibold py-3 rounded-md shadow transition duration-200"
      >
        {language.register.buttons.submit}
      </button>
    </form>
  );
}
