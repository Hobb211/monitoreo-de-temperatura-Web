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

  // function refrescar(tiempo: number) {
  //   setTimeout("location.reload(true)", tiempo);
  // }
  // refrescar(30000);

  return (
    <div className="pt-2 min-h-screen ">
      <div className="mx-auto px-4 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-8">
        {Departamentos.length > 0 ? (
          <div className="grid grid-cols-6 grid-rows-20 gap-1">
            {Departamentos.map((departamento: any) => (
              <a
                key={departamento.departamento}
                onClick={() =>
                  localStorage.setItem(
                    "selectedDepartamento",
                    departamento.departamento.toString()
                  )
                }
                href={"/departamento"}
                className="group"
              >
                {departamento.temperatura >= departamento.TMin &&
                departamento.TMax >= departamento.temperatura ? (
                  <div
                    className="rounded-lg bg-green-100 xl:aspect-h-8 xl:aspect-w-7 h-20 hover:bg-cyan-50"
                    onClick={() =>
                      localStorage.setItem(
                        "TemperaturaDepartamento",
                        departamento.temperatura
                      )
                    }
                  >
                    <div className="pt-8 flex items-center justify-center ">
                      {departamento.departamento}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg bg-red-300 xl:aspect-h-8 xl:aspect-w-7 h-20 hover:bg-cyan-50">
                    <div className="pt-8 flex items-center justify-center ">
                      {departamento.departamento}
                    </div>
                  </div>
                )}
              </a>
            ))}
          </div>
        ) : (
          <div className="flex justify-center ... pt-24 text-black-100">
            Cargando informacion de departamentos...
          </div>
        )}
      </div>
    </div>
  );
}
