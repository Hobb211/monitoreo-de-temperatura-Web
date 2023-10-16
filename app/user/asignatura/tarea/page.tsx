"use client";

import * as React from "react";
import { CreateTarea, Tarea, UpdateTarea } from "@/types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModalCreateTarea from "@/components/modalCreateTarea";
import ModalUpdateTarea from "@/components/modalUpdateTarea";
import tareaService from "@/services/tarea.service";
import asignaturaService from "@/services/asignatura.service";
import ModalDeleteTarea from "@/components/modalDeleteTarea";

export default function Home() {
  const [asignaturaTareas, setAsignaturaTareas] = React.useState<Tarea[]>([]);
  const [showModalCreate, setShowModalCreate] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [showModalUpadte, setshowModalUpadte] = React.useState(false);
  const [asignaturaSelected, setAsignaturaSelected] = React.useState("");

  React.useEffect(() => {
    asignaturaService.getTareas().then((response) => {
      setAsignaturaTareas(response);
    });
  }, []);

  React.useEffect(() => {
    getAsignatura();
  }, []);

  const getAsignatura = async () => {
    const idAsignatura = localStorage.getItem("selectedAsignatura");
    if (idAsignatura) {
      const idasignatura = parseInt(idAsignatura);
      const resp = await asignaturaService.getAsignaturaById(idasignatura);
      setAsignaturaSelected(resp.titulo);
      try {
      } catch (error) {
        console.log("Error en la Obtencion de la Asignatura");
      }
    }
  };

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

  const updateTarea = async (dataTarea: UpdateTarea) => {
    const idTarea = localStorage.getItem("selectedTarea");

    if (idTarea) {
      const idtarea = parseInt(idTarea);
      try {
        const resp = await tareaService.updateTarea(idtarea, dataTarea);
        setAsignaturaTareas(
          asignaturaTareas.map((tarea) =>
            tarea.id === idtarea
              ? {
                  ...tarea,
                  descripcion: dataTarea.descripcion,
                  estado: dataTarea.estado,
                  fechaTermino: dataTarea.fechaTermino,
                }
              : tarea
          )
        );
      } catch (error) {
        console.log("Error en la Actualizacion de la Tarea");
      }
    }
    setshowModalUpadte(false);
  };

  const deleteTarea = async () => {
    const idTarea = localStorage.getItem("selectedTarea");
    if (idTarea) {
      const idtarea = parseInt(idTarea);
      try {
        const tareaDeleted = await tareaService.eliminarTarea(idtarea);
        setAsignaturaTareas(
          asignaturaTareas.filter((tarea) => tarea.id !== tareaDeleted.id)
        );
        setShowModalDelete(false);
      } catch (error) {
        console.log("Error en la Eliminacion de la Tarea");
      }
    }
    setShowModalDelete(false);
  };

  const closeModalCreate = () => {
    setShowModalCreate(false);
  };

  const closeModalUpdate = () => {
    setshowModalUpadte(false);
  };

  const closeModalDelete = () => {
    setShowModalDelete(false);
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

  return (
    <div className="pt-2 min-h-screen max-h-full max-h-full bg-[url('../public/images/homepage.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="mx-auto  px-4 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-center ">
          <h2 className="font-mono text-xl sm:text-3xl text-cyan-100">
            {asignaturaSelected}
          </h2>
        </div>
        <div className="flex justify-end mt-6 ... ">
          <button
            onClick={() => setShowModalCreate(true)}
            className="px-4 py-2 tracking-wide text-black transition-colors duration-200 transform bg-cyan-100 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-600"
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
              <Accordion
                key={tarea.id}
                onClick={() =>
                  localStorage.setItem("selectedTarea", tarea.id.toString())
                }
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "85%", flexShrink: 0 }}>
                    {tarea.descripcion}
                  </Typography>
                  <Typography>{tarea.estado}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ width: "55%", flexShrink: 0 }}>
                    Fecha Limite: {tarea.fechaTermino}
                  </Typography>
                  <div className="flex justify-center ... pt-6">
                    <svg
                      onClick={() => setshowModalUpadte(true)}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    {showModalUpadte ? (
                      <ModalUpdateTarea
                        closeModalUpdate={closeModalUpdate}
                        updateTarea={updateTarea}
                      />
                    ) : null}
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 ml-4"
                      onClick={() => setShowModalDelete(true)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    {showModalDelete ? (
                      <ModalDeleteTarea
                        closeModalDelete={closeModalDelete}
                        deleteTarea={deleteTarea}
                      />
                    ) : null}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        ) : (
          <div className="flex justify-center ... pt-24 text-cyan-100">
            ¿Tareas por hacer? Gestionalas aquí
          </div>
        )}
      </div>
    </div>
  );
}
