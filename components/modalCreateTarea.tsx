import React from "react";
import { useForm } from "react-hook-form";
import { CreateTarea } from "@/types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ModalCreateTarea({
  closeModalCreate,
  crearTarea,
}: any) {
  const [errorMessage, setErrorMessage] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTarea>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const onSubmit = handleSubmit(async (data) => {
    data.fechaTermino = selectedDate;
    crearTarea(data, selectedDate);
  });

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Agregar Tarea</h3>
            </div>
            <div className="relative p-6 flex-auto">
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900">
                    Descripción
                  </label>
                  <input
                    type="text"
                    {...register("descripcion", { required: true })}
                    className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.descripcion && <span>Field is a required</span>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    Fecha Termino
                  </label>
                  <div className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date: Date) => setSelectedDate(date)}
                      minDate={new Date()} // minimum selectable date is today
                      maxDate={new Date("2023-12-31")} // maximum selectable date is December 31, 2023
                      dateFormat="yyyy/MM/dd"
                    />
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end  border-t border-solid border-slate-200 rounded-b mt-6">
                  <button
                    className="bg-cyan-100 text-black active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-6"
                    type="submit"
                  >
                    Agregar
                  </button>
                  <button
                    onClick={() => closeModalCreate(false)}
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
