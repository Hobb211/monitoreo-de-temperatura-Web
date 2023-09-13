"use client";
import ModalCreateAsigatura from "@/components/modalCreateAsignatura";
import ModalDeletedAsigatura from "@/components/modalDeleteAsignatura";
import userService from "@/services/user.service";
import * as React from "react";
import { Asignatura, CreateAsignatura, EliminarAsignatura } from "@/types";
import asignaturaService from "@/services/asignatura.service";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export default function Home() {
  const [userAsignaturas, setuserAsignaturas] = React.useState<Asignatura[]>([]);
  const [showModalCreate, setShowModalCreate] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);



  // React.useEffect(() => {
  //   userService.getUserAsignaturas().then((response) => {
  //     setuserAsignaturas(response);
  //   });
  // }, []);

  // const crearAsignatura = async (dataAsignatura: CreateAsignatura) => {
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
            Agregar Tarea
          </button>
          {showModalCreate ? (
            <ModalCreateAsigatura
              closeModalCreate={closeModalCreate}
            // crearAsignatura={crearAsignatura}
            />
          ) : null}
        </div>

        <>
          <div className="pt-20">
            <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(1)}>Hacer Login Con graphql</AccordionHeader>
              <AccordionBody>
                We&apos;re not always in the position that we want to be at. We&apos;re constantly
                growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                ourselves and actualize our dreams.
              </AccordionBody>
            </Accordion>
          </div>
        </>

        {userAsignaturas.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-2 pt-20 sm:mb-98">
            {userAsignaturas.map((asignatura: Asignatura) => (
              <a
                key={asignatura.id}
                href={"/user/asignatura"}
                className="group"
              >
                <div className="rounded-lg bg-cyan-100 xl:aspect-h-8 xl:aspect-w-7 h-64 hover:bg-cyan-50">
                  <div className="pt-28 flex items-center justify-center ">
                    {asignatura.titulo}
                  </div>
                  <div className="pt-2 flex items-center justify-center ">
                    {asignatura.sala}
                  </div>
                </div>
              </a>
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
