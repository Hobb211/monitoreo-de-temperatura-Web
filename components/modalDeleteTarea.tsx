import React from "react";
import { EliminarTarea, Tarea } from "@/types";
import { useForm } from "react-hook-form";

export default function ModalDeletedTarea({
  closeModalDelete,
  deleteTarea,
}: any) {
  const [userTarea, setuserTarea] = React.useState<Tarea[]>([]);
  const [errorMessage, setErrorMessage] = React.useState("");
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<EliminarTarea>();

  const onSubmit = handleSubmit(async () => {
    deleteTarea();
  });

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Eliminar Tarea</h3>
            </div>
            <div className="relative p-6 flex-auto">
              <form onSubmit={onSubmit}>
                <div className="mb-6">
                  <div className="w-72 ">
                    ¿ Estas seguro que deseas eliminar ?
                  </div>
                </div>
                <div className="flex items-center justify-end border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-cyan-100 text-black active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-6"
                    type="submit"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => closeModalDelete(false)}
                    className="bg-gray-900 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-6"
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
