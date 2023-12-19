"use client";

import departamentosService from "@/services/departamentos.service";
import { DepartamentoLogs } from "@/types";
import React from "react";

function page() {
  const [departamento, setDepartamento] = React.useState<DepartamentoLogs[]>(
    []
  );

  const getDepartamento = async () => {
    const depa = localStorage.getItem("selectedDepartamento");
    console.log(depa);
    if (depa) {
      const departamento = parseInt(depa);
      console.log(departamento);
      try {
        // const resp = await departamentosService.(dataTarea);
        // console.log(resp);
      } catch (error) {
        console.log("Error en la obtencion de los datos del departamento");
      }
    }
  };

  React.useEffect(() => {
    getDepartamento();
  }, []);

  return <div>Departamento</div>;
}

export default page;
