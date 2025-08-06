"use client";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

// FIXME

import Link from "next/link";
import language from "@/translations/en.json";
import {
  ROUTE_CART,
  // ROUTE_CATALOG,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_PROFILE,
  ROUTE_REGISTER,
} from "@/utils/routes/pageRoutes";
import GlobalSearchBar from "./GlobalSearchBar";

const Navbar = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex items-center px-6 py-4 border-b border-red-200 bg-red-50 text-gray-800 text-base font-semibold tracking-wide z-50">
        <Link
          href={ROUTE_HOME}
          className="transition-colors duration-200 hover:text-red-600 capitalize text-xl"
        >
          {language.pages.labels.home}
        </Link>
        <div className="ml-16">
          <GlobalSearchBar />
        </div>
        <div className="flex justify-end w-full">
          <Link
            href={ROUTE_LOGIN}
            className="hover:bg-orange-900 hover:cursor-pointer py-2 px-4 border-l-2 border-bg-orange-900 rounded-l-3xl  bg-orange-700 text-white transition"
          >
            {language.pages.labels.login}
          </Link>
          <Link
            href={ROUTE_REGISTER}
            className="hover:bg-orange-900 hover:cursor-pointer border-l-2 border-orange-900 py-2 px-4 rounded-r-3xl bg-orange-700 text-white transition"
          >
            {language.pages.labels.register}
          </Link>

          <Link href={ROUTE_CART} aria-label="Profile">
            <ShoppingBagIcon className="ml-5 w-9 h-9 text-red-400 hover:text-red-700 transition-colors duration-200" />
          </Link>
          <Link href={ROUTE_PROFILE} aria-label="Profile">
            <UserCircleIcon className="ml-5 w-9 h-10 text-red-400 hover:text-red-700 transition-colors duration-200" />
          </Link>
        </div>
      </nav>
      <div style={{ height: "64px" }}></div>
    </>
  );
};
export default Navbar;
