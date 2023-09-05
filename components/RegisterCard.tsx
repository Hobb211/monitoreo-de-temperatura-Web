"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { userRegister } from "@/types";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import { Alert, Button } from "@material-tailwind/react";

export default function RegisterCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userRegister>();
  const [errorMessage, setErrorMessage] = React.useState("");

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    await authService.register(data).then(
      (response) => {
        router.push("/user");
      },
      (error) => {
        setErrorMessage(error.response.data.message);
      }
    );
  });

  return (
    <div className="h-screen">
      <div className="relative flex flex-col items-center justify-center overflow-hidden pt-36">
        <div className="w-96 p-8 bg-cyan-100 rounded-md shadow-md lg:max-w-xl pt-20">
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
              <Button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-900 h-12"
              >
                Register
              </Button>
              {errorMessage && (
                <div className="form-group">
                  <div className="mt-4  text-base text-red-600 text-center text-gray-700">
                    <Alert color="red" className="ps-16">
                      {errorMessage}
                    </Alert>
                  </div>
                </div>
              )}
            </div>
          </form>

          <p className="mt-4 text-sm text-center text-gray-900">
            Have an Account ?{" "}
            <Link
              href="/"
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
