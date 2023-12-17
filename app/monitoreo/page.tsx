"use client";

import departamentosService from "@/services/departamentos.service";
import { Departamento } from "@/types";
import React from "react";

export default function page() {
  const [Departamentos, setDepartamentos] = React.useState<Departamento[]>([]);

  React.useEffect(() => {
    departamentosService.getDepartamentos().then((response: Departamento[]) => {
      setDepartamentos(response);
    });
  }, []);

  return (
    <div className="pt-2 min-h-screen ">
      <div className="mx-auto px-4 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-8">
        {Departamentos.length > 0 ? (
          <div className="grid grid-cols-6 grid-rows-20 gap-1">
            {Departamentos.map((departamento: any) => (
              <a
                key={departamento.departamento}
                href={"/departamento"}
                className="group"
              >
                {departamento.temperatura > 18.5 ? (
                  <div className="rounded-lg bg-red-100 xl:aspect-h-8 xl:aspect-w-7 h-20 hover:bg-cyan-50">
                    <div className="pt-8 flex items-center justify-center ">
                      {departamento.departamento}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg bg-cyan-100 xl:aspect-h-8 xl:aspect-w-7 h-20 hover:bg-cyan-50">
                    <div className="pt-8 flex items-center justify-center ">
                      {departamento.departamento}
                    </div>
                  </div>
                )}
              </a>
            ))}
          </div>
        ) : (
          <div className="flex justify-center ... pt-24 text-cyan-100">
            Cargando informacion de departamentos...
          </div>
        )}
      </div>
    </div>
  );
}
