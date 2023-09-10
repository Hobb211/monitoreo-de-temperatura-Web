"use client";

import ModalCreateAsigatura from "@/components/modalCreateAsignatura";
import ModalDeletedAsigatura from "@/components/modalDeleteAsignatura";
import userService from "@/services/user.service";
import * as React from "react";

type asignatura = {
  id: number;
  titulo: string;
};

export default function User() {
  const [userAsignaturas, setuserAsignaturas] = React.useState([]);
  const [showModalCreate, setShowModalCreate] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);

  

  React.useEffect(() => {
    userService.getUserAsignaturas().then((response) => {
      setuserAsignaturas(response);
    });
  }, []);

  const closeModalCreate = () => {
    setShowModalCreate(false);
  };

  const closeModalDelete = () => {
    setShowModalDelete(false);
  };

  return (
    <div className="pt-20 min-h-screen max-h-full">
      <div className="mx-auto  px-4 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-end ...">
          <button
            onClick={() => setShowModalCreate(true)}
            className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-600"
          >
            Agregar Asignatura
          </button>
          {showModalCreate ? (
            <ModalCreateAsigatura closeModalCreate={closeModalCreate} />
          ) : null}
        </div>

        {userAsignaturas.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-2 pt-20 sm:mb-98">
            {userAsignaturas.map((asignatura: asignatura) => (
              <a key={asignatura.id} href={""} className="group">
                <div className="rounded-lg bg-cyan-100 xl:aspect-h-8 xl:aspect-w-7 h-64 hover:bg-cyan-50">
                  <div className="pt-28 flex items-center justify-center ">
                    {asignatura.titulo}
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="flex justify-center ... pt-24">
            Comienza Agregando Asignaturas
          </div>
        )}

        {userAsignaturas.length > 0 ? (
          <div className="flex justify-end ... pt-24">
            <button
              onClick={() => setShowModalDelete(true)}
              className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-600 "
            >
              Eliminar Asignatura
            </button>
            {showModalDelete ? (
              <ModalDeletedAsigatura closeModalDelete={closeModalDelete} />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
