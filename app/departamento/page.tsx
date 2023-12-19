"use client";

import departamentosService from "@/services/departamentos.service";
import { DepartamentoLogs } from "@/types";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";

function page() {
  const [departamento, setDepartamento] = React.useState<DepartamentoLogs>();
  const [temperatura, setTemperatura] = React.useState<string>("");

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

  React.useEffect(() => {
    const temp = localStorage.getItem("TemperaturaDepartamento");
    if (temp) {
      setTemperatura(temp);
    }
    console.log(temp);
  }, []);

  return (
    <div className="pt-2 min-h-screen max-h-full max-h-full">
      <div className="mx-auto  px-4 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-center ">
          {departamento ? (
            <div className="flex ...">
              <div className="flex-auto w-64 ...">
                Departamento N: {departamento.Numero}
              </div>
              <div className="flex-auto w-64 ...">
                Temperatura Actual: {temperatura}
              </div>
            </div>
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
                    Fecha: {logs.Timestamp}
                  </Typography>
                  <Typography></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ width: "85%", flexShrink: 0 }}>
                    {logs.Log}
                  </Typography>
                  <Typography>{logs.Type}</Typography>
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
