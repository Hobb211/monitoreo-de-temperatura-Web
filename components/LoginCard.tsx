"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { userLogin } from "@/types";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import { Alert, Button } from "@material-tailwind/react";

export default function LoginCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLogin>();
  const [errorMessage, setErrorMessage] = React.useState("");

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    await authService.login(data).then(
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
      <div className="relative flex flex-col items-center justify-center overflow-hidden pt-64">
        <div className="w-full p-8 bg-cyan-100 rounded-md shadow-md lg:max-w-xl pt-20">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Login
          </h1>
          <form onSubmit={onSubmit} className="mt-6">
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
                Login
              </Button>
              {errorMessage && (
                <div className="mt-4">
                  <Alert color="red">{errorMessage}</Alert>
                </div>
              )}
            </div>
          </form>

          <p className="mt-4 text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
