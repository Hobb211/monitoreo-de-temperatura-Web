import React from "react";
import { useForm } from "react-hook-form";
import { Asignatura, CreateAsignatura } from "@/types";
import userService from "@/services/user.service";

export default function ModalDeletedAsigatura({ closeModalDelete, eliminarAsignatura }: any) {
  const [userAsignaturas, setuserAsignaturas] = React.useState<Asignatura[]>([]);
  const [errorMessage, setErrorMessage] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAsignatura>();

  React.useEffect(() => {
    userService.getUserAsignaturas().then((response) => {
      setuserAsignaturas(response);
    });
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    eliminarAsignatura(data);
  });

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Eliminar Asignatura</h3>
            </div>
            <div className="relative p-6 flex-auto">
              <form onSubmit={onSubmit} >
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900">
                    Seleccionar
                  </label>
                  <input
                    type="text"
                    {...register("titulo", { required: true })}
                    className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.titulo && <span>Field is a required</span>}
                </div>
                <div className="flex items-center justify-end border-t border-solid border-slate-200 rounded-b pt-6">
                  <button
                    className="bg-cyan-100 text-black active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => closeModalDelete(false)}
                    className="bg-gray-900 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
