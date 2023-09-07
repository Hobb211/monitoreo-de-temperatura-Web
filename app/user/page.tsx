"use client";

import authService from "@/services/auth.service";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function Home() {
  const [userEmail, setuserEmail] = React.useState("");
  const router = useRouter();

  // React.useEffect(() => {
  //   const storageUser = authService.getCurrentUser();
  //   if (storageUser) {
  //     console.log(storageUser.email);
  //   }
  // }, []);

  const products = [
    { name: "Arquitectura de Plataformas", color: "Blue", price: 13 },
    { name: "Sistemas de Informacion II", color: "Red", price: 12 },
    { name: "Bases de Datos No Relacional", color: "Red", price: 12 },
    { name: "Proyecto Integrador", color: "Red", price: 12 },
    { name: "Desarrollo Web/Movil", color: "Red", price: 12 },
    { name: "Gestion de la Innovasion", color: "Red", price: 12 },
  ];

  return (
    <div className="pt-20 min-h-screen max-h-full">
      <div className="mx-auto  px-4 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-end ...">
          <button
            type="submit"
            className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-600"
          >
            Agregar Asignatura
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-2 pt-20 sm:mb-98">
          {products.map((product) => (
            <a key={product.name} href={""} className="group">
              <div className="rounded-lg bg-cyan-100 xl:aspect-h-8 xl:aspect-w-7 h-64 hover:bg-cyan-50">
                <div className="pt-28 flex items-center justify-center ">
                  {product.name}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="flex justify-end ... pt-24">
          <button
            type="submit"
            className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-600 "
          >
            Eliminar Asignatura
          </button>
        </div>
      </div>
    </div>
  );
}
function componentDidMount() {
  throw new Error("Function not implemented.");
}
