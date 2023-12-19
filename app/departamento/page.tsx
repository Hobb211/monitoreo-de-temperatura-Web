"use client";

import departamentosService from "@/services/departamentos.service";
import { DepartamentoLogs } from "@/types";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function page() {
  const [departamento, setDepartamento] = React.useState<DepartamentoLogs>();

  const getDepartamento = async () => {
    const depa = localStorage.getItem("selectedDepartamento");
    if (depa) {
      const departamento = parseInt(depa);
      try {
        const resp = await departamentosService.getInfoDepto(departamento);
        setDepartamento(resp);
      } catch (error) {
        console.log("Error en la obtencion de los datos del departamento");
      }
    }
  };

  React.useEffect(() => {
    getDepartamento();
  }, []);

  return (
    <div className="pt-2 min-h-screen max-h-full max-h-full">
      <div className="mx-auto  px-4 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-center ">
          {departamento ? (
            <h2 className="font-mono text-xl sm:text-3xl text-black-100">
              Departamento Numero: {departamento.Numero}
            </h2>
          ) : null}
        </div>
        {departamento ? (
          <div className="mt-6">
            {departamento.Logs?.map((logs) => (
              <Accordion key={logs.Id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "85%", flexShrink: 0 }}>
                    logs
                  </Typography>
                  <Typography>{logs.Type}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ width: "55%", flexShrink: 0 }}>
                    Fecha Limite: {logs.Timestamp}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default page;
