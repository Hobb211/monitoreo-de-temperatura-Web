"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { userRegister } from "@/types";
import { useRouter } from "next/navigation";
import { Alert, Button } from "@material-tailwind/react";
import { authRegister } from "@/redux/features/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export default function RegisterCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userRegister>();
  const [errorMessage, setErrorMessage] = React.useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isloading = useAppSelector(
    (state: RootState) => state.authentication.isLoading
  );

  const onSubmit = handleSubmit(async (data) => {
    const response = await dispatch(authRegister(data));
    if (response.token) {
      router.push("/user/asignatura");
    } else {
      setErrorMessage(response.response.data.message);
    }
  });

  return (
    <div className="h-screen mb-36">
      <div className="relative flex flex-col items-center justify-center overflow-hidden pt-36 ">
        <div className="w-86 p-8 bg-cyan-100 rounded-md shadow-md lg:max-w-xl pt-20 ">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Register
          </h1>
          <form onSubmit={onSubmit} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="fullname"
                className="block text-sm font-semibold text-gray-900"
              >
                Name
              </label>
              <input
                type="fullname"
                {...register("fullName", { required: true })}
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.fullName && <span>Field is a required</span>}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.email && <span>Field is a required</span>}
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.password && <span>Field is a required</span>}
            </div>
            <div className="mt-12">
              <button
                type="submit"
                className="justify-center items-center flex bg-gray-900 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-900 h-12"
                disabled={isloading}
              >
                {isloading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-100 animate-spin dark:text-gray-100 fill-gray-600 dark:fill-gray-100"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  <div>Register</div>
                )}
              </button>
              {errorMessage && (
                  <div className="mt-4  text-base text-red-600 text-center text-gray-700">
                    <Alert color="red" className="ps-16">
                      {errorMessage}
                    </Alert>
                  </div>
              )}
            </div>
          </form>

          <p className="mt-4 text-sm text-center text-gray-900">
            Have an Account ?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
