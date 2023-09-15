"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { authlogout } from "@/redux/features/auth.slice";

export default function NavBar() {
  const [isLoggin, setisLoggin] = React.useState(false);
  const userEmail = useAppSelector(
    (state: RootState) => state.authentication.userInfo?.email
  );
  const dispatch = useAppDispatch();

  useEffect((): void => {
    if (userEmail) {
      setisLoggin(true);
    }
  }, [userEmail]);

  const router = useRouter();

  const logout = () => {
    setisLoggin(false);
    dispatch(authlogout());
    router.push("/");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            NottesApp
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {isLoggin ? (
              <>
                <li>
                  <a
                    href="#"
                    className="bg-cyan-100 active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                  >
                    {userEmail}
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    onClick={logout}
                    className="bg-gray-900 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="/login"
                    className="bg-cyan-100  active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    className="bg-cyan-100  active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
