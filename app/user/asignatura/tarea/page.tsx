"use client";

import * as React from "react";
import { CreateTarea, Tarea } from "@/types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModalCreateTarea from "@/components/modalCreateTarea";
import tareaService from "@/services/tarea.service";
import asignaturaService from "@/services/asignatura.service";

export default function Home() {
  const [asignaturaTareas, setAsignaturaTareas] = React.useState<Tarea[]>([]);
  const [showModalCreate, setShowModalCreate] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);

  React.useEffect(() => {
    asignaturaService.getTareas().then((response) => {
      setAsignaturaTareas(response);
    });
  }, []);

  const crearTarea = async (dataTarea: CreateTarea) => {
    const idAsignatura = localStorage.getItem("selectedAsignatura");
    if (idAsignatura) {
      dataTarea.idAsignatura = parseInt(idAsignatura);
      try {
        const resp = await tareaService.createTarea(dataTarea);
        const { asignatura, ...tareaDetail } = resp;
        setAsignaturaTareas([...asignaturaTareas, tareaDetail]);
        setShowModalCreate(false);
      } catch (error) {
        console.log("Error en la creacion de la Tarea");
      }
    }
    setShowModalCreate(false);
  };

  const closeModalCreate = () => {
    setShowModalCreate(false);
  };

  // const eliminarAsignatura = async (dataAsignatura: EliminarAsignatura) => {
  //   const idAsignatura = dataAsignatura.id;
  //   try {
  //     const AsignaturaDeleted = await asignaturaService.eliminarAsignatura(
  //       idAsignatura
  //     );
  //     setuserAsignaturas(
  //       userAsignaturas.filter(
  //         (asignatura) => asignatura.id !== AsignaturaDeleted.id
  //       )
  //     );
  //     setShowModalDelete(false);
  //   } catch (error) {
  //     console.log("Error en la Eliminacion de la asignatura");
  //   }
  // };

  const closeModalDelete = () => {
    setShowModalDelete(false);
  };

  return (
    <div className="pt-2 min-h-screen max-h-full">
      <div className="mx-auto  px-4 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-end ...">
          <button
            onClick={() => setShowModalCreate(true)}
            className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-600"
          >
            Agregar Tareas
          </button>
          {showModalCreate ? (
            <ModalCreateTarea
              closeModalCreate={closeModalCreate}
              crearTarea={crearTarea}
            />
          ) : null}
        </div>

        {asignaturaTareas.length > 0 ? (
          <div className="mt-6">
            {asignaturaTareas?.map((tarea) => (
              <Accordion key={tarea.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "85%", flexShrink: 0 }}>
                    {tarea.descripcion}
                  </Typography>
                  <Typography>
                    {tarea.estado}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  Fecha Entrega: {tarea.fechaTermino}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        ) : (
          <div className="flex justify-center ... pt-24">
            ¿Tareas por hacer? Gestionalas aquí
          </div>
        )}
      </div>
    </div>
  );
}