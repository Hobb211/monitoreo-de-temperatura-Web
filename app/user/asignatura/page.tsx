"use client";

import * as React from "react";
import ModalDeletedAsigatura from "@/components/modalDeleteAsignatura";
import { Asignatura, CreateTarea } from "@/types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModalCreateTarea from "@/components/modalCreateTarea";
import tareaService from "@/services/tarea.service";
import moment from "moment";
import { format } from "path";

const userAsignaturas = [
  {
    titulo: "Hacer backend con graphql",
    estado: "iniciada",
    fechaTermino: "20/09/2023",
  },
  {
    titulo: "Hacer Front con graphql",
    estado: "iniciada",
    fechaTermino: "20/09/2023",
  },
];

export default function Home() {
  const [userAsignaturas, setuserAsignaturas] = React.useState<Asignatura[]>(
    []
  );
  const [showModalCreate, setShowModalCreate] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  // React.useEffect(() => {
  //   userService.getUserAsignaturas().then((response) => {
  //     setuserAsignaturas(response);
  //   });
  // }, []);

  // const crearTarea = async (dataAsignatura: CreateAsignatura) => {
  //   try {
  //     const resp = await asignaturaService.createAsignatura(dataAsignatura);
  //     const { usuario, ...asignaturaDetail } = resp;
  //     setuserAsignaturas([...userAsignaturas, asignaturaDetail]);
  //     setShowModalCreate(false);
  //     // console.log("Asignatura creada", asignaturaDetail.titulo);
  //   } catch (error) {
  //     console.log("Error en la creacion de la asignatura");
  //   }
  // };

  const crearTarea = async (dataTarea: CreateTarea) => {
    const idAsignatura = localStorage.getItem("selectedAsignatura");
    if (idAsignatura) {
      dataTarea.idAsignatura = parseInt(idAsignatura);
      const resp = await tareaService.createTarea(dataTarea);
    }
    setShowModalCreate(false);
  };

  const userAsignaturass = [
    {
      id: 1,
      titulo: "Hacer backend con graphql",
      estado: "iniciada",
      fechaTermino: "20/09/2023",
    },
    {
      id: 2,
      titulo: "Hacer Front con graphql",
      estado: "iniciada",
      fechaTermino: "20/09/2023",
    },
  ];

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

        {userAsignaturass.length > 0 ? (
          <div className="mt-6">
            {userAsignaturass?.map((asignatura) => (
              <Accordion key={asignatura.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "50%", flexShrink: 0 }}>
                    {asignatura.titulo}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {asignatura.estado}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>{asignatura.estado}</AccordionDetails>
              </Accordion>
            ))}
          </div>
        ) : (
          <div className="flex justify-center ... pt-24">
            ¿Tareas por hacer? Gestionalas aquí
          </div>
        )}

        {userAsignaturas.length > 0 ? (
          <div className="flex justify-end ... pt-24">
            <button
              onClick={() => setShowModalDelete(true)}
              className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-600 "
            >
              Eliminar Tarea
            </button>
            {showModalDelete ? (
              <ModalDeletedAsigatura
                closeModalDelete={closeModalDelete}
                // eliminarAsignatura={eliminarAsignatura}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
function getAsignaturaSelected(arg0: () => void) {
  throw new Error("Function not implemented.");
}
